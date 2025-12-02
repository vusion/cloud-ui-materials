import { BaseNode } from '../common/BaseNode';
import { concept, property } from '../decorators';
import { createUUID } from '../utils';
import TypeAnnotation from './TypeAnnotation';

/**
 * 实体属性
 */
@concept('实体属性')
export class EntityProperty extends BaseNode {
  static readonly ConceptName = 'EntityProperty';

  constructor(source?: Partial<EntityProperty>) {
    source = Object.assign({}, EntityProperty.getDefaultOptions(), source);
    super(source);
    super.subConstructor(source);
  }

  static from(source: any, parentNode?: any, parentKey?: string): EntityProperty {
    return super.from(source, parentNode, parentKey) as any;
  }

  /**
   * 实体属性名称
   */
  @property()
  name: string = '';

  /**
   * 唯一标识
   */
  @property()
  uuid: string = createUUID();

  /**
   * 数据库列名
   */
  @property()
  columnName: string = '';

  /**
   * 实体属性标题
   */
  @property()
  label?: string;

  /**
   * 实体属性描述
   */
  @property()
  description?: string;

  /**
   * 类型标注
   */
  @property({
    objectRef: 'TypeAnnotation',
  })
  typeAnnotation?: TypeAnnotation;

  /**
   * 是否必填
   */
  @property()
  required?: boolean;

  /**
   * 当前属性是否为主键
   */
  @property()
  primaryKey?: boolean;

  /**
   * 显示方式
   */
  @property()
  display: Record<string, boolean> = {
    inDetail: true,
    inFilter: true,
    inForm: true,
    inTable: true,
  } as any;

  /**
   * 验证规则
   */
  @property({
    isArray: true,
  })
  rules: Array<string> = [];

  /**
   * 生成规则
   */
  @property()
  generationRule: 'auto' | 'autoIncrement' | 'manual' = 'auto';

  /**
   * 表示 Oracle 主键自增时的序列名称
   */
  @property()
  sequence?: string;

  /**
   * 关联实体的命名空间
   */
  @property()
  relationNamespace?: string;

  /**
   * 关联实体
   */
  @property()
  relationEntity?: string;

  /**
   * 关联属性
   */
  @property()
  relationProperty?: string;

  /**
   * 关联属性实体记录删除规则
   */
  @property()
  deleteRule?: 'protect' | 'cascade';

  /**
   * 设置实体属性标题
   */
  setLabel(label: string) {
    this.update({
      label,
    });
  }

  /**
   * 设置实体属性描述
   */
  setDescription(description: string) {
    this.update({
      description,
    });
  }

  /**
   * 设置是否必填
   */
  setRequired(required: boolean) {
    this.update({
      required,
    });
  }

  /**
   * 获取添加时的默认选项
   */
  static getDefaultOptions(): any {
    return {
      primaryKey: false,
    };
  }
}

export default EntityProperty;
