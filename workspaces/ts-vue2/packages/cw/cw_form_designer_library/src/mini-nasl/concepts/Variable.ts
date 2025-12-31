import { BaseNode } from '../common/BaseNode';
import { concept, property } from '../decorators';
import TypeAnnotation from './TypeAnnotation';

@concept('变量')
export class Variable extends BaseNode {
  static readonly ConceptName = 'Variable';

  constructor(source?: Partial<Variable>) {
    source = Object.assign({}, Variable.getDefaultOptions(), source);
    super(source);
    super.subConstructor(source);
  }

  static from(source: any, parentNode?: any, parentKey?: string): Variable {
    return super.from(source, parentNode, parentKey) as any;
  }

  @property()
  name: string = '';

  @property()
  description?: string;

  /**
   * 类型标注
   */
  @property({
    objectRef: 'TypeAnnotation',
  })
  typeAnnotation?: TypeAnnotation;
}

export default Variable;
