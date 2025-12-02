import { BaseNode } from '../common/BaseNode';
import { concept, property, excludedInJSON } from '../decorators';
import { getConceptConstructor } from '../decorators/utils';
import ViewElement from './ViewElement';
import Variable from './Variable';
import Entity from './Entity';
import BindEvent from './BindEvent';
import { genViewElementUniqueName, genUniqueName, getEntityStructure } from '../utils';

@concept('页面')
export class View extends BaseNode {
  static readonly ConceptName = 'View';

  constructor(source?: Partial<View>) {
    source = Object.assign({}, View.getDefaultOptions(), source);
    super(source);
    super.subConstructor(source);
  }

  static from(source: any, parentNode?: any, parentKey?: string): View {
    return super.from(source, parentNode, parentKey) as any;
  }

  @property()
  name: string = '';

  @property()
  title?: string;

  @property({ objectRef: 'ViewElement', isArray: true })
  elements: ViewElement[] = [];

  @property({ objectRef: 'Variable', isArray: true })
  variables: Variable[] = [];

  @property({ objectRef: 'Entity', isArray: true })
  entities: Entity[] = [];

  genVueTemplate(options?: any) {
    const tabSize = options?.tabSize ?? 2;
    const base = (this.elements || []).map((el) => el.toVue({ tabSize, indentLevel: 0 }));
    return base.map((s) => `${s}\n`).join('');
  }

  private genScript(): string {
    // 页面上定义的实体结构
    const structures = getEntityStructure(this) || {};
    const structureEntries = Object.entries(structures)
      .map(([key, factory]) => `      ${key}: ${factory},`)
      .join('\n');
    const defaultStructureBlock = structureEntries
      ? `    const defaultStructures = {\n${structureEntries}\n    };\n`
      : '    const defaultStructures = Object.create(null);\n';
    const linkBlock = `    const link = (key) => {
      // 如果 initData[key] 已存在，直接返回；否则创建默认值并赋值
      return initData[key] !== undefined 
        ? initData[key] 
        : (initData[key] = (typeof defaultStructures[key] === 'function' ? defaultStructures[key]() : {}));
    };
`;

    // 页面元素上绑定的事件
    const viewElementBindEvents = this.getViewElementBindEvents();
    const methodsCode = viewElementBindEvents
      .map((item) => (item?.toJS?.() || '').trim())
      .filter((code) => code.length > 0)
      .map((code) =>
        code
          .split('\n')
          .map((line) => (line ? `    ${line}` : line))
          .join('\n')
      )
      .join('\n');
    let code = '';
    code += 'export default {';

    const scriptCode = `
  name: ${JSON.stringify(this.name || 'form-template-render')},
  props: {
    initData: {
      type: Object,
      default: () => ({})
    }
  },
  data(){
    const initData = this.$props.initData || {};
${defaultStructureBlock}${linkBlock}
    return {
      currentData: initData, // 表单数据（包括： 主表+子表单）
      delSubFormDataSource: undefined, // 待删除的子表单数据源
      delInfoIndex: undefined, // 待删除的数据下标
      ${this.variables.map(({ name }) => `${name}: link('${name}')`).join(',\n      ')}
    }
  },
  mounted(){
    // console.log('mounted', this.currentData)
  },
  methods: {
${methodsCode}
  }\n`;
    code += scriptCode;
    code += '};';
    return code;
  }

  toVue(options?: any): string {
    const template = this.genVueTemplate(options);
    const script = this.genScript();
    const res = `<template>\n${template}</template>\n<script>\n${script}\n</script>\n`;
    // console.log('toVue:', res);
    return res;
  }

  genDesignerVueTemplate() {
    const tabSize = 2;
    const base = (this.elements || []).map((el) => el.toDesignerVue({ tabSize, indentLevel: 0 }));
    return base.map((s) => `${s}\n`).join('');
  }

  toDesignerVue() {
    return this.genDesignerVueTemplate();
  }

  /**
   * 根据 nodePath 查找节点（支持 view.elements[name=xxx].children[0] 格式）
   */
  findNodeByPath(nodePath: string): any {
    if (!nodePath || typeof nodePath !== 'string') return undefined;
    const parts = nodePath.split('.').filter(Boolean);
    if (parts.length === 0) return undefined;
    // 第一个必须是 view
    if (parts[0] !== 'view') return undefined;

    let current: any = this;

    // 依次解析每一段 path 片段
    for (let i = 1; i < parts.length; i++) {
      const seg = parts[i];
      // 解析形如 key[name=xxx] 或 key[0]
      const match = seg.match(/^(\w+)(\[(.+)\])?$/);
      if (!match) return undefined;

      const key = match[1];
      const selector = match[3]; // 可能是 name=xxx 或 数字索引

      if (!(key in current)) return undefined;
      const prop = current[key];

      if (Array.isArray(prop)) {
        // 数组访问
        if (selector == null) return undefined; // 数组必须带选择器

        // name=xxx 或 索引数字
        const nameMatch = selector.match(/^name=(.*)$/);
        if (nameMatch) {
          const targetName = nameMatch[1];
          const found = prop.find((item: any) => item && String(item.name) === targetName);
          if (!found) return undefined;
          current = found;
        } else {
          const index = Number(selector);
          if (!Number.isInteger(index) || index < 0 || index >= prop.length) return undefined;
          current = prop[index];
        }
      } else {
        // 普通对象属性
        current = prop;
      }
    }

    return current;
  }

