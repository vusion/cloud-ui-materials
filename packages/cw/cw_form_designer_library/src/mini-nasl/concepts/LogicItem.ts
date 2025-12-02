import { BaseNode } from '../common/BaseNode';
import { concept, property } from '../decorators';
import TypeAnnotation from './TypeAnnotation';

/**
 * 逻辑项
 */
@concept('逻辑项')
export abstract class LogicItem extends BaseNode {
  static readonly ConceptName: string = 'LogicItem';
  /**
   * 是否为抽象类
   * 抽象类不能产生 concept: string
   */
  static isAbstract: boolean = true;
  /** 继承链 */
  static readonly inheritanceChain: string[] = ['BaseNode'];

  constructor(source?: Partial<LogicItem>) {
    source = Object.assign({}, LogicItem.getDefaultOptions(), source);
    super(source);
    super.subConstructor(source);
  }

  static from(source: any, parentNode?: any, parentKey?: string): LogicItem {
    return super.from(source, parentNode, parentKey) as any;
  }

  /**
   * 逻辑项标题
   */
  @property()
  label?: string;

  /**
   * 逻辑项描述
   */
  @property()
  description?: string;

  /**
   * 是否折叠
   */
  @property()
  folded?: boolean = false;

  /**
   * offsetX
   */
  @property()
  offsetX?: number;

  /**
   * offsetY
   */
  @property()
  offsetY?: number;

  /**
   * 类型标注
   */
  @property({
    objectRef: 'TypeAnnotation',
  })
  typeAnnotation?: TypeAnnotation;

  /**
   * 断点状态
   */
  @property()
  breakpoint?: 'ENABLED' | 'DISABLED';

  /**
   * 设置逻辑项标题
   */
  setLabel(label: string) {
    this.update({
      label,
    });
  }

  /**
   * 设置逻辑项描述
   */
  setDescription(description: string) {
    this.update({
      description,
    });
  }

  /**
   * 设置是否折叠
   */
  setFolded(folded: boolean) {
    this.update({
      folded,
    });
  }

  /**
   * 设置类型标注
   */
  setTypeAnnotation(typeAnnotation: TypeAnnotation) {
    if (typeAnnotation && typeof (typeAnnotation as any).ensureDelete === 'function') {
      (typeAnnotation as any).ensureDelete();
    }
    const relationOptions = { parentNode: this, parentKey: 'typeAnnotation' };
    Object.assign(typeAnnotation as any, relationOptions);
    this.update({
      typeAnnotation,
    });
  }

  /**
   * 设置逻辑节点位置
   * @param offsetX
   * @param offsetY
   */
  setPosition(offsetX: number, offsetY: number) {
    this.update({
      offsetX,
      offsetY,
    });
  }

  /**
   * 转换成 Vue 的模板格式
   */
  toVue(options?: any): string {
    return '[编译方法未实现]';
  }

  /**
   * 生成概要信息
   */
  toSummary() {
    return '[编译方法未实现]';
  }

  /**
   * 获取简要描述
   */
  toBrief(): string {
    return '-';
  }

  get completeName() {
    return (this as any).name;
  }
}

export default LogicItem;
