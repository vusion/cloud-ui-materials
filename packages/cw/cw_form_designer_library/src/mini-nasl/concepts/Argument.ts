import LogicItem from './LogicItem';
import { concept, property } from '../decorators';
import StringLiteral from './StringLiteral';
import NumericLiteral from './NumericLiteral';
import BooleanLiteral from './BooleanLiteral';

type LiteralNode = StringLiteral | NumericLiteral | BooleanLiteral;

@concept('实际参数')
export class Argument extends LogicItem {
  static readonly ConceptName = 'Argument';

  /**
   * 是否为抽象类
   * 抽象类不能产生 concept: string
   */
  static isAbstract: boolean = false;
  /** 继承链 */
  static readonly inheritanceChain: string[] = ['LogicItem', 'BaseNode'];

  constructor(source?: Partial<Argument>) {
    source = Object.assign({}, Argument.getDefaultOptions(), source);
    super(source);
    super.subConstructor(source);
  }

  static from(source: any, parentNode?: any, parentKey?: string): Argument {
    return super.from(source, parentNode, parentKey) as any;
  }

  @property()
  keyword: string = '';

  @property()
  spread?: boolean;

  /**
   * 参数值
   */
  @property({
    objectRef: 'LogicItem',
  })
  expression?: LogicItem;

  toVue(options?: any): string {
    let code = this.spread ? '...' : '';
    if (this.expression) {
      code += this.expression.toVue(options);
    } else {
      code += 'undefined';
    }
    return code;
  }

  static getDefaultOptions(): any {
    return {
      keyword: '',
      spread: false,
    };
  }
}

export default Argument;
