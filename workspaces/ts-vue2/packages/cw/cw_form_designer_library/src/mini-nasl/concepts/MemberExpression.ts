import LogicItem from './LogicItem';
import { concept, property } from '../decorators';
import BindAttribute from './BindAttribute';

const Identifier_RE = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

/**
 * 成员表达式
 */
@concept('成员表达式')
export class MemberExpression extends LogicItem {
  static readonly ConceptName = 'MemberExpression';
  /**
   * 是否为抽象类
   * 抽象类不能产生 concept: string
   */
  static isAbstract: boolean = false;
  /** 继承链 */
  static readonly inheritanceChain: string[] = ['LogicItem', 'BaseNode'];

  constructor(source?: Partial<MemberExpression>) {
    source = Object.assign({}, MemberExpression.getDefaultOptions(), source);
    super(source);
    super.subConstructor(source);
  }

  static from(source: any, parentNode?: any, parentKey?: string): MemberExpression {
    return super.from(source, parentNode, parentKey) as any;
  }

  /**
   * 对象表达式
   */
  @property({ objectRef: 'LogicItem' })
  object?: LogicItem;

  /**
   * 属性表达式
   */
  @property({ objectRef: 'LogicItem' })
  property?: LogicItem;

  /**
   * 选中的数据类型，这个用作暂存
   */
  typeAnnotation?: any;

