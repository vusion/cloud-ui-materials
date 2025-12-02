import LogicItem from './LogicItem';
import { concept, property } from '../decorators';

@concept('布尔字面量')
export class BooleanLiteral extends LogicItem {
  static readonly ConceptName = 'BooleanLiteral';
  /**
   * 是否为抽象类
   * 抽象类不能产生 concept: string
   */
  static isAbstract: boolean = false;
  /** 继承链 */
  static readonly inheritanceChain: string[] = ['LogicItem', 'BaseNode'];

  constructor(source?: Partial<BooleanLiteral>) {
    source = Object.assign({}, BooleanLiteral.getDefaultOptions(), source);
    super(source);
    super.subConstructor(source);
  }

  static from(source: any, parentNode?: any, parentKey?: string): BooleanLiteral {
    return super.from(source, parentNode, parentKey) as any;
  }

  @property()
  value: string;

  toVue(options?: any): string {
    return this.value;
  }

  static getDefaultOptions(): any {
    return {
      value: false,
    };
  }
}

export default BooleanLiteral;