  /**
   * 收集 View 上所有 ViewElement 的绑定事件
   */
  getViewElementBindEvents(): Array<BindEvent> {
    const bindEvents: Array<BindEvent> = [];
    this.elements.forEach((item) => {
      item.traverseChildren((node) => {
        node.bindEvents.forEach((bindEvent) => {
          bindEvents.push(bindEvent);
        });
      });
    });
    return bindEvents;
  }

  /**
   * 已存在的 ViewElement 名称集合
   */
  @excludedInJSON()
  existingViewElement: Set<string> = new Set<string>();

  /**
   * 收集已有的页面节点名称
   */
  collectExistingViewElementName(excludedList: Array<ViewElement> = []) {
    const excludedSet = new Set(excludedList);
    this.elements.forEach((element) => {
      element.traverseStrictChildren((node) => {
        if (node.concept === 'ViewElement' && !excludedSet.has(node) && node.name) {
          this.existingViewElement.add(node.name);
        }
      });
    });
  }

  /**
   * 生成唯一的 ViewElement 名称
   * @param name 基础名称，默认为 'viewElement_1'
   * @returns 唯一的名称
   */
  getViewElementUniqueName(name: string = 'viewElement_1'): string {
    this.collectExistingViewElementName();
    return genViewElementUniqueName(name, this.existingViewElement);
  }

  /**
   * 删除页面元素
   * @param name 页面元素名称
   */
  removeViewElement(name: string): void;

  /**
   * 删除页面元素
   * @param viewElement 已有的页面元素实例
   */
  removeViewElement(viewElement: ViewElement): void;

  removeViewElement(options: string | ViewElement) {
    let viewElement: ViewElement;
    if (typeof options === 'string') {
      viewElement = (this.elements || []).find((item) => item.name === options);
      if (!viewElement) {
        throw new Error('找不到页面元素 ' + options);
      }
    } else {
      viewElement = options;
    }
    return viewElement.delete();
  }

  /**
   * 获取已存在的实体名称
   * @param excludedList 排除的实体列表
   */
  getEntityExistingNames(excludedList: Array<Entity> = []): string[] {
    const excludedSet = new Set(excludedList);
    return (this.entities || []).filter((item) => !excludedSet.has(item) && item.name).map((item) => item.name);
  }

  /**
   * 获取唯一的实体名称
   * @param name 基础名称，默认为 'Entity1'
   */
  getEntityUniqueName(name: string = 'Entity1'): string {
    const existingNames = new Set(this.getEntityExistingNames());
    return genUniqueName(name, existingNames);
  }

  /**
   * 插入实体
   * @internal
   * @param name 实体名称，如果不填会自动生成一个唯一名称
   */
  _insertEntityAt(name: string, index: number): Entity;

  /**
   * 插入实体
   * @internal
   * @param entityOptions 实体参数
   */
  _insertEntityAt(entityOptions: Partial<Entity>, index: number): Entity;

  /**
   * 插入实体
   * @internal
   * @param entity 已有的实体实例
   */
  _insertEntityAt(entity: Entity, index: number): Entity;

