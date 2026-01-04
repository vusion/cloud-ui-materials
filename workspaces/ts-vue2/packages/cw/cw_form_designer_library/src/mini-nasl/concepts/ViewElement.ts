import { BaseNode } from '../common/BaseNode';
import { concept, property } from '../decorators';
import { getConceptConstructor } from '../decorators/utils';
import BindAttribute from './BindAttribute';
import BindEvent from './BindEvent';
import { createUUID, genUniqueName } from '../utils';

@concept('页面元素')
export class ViewElement extends BaseNode {
  static readonly ConceptName = 'ViewElement';

  /**
   * JSON 序列化时需要排除的键（用于遍历时排除某些属性）
   */
  public static readonly JSON_EXCLUDED_KEYS: Set<string> = new Set(['parentNode', 'parentKey']);

  @property()
  tag: string = 'div';

  @property()
  name?: string;

  @property()
  staticStyle?: string | null;

  @property()
  slotTarget?: string | null;

  @property()
  slotScope?: string | null;

  @property({ objectRef: 'BindAttribute', isArray: true })
  bindAttrs: BindAttribute[] = [];

  @property({ objectRef: 'BindEvent', isArray: true })
  bindEvents: BindEvent[] = [];

  @property()
  bindDirectives: any[] = [];

  @property({ objectRef: 'ViewElement', isArray: true })
  children: ViewElement[] = [];

  constructor(source?: Partial<ViewElement>) {
    source = Object.assign({}, ViewElement.getDefaultOptions(), source);
    super(source);
    super.subConstructor(source);
  }

  static from(source: any, parentNode?: any, parentKey?: string): ViewElement {
    return super.from(source, parentNode, parentKey) as any;
  }

  /**
   * 设置静态 style
   */
  setStaticStyle(staticStyle: string) {
    const object = {
      staticStyle,
    };
    this.update({
      ...object,
    });
  }

  /**
   * 内部：在指定位置插入绑定属性（不触发事件）
   */
  _insertBindAttributeAt(options: string | Partial<BindAttribute> | BindAttribute, index: number): BindAttribute {
    const relationOptions = { parentNode: this as any, parentKey: 'bindAttrs' } as const;
    let node: BindAttribute;
    if (!options) {
      node = BindAttribute.from({ name: '' }, this as any, 'bindAttrs');
    } else if (typeof options === 'string') {
      node = BindAttribute.from({ name: options }, this as any, 'bindAttrs');
    } else if (options instanceof BindAttribute) {
      node = options as BindAttribute;
      // 迁移关系
      if ((node as any).ensureDelete) {
        // 兼容主仓 API，如无该方法忽略
        try {
          (node as any).ensureDelete();
        } catch (_) {}
      }
      Object.assign(node as any, relationOptions);
    } else {
      node = BindAttribute.from({ ...(options as any) }, this as any, 'bindAttrs');
    }
    // 保证父关系
    (node as any).parentNode = this;
    (node as any).parentKey = 'bindAttrs';
    if (!Array.isArray(this.bindAttrs)) this.bindAttrs = [];
    this.bindAttrs.splice(index, 0, node);
    return node;
  }

  /**
   * 在指定位置插入绑定属性（触发 create 事件）
   */
  insertBindAttributeAt(options: string | Partial<BindAttribute> | BindAttribute, index: number): BindAttribute {
    const node = this._insertBindAttributeAt(options as any, index);
    this.emit('create', {
      action: 'create',
      parentNode: this,
      parentKey: 'bindAttrs',
      index,
      object: node,
      target: node,
    });
    return node;
  }

  /**
   * 内部：在末尾添加绑定属性（不触发事件）
   */
  _addBindAttribute(options?: string | Partial<BindAttribute> | BindAttribute): BindAttribute {
    const index = (this.bindAttrs || []).length;
    return this._insertBindAttributeAt(options as any, index);
  }

