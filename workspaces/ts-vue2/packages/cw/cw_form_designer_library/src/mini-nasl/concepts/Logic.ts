import { BaseNode } from '../common/BaseNode';
import { concept, property } from '../decorators';

/**
 * 逻辑
 */
@concept('逻辑')
export class Logic extends BaseNode {
  static readonly ConceptName: string = 'Logic';
  static isAbstract: boolean = false;
  static readonly inheritanceChain: string[] = ['BaseNode'];

  constructor(source?: Partial<Logic>) {
    source = Object.assign({}, Logic.getDefaultOptions(), source);
    super(source);
    super.subConstructor(source);
  }

  static from(source: any, parentNode?: any, parentKey?: string): Logic {
    return super.from(source, parentNode, parentKey) as any;
  }

  @property()
  name: string = '';

  /**
   * 逻辑标题
   */
  @property()
  title?: string;

  /**
   * 逻辑描述
   */
  @property()
  description?: string;

  /**
   * 逻辑描述 (此部分魔改 ，不再继续使用LogicItem类，而是直接存储编译好的逻辑内容)
   */
  @property()
  body: string;

  /**
   * 设置逻辑名称
   */
  setName(name: string) {
    this.update({
      name,
      field: 'name',
    });
  }

  /**
   * 设置逻辑标题
   */
  setTitle(title: string) {
    this.update({
      title,
    });
  }

  /**
   * 设置逻辑描述
   */
  setDescription(description: string) {
    this.update({
      description,
    });
  }

  // 设置body
  setBody(body: string) {
    this.update({
      body,
    });
  }

  /**
   * 转换成 JavaScript 代码（简化版）
   */
  toJS(): string {
    return typeof this.body === 'string' ? this.body : '';
  }
}

export default Logic;
