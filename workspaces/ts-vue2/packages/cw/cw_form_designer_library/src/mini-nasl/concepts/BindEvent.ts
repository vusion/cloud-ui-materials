import { BaseNode } from '../common/BaseNode';
import { concept, property } from '../decorators';
import { getConceptConstructor } from '../decorators/utils';
import Logic from './Logic';
import LogicItem from './LogicItem';
import Argument from './Argument';
import { genUniqueName } from '../utils';

/**
 * 元素绑定事件
 */
@concept('元素绑定事件')
export class BindEvent extends BaseNode {
  static readonly ConceptName = 'BindEvent';

  constructor(source?: Partial<BindEvent>) {
    source = Object.assign({}, BindEvent.getDefaultOptions(), source);
    super(source);
    super.subConstructor(source);
  }

  static from(source: any, parentNode?: any, parentKey?: string): BindEvent {
    return super.from(source, parentNode, parentKey) as any;
  }

  /**
   * 元素绑定事件名称
   */
  @property()
  name: string = '';

  /**
   * 逻辑或逻辑名列表
   */
  @property({
    objectRef: 'Logic ',
    isArray: true,
  })
  logics: Array<Logic> = [];

  /**
   * 实际参数
   */
  @property({
    objectRef: 'Argument',
    isArray: true,
  })
  arguments?: Argument[];

  /**
   * 设置元素绑定事件名称
   */
  setName(name: string) {
    this.update({
      name,
      field: 'name',
    });
  }

  /**
   * 获取已存在的逻辑名称
   * @param excludedList 排除的验证规则列表
   */
  getLogicExistingNames(excludedList: Array<Logic> = []) {
    const excludedSet = new Set(excludedList);
    return ((this.logics as Logic[]) || [])
      .filter((item) => !excludedSet.has(item) && !excludedSet.has((item as any)?.__v_raw))
      .map((item) => item.name);
  }

  /**
   * 获取唯一的逻辑名称
   * @param name 基础名称，默认为 'logic1'
   */
  getLogicUniqueName(name = 'logic1') {
    const existingNames = new Set(this.getLogicExistingNames());
    return genUniqueName(name, existingNames);
  }

  /**
   * 插入实际参数
   * @internal
   * @param argumentOptions 实际参数参数
   */
  _insertArgumentAt(argumentOptions: Partial<Argument>, index: number): Argument;

  /**
   * 插入实际参数
   * @internal
   * @param argument 已有的实际参数实例
   */
  _insertArgumentAt(argument: Argument, index: number): Argument;

  _insertArgumentAt(options: Partial<Argument> | Argument, index: number) {
    const argumentOptions: any = {};
    const relationOptions = { parentNode: this, parentKey: 'arguments' };
    const Argument = getConceptConstructor('Argument');
    let argument: Argument;
    if (options instanceof Argument) {
      argument = options as Argument;
      // 迁移关系
      if ((argument as any).ensureDelete) {
        // 兼容主仓 API，如无该方法忽略
        try {
          (argument as any).ensureDelete();
        } catch (_) {}
      }
      Object.assign(argument as any, relationOptions);
    } else {
      argument = Argument.from(
        {
          ...argumentOptions,
          ...options,
        },
        this,
        'arguments'
      );
    }
    // 保证父关系
    (argument as any).parentNode = this;
    (argument as any).parentKey = 'arguments';
    if (!Array.isArray(this.arguments)) this.arguments = [];
    this.arguments.splice(index, 0, argument);
    return argument;
  }

  /**
   * 插入实际参数
   * @param argumentOptions 实际参数参数
   */
  insertArgumentAt(argumentOptions: Partial<Argument>, index: number): Argument;

  /**
   * 插入实际参数
   * @param argument 已有的实际参数实例
   */
  insertArgumentAt(argument: Argument, index: number): Argument;

  insertArgumentAt(options: Partial<Argument> | Argument, index: number) {
    const node = this._insertArgumentAt(options as any, index);
    this.emit('create', {
      action: 'create',
      parentNode: this,
      parentKey: 'arguments',
      index,
      object: node,
      target: node,
    });
    return node;
  }