  /**
   * 在末尾添加绑定属性（触发 create 事件）
   */
  addBindAttribute(options?: string | Partial<BindAttribute> | BindAttribute): BindAttribute {
    const node = this._addBindAttribute(options as any);
    const index = this.bindAttrs.indexOf(node);
    this.emit('create', {
      action: 'create',
      parentNode: this,
      parentKey: 'bindAttrs',
      index,
      object: node,
      target: node,
    });
    return node;
  }

  /**
   * 删除元素绑定属性
   * @param name 元素绑定属性名称
   */
  removeBindAttribute(name: string): void;

  /**
   * 删除元素绑定属性
   * @param bindAttribute 已有的元素绑定属性实例
   */
  removeBindAttribute(bindAttribute: BindAttribute): void;

  removeBindAttribute(options: string | BindAttribute) {
    let bindAttribute: BindAttribute;
    if (typeof options === 'string') {
      bindAttribute = (this.bindAttrs || []).find((item) => item.name === options);
      if (!bindAttribute) {
        throw new Error('找不到元素绑定属性 ' + options);
      }
    } else {
      bindAttribute = options;
    }
    return bindAttribute.delete();
  }

  /**
   * 获取已存在的绑定事件名称
   * @param excludedList 排除的绑定事件列表
   */
  getBindEventExistingNames(excludedList: Array<BindEvent> = []): string[] {
    const excludedSet = new Set(excludedList);
    return (this.bindEvents || []).filter((item) => !excludedSet.has(item) && item.name).map((item) => item.name);
  }

  /**
   * 获取唯一的绑定事件名称
   * @param name 基础名称，默认为 'bindEvent1'
   */
  getBindEventUniqueName(name: string = 'bindEvent1'): string {
    const existingNames = new Set(this.getBindEventExistingNames());
    return genUniqueName(name, existingNames);
  }

  /**
   * 插入元素绑定事件
   * @internal
   * @param name 元素绑定事件名称，如果不填会自动生成一个唯一名称
   */
  _insertBindEventAt(name: string, index: number): BindEvent;

  /**
   * 插入元素绑定事件
   * @internal
   * @param bindEventOptions 元素绑定事件参数
   */
  _insertBindEventAt(bindEventOptions: Partial<BindEvent>, index: number): BindEvent;

  /**
   * 插入元素绑定事件
   * @internal
   * @param bindEvent 已有的元素绑定事件实例
   */
  _insertBindEventAt(bindEvent: BindEvent, index: number): BindEvent;

  _insertBindEventAt(options: string | Partial<BindEvent> | BindEvent, index: number) {
    const bindEventOptions: any = {};
    const relationOptions = { parentNode: this, parentKey: 'bindEvents' };
    const BindEvent = getConceptConstructor('BindEvent');
    let bindEvent: BindEvent;
    if (!options) {
      bindEvent = BindEvent.from(
        {
          ...bindEventOptions,
          name: this.getBindEventUniqueName(),
        },
        this,
        'bindEvents'
      );
    } else if (typeof options === 'string') {
      bindEvent = BindEvent.from(
        {
          ...bindEventOptions,
          name: options,
        },
        this,
        'bindEvents'
      );
    } else if (options instanceof BindEvent) {
      bindEvent = options as BindEvent;
      // 迁移关系
      if ((bindEvent as any).ensureDelete) {
        // 兼容主仓 API，如无该方法忽略
        try {
          (bindEvent as any).ensureDelete();
        } catch (_) {}
      }
      Object.assign(bindEvent as any, relationOptions);
    } else {
      bindEvent = BindEvent.from(
        {
          ...bindEventOptions,
          ...options,
        },
        this,
        'bindEvents'
      );
    }
    // 保证父关系
    (bindEvent as any).parentNode = this;
    (bindEvent as any).parentKey = 'bindEvents';
    if (!Array.isArray(this.bindEvents)) this.bindEvents = [];
    this.bindEvents.splice(index, 0, bindEvent);
    return bindEvent;
  }