  _insertEntityAt(options: string | Partial<Entity> | Entity, index: number) {
    const entityOptions: any = {};
    const relationOptions = { parentNode: this, parentKey: 'entities' };
    const Entity = getConceptConstructor('Entity');
    let entity: Entity;
    if (!options) {
      entity = Entity.from(
        {
          ...entityOptions,
          name: this.getEntityUniqueName(),
        },
        this,
        'entities'
      );
    } else if (typeof options === 'string') {
      // 如果传入字符串，使用该字符串作为基础名称生成唯一名称
      const uniqueName = options ? this.getEntityUniqueName(options) : this.getEntityUniqueName();
      entity = Entity.from(
        {
          ...entityOptions,
          name: uniqueName,
        },
        this,
        'entities'
      );
    } else if (options instanceof Entity) {
      entity = options as Entity;
      // 迁移关系
      if ((entity as any).ensureDelete) {
        // 兼容主仓 API，如无该方法忽略
        try {
          (entity as any).ensureDelete();
        } catch (_) {}
      }
      Object.assign(entity as any, relationOptions);
    } else {
      // 如果传入 Partial<Entity>，需要确保名称唯一
      const optionsWithName = options as Partial<Entity>;
      let finalName = optionsWithName.name;
      if (finalName) {
        // 如果提供了名称，确保名称唯一
        finalName = this.getEntityUniqueName(finalName);
      } else {
        // 如果没有提供名称，自动生成一个唯一名称
        finalName = this.getEntityUniqueName();
      }
      entity = Entity.from(
        {
          ...entityOptions,
          ...options,
          name: finalName,
        },
        this,
        'entities'
      );
    }
    // 保证父关系
    (entity as any).parentNode = this;
    (entity as any).parentKey = 'entities';
    if (!Array.isArray(this.entities)) this.entities = [];
    this.entities.splice(index, 0, entity);
    return entity;
  }

  /**
   * 插入实体
   * @param name 实体名称，如果不填会自动生成一个唯一名称
   */
  insertEntityAt(name: string, index: number): Entity;

  /**
   * 插入实体
   * @param entityOptions 实体参数
   */
  insertEntityAt(entityOptions: Partial<Entity>, index: number): Entity;

  /**
   * 插入实体
   * @param entity 已有的实体实例
   */
  insertEntityAt(entity: Entity, index: number): Entity;

  insertEntityAt(options: string | Partial<Entity> | Entity, index: number) {
    const node = this._insertEntityAt(options as any, index);
    this.emit('create', {
      action: 'create',
      parentNode: this,
      parentKey: 'entities',
      index,
      object: node,
      target: node,
    });
    return node;
  }

  /**
   * 添加实体
   * @internal
   * @param name 实体名称，如果不填会自动生成一个唯一名称
   */
  _addEntity(name?: string): Entity;

  /**
   * 添加实体
   * @internal
   * @param entityOptions 实体参数
   */
  _addEntity(entityOptions: Partial<Entity>): Entity;

  /**
   * 添加实体
   * @internal
   * @param entity 已有的实体实例
   */
  _addEntity(entity: Entity): Entity;

  _addEntity(options?: string | Partial<Entity> | Entity) {
    const index = 0;
    return this._insertEntityAt(options as any, index);
  }

  /**
   * 添加实体
   * @param name 实体名称，如果不填会自动生成一个唯一名称
   */
  addEntity(name?: string): Entity;

  /**
   * 添加实体
   * @param entityOptions 实体参数
   */
  addEntity(entityOptions: Partial<Entity>): Entity;

  /**
   * 添加实体
   * @param entity 已有的实体实例
   */
  addEntity(entity: Entity): Entity;

  addEntity(options?: string | Partial<Entity> | Entity) {
    const node = this._addEntity(options as any);
    const index = this.entities.indexOf(node);
    this.emit('create', {
      action: 'create',
      parentNode: this,
      parentKey: 'entities',
      index,
      object: node,
      target: node,
    });
    return node;
  }

  /**
   * 删除实体
   * @param name 实体名称
   */
  removeEntity(name: string): void;

  /**
   * 删除实体
   * @param entity 已有的实体实例
   */
  removeEntity(entity: Entity): void;

  removeEntity(options: string | Entity) {
    let entity: Entity;
    if (typeof options === 'string') {
      entity = (this.entities || []).find((item) => item.name === options);
      if (!entity) {
        throw new Error('找不到实体 ' + options);
      }
    } else {
      entity = options;
    }
    const index = this.entities.indexOf(entity);
    if (index > -1) {
      this.entities.splice(index, 1);
      this.emit('delete', {
        action: 'delete',
        parentNode: this,
        parentKey: 'entities',
        index,
        object: entity,
        target: entity,
      });
    }
  }

  /**
   * 获取已存在的变量名称
   * @param excludedList 排除的变量列表
   */
  getVariableExistingNames(excludedList: Array<Variable> = []): string[] {
    const excludedSet = new Set(excludedList);
    return (this.variables || []).filter((item) => !excludedSet.has(item) && item.name).map((item) => item.name);
  }

  /**
   * 获取唯一的变量名称
   * @param name 基础名称，默认为 'variable1'
   */
  getVariableUniqueName(name: string = 'variable1'): string {
    const existingNames = new Set(this.getVariableExistingNames());
    return genUniqueName(name, existingNames);
  }

  /**
   * 插入变量
   * @internal
   * @param name 变量名称，如果不填会自动生成一个唯一名称
   */
  _insertVariableAt(name: string, index: number): Variable;

  /**
   * 插入变量
   * @internal
   * @param variableOptions 变量参数
   */
  _insertVariableAt(variableOptions: Partial<Variable>, index: number): Variable;