  /**
   * 添加实际参数
   * @internal
   * @param argumentOptions 实际参数参数
   */
  _addArgument(argumentOptions: Partial<Argument>): Argument;

  /**
   * 添加实际参数
   * @internal
   * @param argument 已有的实际参数实例
   */
  _addArgument(argument: Argument): Argument;

  _addArgument(options?: Partial<Argument> | Argument) {
    const index = this.arguments?.length || 0;
    return this._insertArgumentAt(options as any, index);
  }

  /**
   * 添加实际参数
   * @param argumentOptions 实际参数参数
   */
  addArgument(argumentOptions: Partial<Argument>): Argument;

  /**
   * 添加实际参数
   * @param argument 已有的实际参数实例
   */
  addArgument(argument: Argument): Argument;

  addArgument(options?: Partial<Argument> | Argument) {
    const node = this._addArgument(options as any);
    const index = this.arguments?.indexOf(node) ?? -1;
    this.emit('create', {
      action: 'create',
      parentNode: this,
      parentKey: 'arguments',
      index,
      object: node,
      target: node,
    });
    return node;
  }

  /**
   * 删除实际参数
   * @param argument 已有的实际参数实例
   */
  removeArgument(argument: Argument): void {
    return argument.delete();
  }

  /**
   * 转换成 Vue 的模板格式
   */
  toVue(options?: any): string {
    let code = '';
    if (this.logics?.length) {
      code += `@${this.name}="`;
      const argsList: string[] = [];
      if (this.logics?.length) {
        let parent = this.parentNode;
        let index = 0;
        while (parent && parent.concept !== 'View') {
          if ((parent as any).slotScope) {
            argsList.unshift(index === 0 ? 'current' : 'current' + index);
            index++;
          }
          parent = parent.parentNode;
        }
        argsList.unshift('$event');
      }

      // 生成事件处理函数名（简化版）
      // 格式：元素名称_事件名称（去除连字符）
      const eventName = this.name.replace(/-/g, '');
      let handlerName = '';
      if (this.parentNode && (this.parentNode as any).name) {
        handlerName = `${(this.parentNode as any).name}_${eventName}`;
      } else {
        handlerName = eventName;
      }

      code += handlerName;
      code += '(';
      argsList.forEach((arg, idx) => {
        code += arg;
        if (idx !== argsList.length - 1) code += ', ';
      });
      code += ')';
      code += `"`;
    }
    return code;
  }

  toJS(options?: any): string {
    let code = '';
    if (this.logics?.length) {
      code += `async `;
      const argsList: string[] = [];
      if (this.logics?.length) {
        let parent = this.parentNode;
        let index = 0;
        while (parent && parent.concept !== 'View') {
          if ((parent as any).slotScope) {
            argsList.unshift(index === 0 ? 'current' : 'current' + index);
            index++;
          }
          parent = parent.parentNode;
        }
        argsList.unshift('event');
      }

      // 生成事件处理函数名（简化版）
      // 格式：元素名称_事件名称（去除连字符）
      const eventName = this.name.replace(/-/g, '');
      let handlerName = '';
      if (this.parentNode && (this.parentNode as any).name) {
        handlerName = `${(this.parentNode as any).name}_${eventName}`;
      } else {
        handlerName = eventName;
      }

      code += handlerName;
      code += '(';
      argsList.forEach((arg, idx) => {
        code += arg;
        if (idx !== argsList.length - 1) code += ', ';
      });
      code += ') {\n';

      const body = this.logics
        .map((logic) => (logic?.toJS?.() || '').trimEnd())
        .filter(Boolean)
        .map((chunk) =>
          chunk
            .split('\n')
            .map((line) => (line ? `  ${line}` : line))
            .join('\n')
        )
        .join('\n');

      if (body) {
        code += `${body}\n`;
      }
      code += `},`;
    }
    return code;
  }

  /**
   * 获取添加时的默认选项
   */
  static getDefaultOptions(): any {
    return {
      name: '',
      logics: [],
      arguments: [],
    };
  }
}

export default BindEvent;