  /**
   * 插入元素绑定事件
   * @param name 元素绑定事件名称，如果不填会自动生成一个唯一名称
   */
  insertBindEventAt(name: string, index: number): BindEvent;

  /**
   * 插入元素绑定事件
   * @param bindEventOptions 元素绑定事件参数
   */
  insertBindEventAt(bindEventOptions: Partial<BindEvent>, index: number): BindEvent;

  /**
   * 插入元素绑定事件
   * @param bindEvent 已有的元素绑定事件实例
   */
  insertBindEventAt(bindEvent: BindEvent, index: number): BindEvent;

  insertBindEventAt(options: string | Partial<BindEvent> | BindEvent, index: number) {
    const node = this._insertBindEventAt(options as any, index);
    this.emit('create', {
      action: 'create',
      parentNode: this,
      parentKey: 'bindEvents',
      index,
      object: node,
      target: node,
    });
    return node;
  }

  /**
   * 添加元素绑定事件
   * @internal
   * @param name 元素绑定事件名称，如果不填会自动生成一个唯一名称
   */
  _addBindEvent(name?: string): BindEvent;

  /**
   * 添加元素绑定事件
   * @internal
   * @param bindEventOptions 元素绑定事件参数
   */
  _addBindEvent(bindEventOptions: Partial<BindEvent>): BindEvent;

  /**
   * 添加元素绑定事件
   * @internal
   * @param bindEvent 已有的元素绑定事件实例
   */
  _addBindEvent(bindEvent: BindEvent): BindEvent;

  _addBindEvent(options?: string | Partial<BindEvent> | BindEvent) {
    const index = (this.bindEvents || []).length;
    return this._insertBindEventAt(options as any, index);
  }

  /**
   * 添加元素绑定事件
   * @param name 元素绑定事件名称，如果不填会自动生成一个唯一名称
   */
  addBindEvent(name?: string): BindEvent;

  /**
   * 添加元素绑定事件
   * @param bindEventOptions 元素绑定事件参数
   */
  addBindEvent(bindEventOptions: Partial<BindEvent>): BindEvent;

  /**
   * 添加元素绑定事件
   * @param bindEvent 已有的元素绑定事件实例
   */
  addBindEvent(bindEvent: BindEvent): BindEvent;

  addBindEvent(options?: string | Partial<BindEvent> | BindEvent) {
    const node = this._addBindEvent(options as any);
    const index = this.bindEvents.indexOf(node);
    this.emit('create', {
      action: 'create',
      parentNode: this,
      parentKey: 'bindEvents',
      index,
      object: node,
      target: node,
    });
    return node;
  }

  /**
   * 删除元素绑定事件
   * @param name 元素绑定事件名称
   */
  removeBindEvent(name: string): void;

  /**
   * 删除元素绑定事件
   * @param bindEvent 已有的元素绑定事件实例
   */
  removeBindEvent(bindEvent: BindEvent): void;

  removeBindEvent(options: string | BindEvent) {
    let bindEvent: BindEvent;
    if (typeof options === 'string') {
      bindEvent = (this.bindEvents || []).find((item) => item.name === options);
      if (!bindEvent) {
        throw new Error('找不到元素绑定事件 ' + options);
      }
    } else {
      bindEvent = options;
    }
    return bindEvent.delete();
  }

  /**
   * 获取唯一的页面元素名称
   * @param name 基础名称，默认为 'viewElement1'
   */
  getViewElementUniqueName(name: string = 'viewElement_1'): string {
    return this.view?.getViewElementUniqueName(name);
  }

  /**
   * 插入页面元素
   * @internal
   * @param name 页面元素名称，如果不填会自动生成一个唯一名称
   */
  _insertViewElementAt(name: string, index: number): ViewElement;