  /**
   * 插入变量
   * @internal
   * @param variable 已有的变量实例
   */
  _insertVariableAt(variable: Variable, index: number): Variable;

  _insertVariableAt(options: string | Partial<Variable> | Variable, index: number) {
    const variableOptions: any = {};
    const relationOptions = { parentNode: this, parentKey: 'variables' };
    const VariableCtor = getConceptConstructor('Variable');
    let variable: Variable;
    if (!options) {
      variable = VariableCtor.from(
        {
          ...variableOptions,
          name: this.getVariableUniqueName(),
        },
        this,
        'variables'
      );
    } else if (typeof options === 'string') {
      // 使用给定字符串作为基础名称生成唯一名称
      const uniqueName = options ? this.getVariableUniqueName(options) : this.getVariableUniqueName();
      variable = VariableCtor.from(
        {
          ...variableOptions,
          name: uniqueName,
        },
        this,
        'variables'
      );
    } else if (options instanceof Variable) {
      variable = options as Variable;
      if ((variable as any).ensureDelete) {
        try {
          (variable as any).ensureDelete();
        } catch (_) {}
      }
      Object.assign(variable as any, relationOptions);
    } else {
      const optionsWithName = options as Partial<Variable>;
      let finalName = optionsWithName.name;
      if (finalName) {
        finalName = this.getVariableUniqueName(finalName);
      } else {
        finalName = this.getVariableUniqueName();
      }
      variable = VariableCtor.from(
        {
          ...variableOptions,
          ...options,
          name: finalName,
        },
        this,
        'variables'
      );
    }
    (variable as any).parentNode = this;
    (variable as any).parentKey = 'variables';
    if (!Array.isArray(this.variables)) this.variables = [];
    this.variables.splice(index, 0, variable);
    return variable;
  }

  /**
   * 插入变量
   * @param name 变量名称，如果不填会自动生成一个唯一名称
   */
  insertVariableAt(name: string, index: number): Variable;

  /**
   * 插入变量
   * @param variableOptions 变量参数
   */
  insertVariableAt(variableOptions: Partial<Variable>, index: number): Variable;

  /**
   * 插入变量
   * @param variable 已有的变量实例
   */
  insertVariableAt(variable: Variable, index: number): Variable;

  insertVariableAt(options: string | Partial<Variable> | Variable, index: number) {
    const node = this._insertVariableAt(options as any, index);
    this.emit('create', {
      action: 'create',
      parentNode: this,
      parentKey: 'variables',
      index,
      object: node,
      target: node,
    });
    return node;
  }

  /**
   * 添加变量
   * @internal
   * @param name 变量名称，如果不填会自动生成一个唯一名称
   */
  _addVariable(name?: string): Variable;

  /**
   * 添加变量
   * @internal
   * @param variableOptions 变量参数
   */
  _addVariable(variableOptions: Partial<Variable>): Variable;

  /**
   * 添加变量
   * @internal
   * @param variable 已有的变量实例
   */
  _addVariable(variable: Variable): Variable;

  _addVariable(options?: string | Partial<Variable> | Variable) {
    const index = this.variables.length;
    return this._insertVariableAt(options as any, index);
  }

  /**
   * 添加变量
   * @param name 变量名称，如果不填会自动生成一个唯一名称
   */
  addVariable(name?: string): Variable;

  /**
   * 添加变量
   * @param variableOptions 变量参数
   */
  addVariable(variableOptions: Partial<Variable>): Variable;

  /**
   * 添加变量
   * @param variable 已有的变量实例
   */
  addVariable(variable: Variable): Variable;

  addVariable(options?: string | Partial<Variable> | Variable) {
    const node = this._addVariable(options as any);
    const index = this.variables.indexOf(node);
    this.emit('create', {
      action: 'create',
      parentNode: this,
      parentKey: 'variables',
      index,
      object: node,
      target: node,
    });
    return node;
  }

  /**
   * 删除变量
   * @param name 变量名称
   */
  removeVariable(name: string): void;

  /**
   * 删除变量
   * @param variable 已有的变量实例
   */
  removeVariable(variable: Variable): void;

  removeVariable(options: string | Variable) {
    let variable: Variable;
    if (typeof options === 'string') {
      variable = (this.variables || []).find((item) => item.name === options);
      if (!variable) {
        throw new Error('找不到变量 ' + options);
      }
    } else {
      variable = options;
    }
    const index = this.variables.indexOf(variable);
    if (index > -1) {
      this.variables.splice(index, 1);
      this.emit('delete', {
        action: 'delete',
        parentNode: this,
        parentKey: 'variables',
        index,
        object: variable,
        target: variable,
      });
    }
  }
}

export default View;
