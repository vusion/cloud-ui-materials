import LogicItem from './LogicItem';
import { concept, property } from '../decorators';
import TypeAnnotation from './TypeAnnotation';

/**
 * 标识符
 */
@concept('标识符')
export class Identifier extends LogicItem {
  /** 类名 */
  static readonly ConceptName: string = 'Identifier';
  /**
   * 是否为抽象类
   * 抽象类不能产生 concept: string
   */
  static isAbstract: boolean = false;
  /** 继承链 */
  static readonly inheritanceChain: string[] = ['LogicItem', 'BaseNode'];

  constructor(source?: Partial<Identifier>) {
    source = Object.assign({}, Identifier.getDefaultOptions(), source);
    super(source);
    super.subConstructor(source);
  }

  static from(source: any, parentNode?: any, parentKey?: string): Identifier {
    return super.from(source, parentNode, parentKey) as any;
  }

  /**
   * 命名空间
   */
  @property()
  namespace?: string;

  /**
   * 标识符名称
   */
  @property()
  name: string = '';

  /**
   * 选中的数据类型，这个用作暂存
   */
  typeAnnotation?: TypeAnnotation;

  /**
   * 获取带命名空间的完整键名
   */
  getTokenKeyWithNamespace(): string {
    return this.namespace ? `${this.namespace}.${this.name}` : this.name;
  }

  /**
   * 判断是否为枚举
   */
  isEnum(): boolean {
    return this.namespace?.includes('.enums.') || false;
  }

  /**
   * 转换成 Vue 的模板格式
   */
  toVue(options?: any): string {
    let { name } = this;
    // const { namespace } = this;

    // if (namespace) {
    //   // 处理一些特殊的命名空间
    //   if (
    //     namespace.endsWith('nasl.browser') ||
    //     namespace.endsWith('nasl.auth') ||
    //     namespace.endsWith('nasl.configuration') ||
    //     namespace.endsWith('nasl.process')
    //   ) {
    //     name = `$global.${this.name}`;
    //   } else if (this.isEnum()) {
    //     // 枚举处理
    //     let enumName = this.name;
    //     if (namespace.startsWith('extensions.')) {
    //       enumName = `${namespace}.${this.name}`;
    //     }
    //     name = enumName;
    //   } else if (namespace.endsWith('logics')) {
    //     name = `'${namespace}.${name}'`;
    //   }
    // }

    return name;
  }

  /**
   * 获取简要描述
   */
  toBrief(): string {
    return this.name || '-';
  }

  /**
   * 方便快速取值
   */
  getValue(): string {
    // 实体逻辑 deleteBy/updateBy 的 filter 参数的回调函数的参数：_
    // 处理 _ 的显示问题
    if (this.name === '_') {
      const { parentNode } = this;
      if (parentNode) {
        let p: any = parentNode;
        while (p && p.concept !== 'CallLogic') {
          p = p.parentNode;
        }
        if (p && (p.calleeName === 'deleteBy' || p.calleeName === 'updateBy')) {
          const ns = (p.calleeNamespace || '').split('.');
          return ns[ns.length - 2] || this.name;
        }
        return 'item';
      }
    }
    return this.name;
  }

  /**
   * 完整名称
   */
  get completeName(): string {
    const arr = [this.name];
    if (this.namespace) {
      arr.unshift(this.namespace);
    }
    return arr.join('.');
  }

  /**
   * 设置命名空间
   */
  setNamespace(namespace: string) {
    this.update({
      namespace,
    });
  }

  /**
   * 设置标识符名称
   */
  setName(name: string) {
    this.update({
      name,
    });
  }

  /**
   * 同时设置名称和命名空间
   */
  setNameAndNamespace(name: string, namespace: string) {
    this.update({
      name,
      namespace,
    });
  }

  static getDefaultOptions(): any {
    return {
      name: '',
    };
  }
}

export default Identifier;