  /**
   * 插入页面元素
   * @internal
   * @param viewElementOptions 页面元素参数
   */
  _insertViewElementAt(viewElementOptions: Partial<ViewElement>, index: number): ViewElement;

  /**
   * 插入页面元素
   * @internal
   * @param viewElement 已有的页面元素实例
   */
  _insertViewElementAt(viewElement: ViewElement, index: number): ViewElement;

  _insertViewElementAt(options: string | Partial<ViewElement> | ViewElement, index: number) {
    const viewElementOptions: any = {};
    const relationOptions = { parentNode: this, parentKey: 'children' };
    const ViewElement = getConceptConstructor('ViewElement');
    let viewElement: ViewElement;
    if (!options) {
      viewElement = ViewElement.from(
        {
          ...viewElementOptions,
          name: this.getViewElementUniqueName(),
        },
        this,
        'children'
      );
    } else if (typeof options === 'string') {
      viewElement = ViewElement.from(
        {
          ...viewElementOptions,
          name: options,
        },
        this,
        'children'
      );
    } else if (options instanceof ViewElement) {
      viewElement = options as ViewElement;
      // 迁移关系
      if ((viewElement as any).ensureDelete) {
        // 兼容主仓 API，如无该方法忽略
        try {
          (viewElement as any).ensureDelete();
        } catch (_) {}
      }
      Object.assign(viewElement as any, relationOptions);
    } else {
      viewElement = ViewElement.from(
        {
          ...viewElementOptions,
          ...options,
        },
        this,
        'children'
      );
    }
    // 保证父关系
    (viewElement as any).parentNode = this;
    (viewElement as any).parentKey = 'children';
    if (!Array.isArray(this.children)) this.children = [];
    this.children.splice(index, 0, viewElement);
    return viewElement;
  }

  /**
   * 插入页面元素
   * @param name 页面元素名称，如果不填会自动生成一个唯一名称
   */
  insertViewElementAt(name: string, index: number): ViewElement;

  /**
   * 插入页面元素
   * @param viewElementOptions 页面元素参数
   */
  insertViewElementAt(viewElementOptions: Partial<ViewElement>, index: number): ViewElement;

  /**
   * 插入页面元素
   * @param viewElement 已有的页面元素实例
   */
  insertViewElementAt(viewElement: ViewElement, index: number): ViewElement;

  insertViewElementAt(options: string | Partial<ViewElement> | ViewElement, index: number) {
    const node = this._insertViewElementAt(options as any, index);
    this.emit('create', {
      action: 'create',
      parentNode: this,
      parentKey: 'children',
      index,
      object: node,
      target: node,
    });
    return node;
  }

  /**
   * 添加页面元素
   * @internal
   * @param name 页面元素名称，如果不填会自动生成一个唯一名称
   */
  _addViewElement(name?: string): ViewElement;

  /**
   * 添加页面元素
   * @internal
   * @param viewElementOptions 页面元素参数
   */
  _addViewElement(viewElementOptions: Partial<ViewElement>): ViewElement;

  /**
   * 添加页面元素
   * @internal
   * @param viewElement 已有的页面元素实例
   */
  _addViewElement(viewElement: ViewElement): ViewElement;

  _addViewElement(options?: string | Partial<ViewElement> | ViewElement) {
    const index = this.children.length;
    return this._insertViewElementAt(options as any, index);
  }

  /**
   * 添加页面元素
   * @param name 页面元素名称，如果不填会自动生成一个唯一名称
   */
  addViewElement(name?: string): ViewElement;

  /**
   * 添加页面元素
   * @param viewElementOptions 页面元素参数
   */
  addViewElement(viewElementOptions: Partial<ViewElement>): ViewElement;

  /**
   * 添加页面元素
   * @param viewElement 已有的页面元素实例
   */
  addViewElement(viewElement: ViewElement): ViewElement;