  /**
   * 判断是否为组件属性
   */
  get isViewElementProperty(): boolean {
    if (!this.object) return false;

    // 检查 object 是否有 namespace 属性且符合组件属性模式
    const obj = this.object as any;
    if (obj?.namespace?.startsWith('elements.') && obj?.namespace?.endsWith('.property')) {
      return true;
    }

    // 检查是否为 elements.$ce 模式
    if (obj?.concept === 'MemberExpression') {
      const memberObj = obj as MemberExpression;
      if (memberObj.object && (memberObj.object as any)?.name === 'elements') {
        if ((memberObj.property as any)?.name === '$ce') {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * 获取组件属性完整名称
   */
  private get viewElementPropertyCompleteName(): string {
    let name: string | undefined;
    const obj = this.object as any;

    if (obj?.namespace?.startsWith('elements.') && obj?.namespace?.endsWith('.property')) {
      if (obj?.namespace?.startsWith('elements.$ce')) {
        name = '$ce';
      } else {
        name = obj.name;
      }
    } else if (obj?.concept === 'MemberExpression') {
      const memberObj = obj as MemberExpression;
      if (memberObj.object && (memberObj.object as any)?.name === 'elements') {
        if ((memberObj.property as any)?.name === '$ce') {
          name = '$ce';
        }
      }
    }

    const propName = (this.property as any)?.name || '';
    return name ? `elements_${name}.${propName}` : '';
  }

  /**
   * 获取 ViewElement 名称
   */
  getViewElementName(): string | undefined {
    if (!this.isViewElementProperty) return undefined;

    const obj = this.object as any;
    if (obj?.namespace?.startsWith('elements.') && obj?.namespace?.endsWith('.property')) {
      if (obj?.namespace?.startsWith('elements.$ce')) {
        return this.getAncestor('ViewElement')?.name;
      } else {
        return obj.name;
      }
    } else if (obj?.concept === 'MemberExpression') {
      const memberObj = obj as MemberExpression;
      if (memberObj.object && (memberObj.object as any)?.name === 'elements') {
        if ((memberObj.property as any)?.name === '$ce') {
          return this.getAncestor('ViewElement')?.name;
        }
      }
    }

    return undefined;
  }

  /**
   * 转换成 Vue 的模板格式
   */
  toVue(options?: any): string {
    // 组件属性处理
    if (this.isViewElementProperty) {
      return this.transfromAttrLogic({ type: 'toVue' });
    }

    const object = this.object ? String((this.object as any).toVue?.(options) || this.object) : '';
    const property = this.property ? String((this.property as any).toVue?.(options) || this.property) : '';

    const bindAttr: BindAttribute = this.getAncestor('BindAttribute') as BindAttribute;
    if (bindAttr && (bindAttr.sync || (bindAttr as any).model)) {
      return Identifier_RE.test(property) ? `${object}.${property}` : `${object}['${property}']`;
    }

    if (Identifier_RE.test(property)) {
      // return options?.finalCode === false ? `${object}.${property}` : `(${object} || {}).${property}`;
      return `(${object} || {}).${property}`;
    }
    // return options?.finalCode === false ? `${object}['${property}']` : `(${object} || {})['${property}']`;
    return `(${object} || {})['${property}']`;
  }

  /**
   * 专门处理组件属性 getter/setter
   */
  transfromAttrLogic(options?: { type: 'toVue' | 'toJS' }): string {
    const { type = 'toJS' } = options || {};
    let prefix = type === 'toVue' ? '' : 'this.';

    const elementName = this.getViewElementName();
    if (!elementName) return '';

    const propName = (this.property as any)?.name || '';
    if (propName === '_if') {
      return `${prefix}${elementName}_${propName}`;
    }

    // 简化处理：默认使用 state
    const kind = 'state';
    return `${prefix}${elementName}_${kind}_${propName}`;
  }

  /**
   * 获取完整的属性路径值
   */
  getValue(): string {
    let current: any = this;
    let value: string = '';

    // MemberExpression 有两个属性 object 代表父级，property 代表自己
    // 先向上找父级的值再获取自己的值进行拼接
    while (current && current.concept === 'MemberExpression' && current.object) {
      const currentValue = (current.property as any)?.name || '';
      value = value ? `${currentValue}.${value}` : currentValue;
      current = current.object;
    }

    // 最后一个是 Identifier 或其他类型，取 name 属性
    const currentValue = (current as any)?.name || '';
    value = value ? `${currentValue}.${value}` : currentValue || '';

    return value;
  }

  /**
   * 设置值
   */
  setValue(newValue: string) {
    if (this.isViewElementProperty) {
      // 改 namespace、name，当前组件跳过
      if (!this.viewElementPropertyCompleteName.includes('$ce')) {
        const obj = this.object as any;
        if (obj && typeof obj.update === 'function') {
          obj.update({
            name: newValue,
            namespace: `elements.${newValue}.property`,
          });
        }
      }
      return;
    }

    const valueList = newValue.split('.');
    const newValueList = valueList.reverse();
    let arrIndex = 0;

    let current: any = this;
    while (current && current.concept === 'MemberExpression' && current.object) {
      const propName = (current.property as any)?.name;
      if (propName !== newValueList[arrIndex]) {
        if (current.property && typeof (current.property as any).setName === 'function') {
          (current.property as any).setName(newValueList[arrIndex]);
        }
        return;
      }
      current = current.object;
      arrIndex++;
    }

    // 前面没有找到，到这里就是最后一项的值要修改
    if (current && typeof (current as any).setName === 'function') {
      (current as any).setName(newValueList[arrIndex]);
    }
  }

  /**
   * 设置数据结构属性名称
   */
  setName(name: string) {
    this.setValue(name);
  }

  /**
   * 获取简要描述
   */
  toBrief(): string {
    const objectBrief = this.object ? (this.object as any).toBrief?.() || (this.object as any).name || String(this.object) : '';
    const propertyBrief = this.property ? (this.property as any).toBrief?.() || (this.property as any).name || String(this.property) : '';
    return `${objectBrief}.${propertyBrief}`;
  }

  /**
   * 完整的属性名
   */
  get completePropertyName(): string {
    let newMemberExp: any = this;
    const properties: string[] = [];
    while (newMemberExp && newMemberExp.concept === 'MemberExpression') {
      const propName = (newMemberExp?.property as any)?.name;
      if (propName) {
        properties.push(propName);
      }
      newMemberExp = newMemberExp.object;
    }
    return properties.reverse().join('.');
  }

  /**
   * 完整名称
   */
  get completeName(): string {
    if (this.isViewElementProperty) {
      return this.viewElementPropertyCompleteName;
    }

    const object: string = (this.object as any)?.completeName || (this.object as any)?.name || '';
    const property: string = (this.property as any)?.completeName || (this.property as any)?.name || '';

    return Identifier_RE.test(property) ? `${object}.${property}` : `${object}['${property}']`;
  }

  /**
   * 获取最后一个对象节点
   */
  get lastObject(): LogicItem | undefined {
    let tempNode: any = this;
    while (tempNode?.object?.concept === 'MemberExpression') {
      tempNode = tempNode.object;
    }
    return tempNode?.object;
  }

  /**
   * 获取第一个 MemberExpression 节点
   */
  firstMemberExpressionNode(): MemberExpression {
    let tempNode: any = this;
    while (tempNode?.parentNode?.concept === 'MemberExpression') {
      tempNode = tempNode.parentNode;
    }
    return tempNode;
  }
}

export default MemberExpression;
