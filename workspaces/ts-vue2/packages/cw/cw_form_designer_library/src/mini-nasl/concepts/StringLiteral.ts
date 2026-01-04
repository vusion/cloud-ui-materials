import LogicItem from './LogicItem';
import { concept, property } from '../decorators';

@concept('字符串字面量')
export class StringLiteral extends LogicItem {
  static readonly ConceptName = 'StringLiteral';
  /**
   * 是否为抽象类
   * 抽象类不能产生 concept: string
   */
  static isAbstract: boolean = false;
  /** 继承链 */
  static readonly inheritanceChain: string[] = ['LogicItem', 'BaseNode'];

  constructor(source?: Partial<StringLiteral>) {
    source = Object.assign({}, StringLiteral.getDefaultOptions(), source);
    super(source);
    super.subConstructor(source);
  }

  static from(source: any, parentNode?: any, parentKey?: string): StringLiteral {
    return super.from(source, parentNode, parentKey) as any;
  }

  @property()
  value: string = '';

  toVue(options?: any): string {
    let code = '';
    if (typeof this.value === 'string') {
      code = `\`${this.value}\``;
    }
    return code;
  }

  static getDefaultOptions(): any {
    return {
      value: '',
    };
  }
}

export default StringLiteral;