  addViewElement(options?: string | Partial<ViewElement> | ViewElement) {
    const node = this._addViewElement(options as any);
    const index = this.children.indexOf(node);
    this.emit('create', {
      action: 'create',
      parentNode: this,
      parentKey: 'children',
      index,
      object: node,
      target: node,
    });
    return node;
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

  // 兼容
  // 更新当前组件及子组件的名称，确保 name 唯一性
  updateUniqueViewElementName() {
    const updateName = (node: any) => {
      if (node.concept === 'ViewElement') {
        let tag = node.tag || 'div';
        const uniqueName = this.getViewElementUniqueName(`${tag}_1`) || '';
        uniqueName && (node.name = uniqueName);
      }
    };
    this.traverseStrictChildren(updateName);
    return this;
  }

  isLikeComponent(node: types.SyntaxNode) {
    return node?.concept === 'View';
  }

  // 获取currentList
  getCurrentList() {
    const argsList: string[] = [];
    let parent = this.parentNode;
    let index = 0;
    while (parent && !this.isLikeComponent(parent)) {
      if ((parent as ViewElement).slotScope) {
        argsList.push(index === 0 ? 'current' : 'current' + index);
        index++;
      }
      parent = parent.parentNode;
    }
    return argsList;
  }

  get refName() {
    let refName = this.name;
    const list = this.getCurrentList();
    if (Array.isArray(list) && list.length) {
      list.forEach((item) => {
        refName += `_\${(${item} || {}).__nodeKey || (${item} || {}).index}`;
      });
    }
    return refName;
  }

  get keyName() {
    // 是否配置了v-if
    const isDefineIf = this.bindDirectives.some((directive) => directive.name === 'if' && directive.expression);
    const isClouduiTableColumn = this.tag === 'u-table-view-column';
    if (isDefineIf || isClouduiTableColumn) {
      let key = this.name;
      const list = this.getCurrentList();
      // v-for中需要加上nodeKey
      if (Array.isArray(list) && list.length) {
        list.forEach((item) => {
          key += `_\${(${item} || {}).__nodeKey || (${item} || {}).index}`;
        });
      }

      return key;
    }

    return null;
  }

  toVue(options?: {
    tabSize?: number;
    indentLevel?: number;
    finalCode?: boolean;
    nodePathAttr?: boolean;
    attrFormat?: (attr: BindAttribute, element?: ViewElement, defaultResult?: string) => string | false;
    bindStylesFormat?: (bindStyles: any[], element?: ViewElement) => string | false;
    getExtraParts?: (element?: ViewElement) => string[];
  }): string {
    const tabSize = options?.tabSize ?? 2;
    const indentLevel = options?.indentLevel ?? 0;
    const finalCode = options?.finalCode !== false; // 默认 true
    const pad = ' '.repeat(tabSize * indentLevel);
    const tag = this.tag || 'div';

    const parts: string[] = [];
    const bindAttrs = this.bindAttrs || [];

    let currentList: string[] = [];
    if (Array.isArray(options?.currentList)) {
      currentList = [...options?.currentList];
    }
    if (this.slotScope) {
      currentList.unshift(this.slotScope);
    }

    // ⚠️：先处理静态样式，后续属性可能有需要覆盖style的，比如 hideField属性
    if (this.staticStyle) {
      const styleValue = String(this.staticStyle).replace(/"/g, '&quot;');
      parts.push(`style="${styleValue}"`);
    }

    // 处理 nodePath 属性（设计器模式）
    if (options?.nodePathAttr) {
      const nodePath = (this as any).nodePath || (this as any).id || '';
      if (nodePath) {
        parts.push(`vusion-node-path="${nodePath}"`);
      }
      parts.push(`vusion-node-tag="${this.tag}"`);
      // if (['u-form-item', 'u-table-view-column'].includes(tag)) {
      //   parts.push('draggable');
      // }
    }

    if (this.refName && ['u-modal'].includes(this.tag)) {
      this.refName && parts.push(`:ref="\`${this.refName}\`"`);
    }
    // this.refName && parts.push(`:ref="\`${this.refName}\`"`);
    // this.keyName && parts.push(`:key="\`${this.keyName}\`"`);

    if (this.tag === 'u-form') {
      parts.push('formTemplateRenderRef');
    }

    // 处理插槽
    if (this.slotTarget) {
      parts.push(
        `#${this.slotTarget}` + (this.slotScope ? `="${currentList.length > 1 ? this.slotScope + (currentList.length - 1) : this.slotScope}"` : '')
      );
    }

    // 处理属性（bindAttrs）
    bindAttrs.forEach((attr) => {
      if (!attr || !attr.name) return;

      let result: string | false = '';
      if (options?.attrFormat) {
        result = options.attrFormat(attr, this, attr.toVue(options));
      } else {
        result = attr.toVue(options);
      }

      if (result !== false && result) {
        parts.push(result);
      }
    });

    // 处理指令（bindDirectives）
    const bindDirectives = this.bindDirectives || [];
    bindDirectives.forEach((directive: any) => {
      if (!directive || !directive.name) return;
      if (directive.toVue) {
        const result = directive.toVue(options);
        if (result) parts.push(result);
      } else {
        // 简化处理：如果没有 toVue 方法，直接格式化
        const value = directive.value || '';
        if (value) {
          parts.push(`v-${directive.name}="${String(value).replace(/"/g, "'")}"`);
        } else {
          parts.push(`v-${directive.name}`);
        }
      }
    });

    // 处理事件（bindEvents）
    const bindEvents = this.bindEvents || [];
    bindEvents.forEach((event: any) => {
      if (!event || !event.name) return;
      if (event.toVue) {
        const result = event.toVue(options);
        if (result) parts.push(result);
      } else {
        // 简化处理
        const value = event.value || '';
        if (value) {
          parts.push(`@${event.name}="${String(value).replace(/"/g, "'")}"`);
        }
      }
    });

    // 处理额外部分
    if (options?.getExtraParts) {
      const extraParts = options.getExtraParts(this);
      extraParts.forEach((part) => {
        if (part) parts.push(part);
      });
    }

    // 格式化属性字符串
    const partsString = parts.length > 0 ? ' ' + parts.join(' ') : '';

    // 处理子元素
    const children = this.children || [];
    let content = '';

    if (children.length > 0) {
      const childrenCode = children
        .map((c) => {
          const childOptions = { ...options, indentLevel: (options?.indentLevel || 0) + 1 };
          return c?.toVue(childOptions);
        })
        .filter(Boolean)
        .join('\n');

      if (childrenCode) {
        content = '\n' + childrenCode + '\n' + pad;
      }
    }

    // 构建标签
    return `${pad}<${tag}${partsString}>${content}</${tag}>`;
  }

  toDesignerVue(options?: { tabSize?: number; indentLevel?: number }) {
    return this.toVue({
      ...options,
      finalCode: false,
      nodePathAttr: true,
      attrFormat: (attr: BindAttribute, element?: ViewElement, defaultResult?: string) => {
        if (attr.concept === 'BindAttribute') {
          if (attr.type === 'dynamic') {
            return false;
          } else if (['rules', 'value', 'hideField'].includes(attr.name)) {
            return false;
          } else {
            return defaultResult;
          }
        }
        return false;
      },
      bindStylesFormat: () => false, // 设计器模式不格式化绑定样式
      getExtraParts: () => [], // 可以在这里添加设计器特有的额外属性
    });
  }

  /**
   * 遍历所有子 ViewElement 节点
   * @param cb 回调函数，对每个 ViewElement 执行
   */
  traverseChildren(cb: (ele: ViewElement) => void): void {
    // 使用 traverseStrictChildren 遍历所有子节点，但只处理 ViewElement 类型
    this.traverseStrictChildren((node) => {
      if (node.concept === 'ViewElement') {
        cb(node as ViewElement);
      }
    });
  }

  /**
   * 递归生成组件名，并返回旧名称到新名称的映射
   * @param node 参考节点（用于获取唯一名称生成器）
   * @returns 旧名称到新名称的映射 Map
   */
  deepRenameElements(node: ViewElement): Map<string, string> {
    const map = new Map<string, string>();
    this.traverseChildren((ele: ViewElement) => {
      const oldName = ele.name;
      if (!oldName) return;
      let tagName = ele.tag || 'div';
      // 生成新的唯一名称
      const newName = node.getViewElementUniqueName(`${tagName}_1`);
      ele.name = newName;
      map.set(oldName, newName);
    });
    return map;
  }

  /**
   * 简单的遍历函数（用于遍历节点树，处理 CallLogic、Identifier 等节点）
   * @param node 要遍历的节点
   * @param callback 回调函数
   * @param excludedKeys 需要排除的键集合
   */
  private static _simpleTraverse(
    node: any,
    callback: (current: { node: any; parent?: any }) => void,
    excludedKeys: Set<string> = new Set(['parentNode', 'parentKey'])
  ): void {
    if (!node || typeof node !== 'object') return;

    const visited = new WeakSet();

    const traverse = (current: any, parent?: any) => {
      if (!current || typeof current !== 'object') return;
      if (visited.has(current)) return;
      visited.add(current);

      // 调用回调
      callback({ node: current, parent });

      // 遍历对象的属性
      for (const key in current) {
        if (excludedKeys.has(key)) continue;
        if (!Object.prototype.hasOwnProperty.call(current, key)) continue;

        const value = current[key];
        if (value === null || value === undefined) continue;

        if (Array.isArray(value)) {
          // 数组：遍历每个元素
          for (const item of value) {
            if (item && typeof item === 'object') {
              traverse(item, current);
            }
          }
        } else if (typeof value === 'object') {
          // 对象：递归遍历
          traverse(value, current);
        }
      }
    };

    traverse(node);
  }

  /**
   * 复制当前节点
   * @returns 复制后的新节点
   */
  _duplicate(cb?: Function): ViewElement {
    // 1. 通过 toTemplateJSON 获取模板 JSON，并创建新实例
    const element = ViewElement.from(this.toTemplateJSON());

    // 2. 递归重命名所有子元素，获取名称映射
    const nameMap = element.deepRenameElements(this);

    // 3. 遍历新元素，更新引用和清理属性
    ViewElement._simpleTraverse(
      element,
      (current) => {
        const node = current.node as any;

        // 处理 CallLogic 节点：更新 uuid 和 calleeNamespace
        if (node.concept === 'CallLogic') {
          node.uuid = createUUID();
          if (node.calleeNamespace && /elements.(.+).logics/.test(node.calleeNamespace)) {
            const oldName = node.calleeNamespace.split('.')[1];
            if (nameMap.has(oldName)) {
              const newName = nameMap.get(oldName);
              node.calleeNamespace = `elements.${newName}.logics`;
            }
          }
        }

        // 处理 Identifier 节点（在 BindEvent 下）：更新 namespace
        if (node.concept === 'Identifier' && current.parent?.concept === 'BindEvent' && node.namespace?.startsWith('elements.')) {
          const strs = node.namespace.split('.');
          const oldName = strs[1];
          if (nameMap.has(oldName)) {
            const newName = nameMap.get(oldName);
            strs[1] = newName;
            node.namespace = strs.join('.');
          }
        }

        cb && cb?.(current);
      },
      ViewElement.JSON_EXCLUDED_KEYS
    );

    // 4. 清理 likeComponent 相关（如果存在）
    if ((this as any).likeComponent?.existingViewElement) {
      (this as any).likeComponent.existingViewElement.clear();
    }

    return element;
  }
}

export default ViewElement;
