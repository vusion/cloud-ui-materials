import { BaseNode } from '../common/BaseNode';
import { concept, property } from '../decorators';

/**
 * 类型标注
 */
@concept('类型标注')
export class TypeAnnotation extends BaseNode {
  static readonly ConceptName = 'TypeAnnotation';

  constructor(source?: Partial<TypeAnnotation>) {
    source = Object.assign({}, TypeAnnotation.getDefaultOptions(), source);
    super(source);
    super.subConstructor(source);
  }

  static from(source: any, parentNode?: any, parentKey?: string): TypeAnnotation {
    return super.from(source, parentNode, parentKey) as any;
  }

  /**
   * 类型种类
   */
  @property()
  typeKind: 'primitive' | 'reference' | 'generic';

  /**
   * 类型命名空间
   */
  @property()
  typeNamespace?: string;

  /**
   * 类型名称
   */
  @property()
  typeName?: string;

  /**
   * 类型参数。泛型实参或联合类型的参数
   */
  @property({
    objectRef: 'TypeAnnotation',
    isArray: true,
  })
  typeArguments?: Array<TypeAnnotation>;

  /**
   * 规则对象
   */
  @property()
  ruleMap?: Record<string, number>;

  /**
   * 匿名数据结构属性（简化版：直接使用对象数组）
   */
  // @property()
  // properties?: Array<{
  //   name: string;
  //   typeAnnotation?: TypeAnnotation;
  //   [key: string]: any;
  // }>;

  /**
   * 设置类型名称
   */
  setTypeName(typeName: string) {
    this.update({
      typeName,
    });
  }

  /**
   * 设置类型命名空间
   */
  setTypeNamespace(typeNamespace: string) {
    this.update({
      typeNamespace,
    });
  }

  /**
   * 获取默认选项
   */
  // static getDefaultOptions(): any {
  //   return {
  //     typeKind: 'primitive',
  //     typeNamespace: 'nasl.core',
  //   };
  // }
}

export default TypeAnnotation;
