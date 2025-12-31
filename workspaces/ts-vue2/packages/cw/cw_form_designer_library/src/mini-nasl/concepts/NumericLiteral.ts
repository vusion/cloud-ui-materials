import LogicItem from './LogicItem';
import { concept, property } from '../decorators';

@concept('数字字面量')
export class NumericLiteral extends LogicItem {
  static readonly ConceptName = 'NumericLiteral';
  /**
   * 是否为抽象类
   * 抽象类不能产生 concept: string
   */
  static isAbstract: boolean = false;
  /** 继承链 */
  static readonly inheritanceChain: string[] = ['LogicItem', 'BaseNode'];

  constructor(source?: Partial<NumericLiteral>) {
    source = Object.assign({}, NumericLiteral.getDefaultOptions(), source);
    super(source);
    super.subConstructor(source);
  }

  static from(source: any, parentNode?: any, parentKey?: string): NumericLiteral {
    return super.from(source, parentNode, parentKey) as any;
  }

  @property()
  value: string = 0;

  toVue(options?: any): string {
    const code = this.value ? String(this.value) : '';
    return code;
  }

  static getDefaultOptions(): any {
    return {
      value: 0,
    };
  }
}

export default NumericLiteral;
