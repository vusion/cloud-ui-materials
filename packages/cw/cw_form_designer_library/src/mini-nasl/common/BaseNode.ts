import { getConceptMeta, getConceptConstructor, excludedInJSON, property, circular, getConceptPropertyMap } from '../decorators';
import EventEmitter from './EventEmitter';
import { createUUID } from '../utils';

export type SyntaxNode = BaseNode & { concept: string };

export class BaseNode extends EventEmitter {
  static readonly ConceptName: string = 'BaseNode';

  /**
   * 节点类别缓存
   */
  @excludedInJSON()
  private _concept?: string;

  /**
   * 概念
   */
  @property()
  get concept() {
    return this._concept ?? ((this.constructor as any).ConceptName as string);
  }

  /**
   * 唯一 Id
   */
  id: string = createUUID();

  get nodePath() {
    return this.getNodePath(false);
  }

  /**
   * 父节点
   */
  @circular()
  parentNode: SyntaxNode | null = null;

  parentKey: string = '';

  /**
   * 节点名称
   */
  @property()
  name?: string;

  constructor(source?: Partial<BaseNode>) {
    super();

    // 监听 create、delete、update 事件，统一向上冒泡
    this.on('create', this.genActionListener);
    this.on('delete', this.genActionListener);
    this.on('update', this.genActionListener);
  }

  genActionListener($event: any) {
    if (!$event.eventList) {
      $event.eventList = [];
    }
    if (!$event.eventStop) {
      $event.eventList.push($event);
    }
    $event.originEvent = $event.originEvent || $event;
    // 若已启用收集机制：直接投递到根 View 的 storage，并阻断后续即时 change 与冒泡
    let rootView: any = (this as any).view || (this as any).rootNode;
    if (!rootView && (this as any).concept === 'View') {
      rootView = this;
    }
    const hasCollector = rootView && typeof rootView._isCollectingCount === 'number';
    if (hasCollector) {
      rootView.emit('storage', $event);
      return;
    }
    // 非收集态：同步抛出一次 change
    this.onChange($event);

    // 如果是 View 节点（mini-nasl 的顶层节点），触发 storage 事件
    if ((this as any).concept === 'View') {
      this.emit('storage', $event);
    } else if (this.parentNode && this.parentNode.emit) {
      // 否则向上冒泡到父节点
      const event = {
        action: 'update',
        path: (this.parentNode as any)?.getNodePath ? (this.parentNode as any).getNodePath(false) : '',
        object: {},
        oldObject: {},
        originEvent: $event.originEvent,
        eventList: $event.eventList,
        // eventStop 为 true 后，数据不再存入 eventList
        eventStop: true,
      };
      this.parentNode.emit('update', event);
    }
  }

  onChange($event?: any) {
    this.emit('change', $event);
  }

  getNodePath(useIndex: boolean = false): string {
    let node = this as unknown as SyntaxNode;
    const pathArr: string[] = [];

    while (node) {
      let path = '';
      const { parentNode } = node;
      if (parentNode) {
        const { parentKey } = node;
        path = parentKey || '';
        const parentProperty = (parentNode as any)[parentKey];

        // 如果父节点的属性是数组，需要处理索引或名称
        if (Array.isArray(parentProperty)) {
          const name = (node as any).name;

          // 如果 useIndex 为 true，直接使用索引
          if (useIndex) {
            const index = parentProperty.findIndex((item) => {
              if (item === node) {
                return true;
              }
              // 通过 id 匹配（处理 proxy 情况）
              return (item as any)?.id && (item as any).id === (node as any)?.id;
            });
            path += `[${index}]`;
          } else {
            // useIndex 为 false 时，检查是否存在同名节点
            const siblingNode: BaseNode | undefined = name
              ? (parentProperty as BaseNode[]).find((child) => {
                  // 因为可能存在 proxy，需要判断 id
                  const childName = (child as any)?.name;
                  const childId = (child as any)?.id;
                  const nodeId = (node as any)?.id;
                  // 名称相同，不是同一个对象，且（都没有 id 或 id 不同）
                  return childName === name && child !== node && (!childId || !nodeId || childId !== nodeId);
                })
              : undefined;

            // 如果有同名节点或没有名称，使用索引；否则使用名称
            if (siblingNode || !name) {
              const index = parentProperty.findIndex((item) => {
                if (item === node) {
                  return true;
                }
                return (item as any)?.id && (item as any).id === (node as any)?.id;
              });
              path += `[${index}]`;
            } else {
              path += `[name=${name}]`;
            }
          }
        }
        pathArr.unshift(path);
      }
      node = parentNode;
    }

    // mini-nasl 中顶层节点是 View，路径前缀使用 'view'
    pathArr.unshift('view');
    return pathArr.join('.');
  }

  subConstructor(source?: Partial<BaseNode>) {
    // 如果 source 中有 concept，先设置 _concept，这样 get concept() 可以正确返回
    if (source?.concept && typeof source.concept === 'string') {
      (this as any)._concept = source.concept;
    }

    const concept = this.concept ?? ((this.constructor as any).ConceptName as string);
    const meta = getConceptMeta(concept);

    for (const key of meta.normalProperties) {
      if (key === 'concept') continue;
      const item = (source as any)?.[key];
      if (item === undefined) continue;
      (this as any)[key] = item;
    }

    const getChildInstance = (item: any, descriptor: any) => {
      // 对于 null、undefined、基础类型等非对象值，直接返回，避免错误实例化
      if (!item || typeof item !== 'object') return item;
      let Ctor: ReturnType<typeof getConceptConstructor> | undefined;

      // 遍历 objectRef 数组，尝试匹配实例
      for (const CtorName of descriptor.objectRef || []) {
        Ctor = getConceptConstructor(CtorName);

        if (item instanceof Ctor) {
          if (!item.parentNode || !item.parentKey) {
            item.parentNode = this;
            item.parentKey = descriptor.key;
          }
          return item;
        }
      }

      // 使用 BaseNode.from 创建实例，它会根据 item.concept 自动选择正确的构造函数
      const Constructor = Ctor?.from ? Ctor : BaseNode;
      return Constructor.from(item, this, descriptor.key);
    };

    // 子节点迭代
    for (const key of meta.childProperties) {
      const item = (source as any)?.[key];

      if (item === undefined) {
        continue;
      }

      (this as any)[key] = getChildInstance(item, meta.propertyMap.get(key) ?? meta.whitePropertyMap.get(key));
    }

    // 数组子节点迭代
    for (const key of meta.childrenProperties) {
      const item = (source as any)?.[key];

      if (item === undefined) {
        continue;
      }

      if (!Array.isArray(item)) {
        (this as any)[key] = item;
        continue;
      }

      const descriptor = meta.propertyMap.get(key) ?? meta.whitePropertyMap.get(key);
      const list: any[] = [];
      for (const sourceItem of item) {
        list.push(getChildInstance(sourceItem, descriptor));
      }
      (this as any)[key] = list;
    }
  }

  /**
   * 去除循环依赖，转为纯 JSON
   */
  toJSON() {
    return this._toJSON();
  }

  /**
   * 允许在迭代中使用回调来实时操作原始实例和生成的对象
   * @param cb 回调函数，用于在生成 JSON 后对结果进行处理
   * @param pre 前置钩子，在开始处理前调用
   * @param post 后置钩子，在处理完成后调用
   */
  _toJSON(cb?: (source: Partial<BaseNode>, instance?: BaseNode) => any, pre?: (oldNd?: BaseNode) => void, post?: (oldNd?: BaseNode) => void): any {
    // 之后可以手动特化一下，提速
    pre && pre(this);
    const source: Record<string, any> = {};
    const concept = (this as any).concept ?? (this.constructor as any).ConceptName;
    const { normalProperties, childProperties, childrenProperties, propertyMap } = getConceptMeta(concept);

    for (const key of normalProperties) {
      if (propertyMap.has(key)) {
        source[key] = (this as any)[key];
      }
    }

    for (const key of childProperties) {
      if (propertyMap.has(key)) {
        const sourceItem = (this as any)[key];
        source[key] = sourceItem?._toJSON?.(cb, pre, post) ?? sourceItem;
      }
    }

    for (const key of childrenProperties) {
      if (propertyMap.has(key)) {
        const sourceItem = (this as any)[key];

        if (Array.isArray(sourceItem)) {
          source[key] = sourceItem.map((child: any) => {
            return child?._toJSON?.(cb, pre, post) ?? child;
          });
        }
        // 可能是 null 这样的非数组但也有意义的值
        else {
          source[key] = sourceItem;
        }
      }
    }

    // concept 在原型链上，这里需要补一下属性
    source.concept = concept;

    const res = cb ? cb(source, this) : source;
    post && post(this);
    return res;
  }

  /**
   * 转换为模板 JSON（用于复制等场景，会删除 id 和 i18nKey）
   */
  toTemplateJSON() {
    return this._toJSON((source) => {
      delete source.id;
      return source;
    });
  }

  collectOldObject(params: { oldObject: any; key: string }): Array<any> {
    const res: Array<any> = [];
    const { oldObject, key } = params;
    const oldProperty = (this as any)[key] ?? null;
    oldProperty && res.push(oldProperty);
    if (Array.isArray(oldProperty)) {
      oldObject[key] = oldProperty.map((item) => {
        return item instanceof BaseNode ? item.toJSON() : item;
      });
    } else if (oldProperty instanceof BaseNode) {
      oldObject[key] = oldProperty.toJSON();
    } else {
      oldObject[key] = oldProperty;
    }
    return res;
  }

  updateInstance(object: any): Array<any> {
    const res: Array<any> = [];
    for (const key in object) {
      if (key === 'concept') continue;
      const property = object[key] ?? null;
      property && res.push(property);
      (this as any)[key] = property;
      const objectRefCtor = getConceptConstructor(property?.concept);
      if (Array.isArray(property)) {
        (this as any)[key] = property.map((item) => {
          let propertyItem = item ?? null;
          const propertyObjectRefCtor = getConceptConstructor(item?.concept);
          if (propertyObjectRefCtor?.from) {
            propertyItem = (propertyObjectRefCtor as any).from(item, this, key);
            propertyItem.parentNode = this;
            propertyItem.parentKey = key;
          }
          return propertyItem;
        });
      } else if (objectRefCtor?.from) {
        (this as any)[key] = (objectRefCtor as any).from(property, this, key);
        (this as any)[key].parentNode = this;
        (this as any)[key].parentKey = key;
      }
    }
    return res;
  }

  update(object: any) {
    const path = this.getNodePath(false);
    const oldObject: any = {};
    const newObject: any = {};
    let oldObjNasl: Array<BaseNode> = [];

    for (const key in object) {
      if (key === 'concept') continue;
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        oldObjNasl = oldObjNasl.concat(this.collectOldObject({ oldObject, key }));
        newObject[key] = object[key];
      }
    }

    const objNasl = this.updateInstance(object);

    this.emit('update', {
      action: 'update',
      path,
      object: newObject,
      oldObject,
      objNasl,
      oldObjNasl,
    });
  }

  /**
   * 内部删除方法，执行实际的删除操作
   * @returns 删除操作的参数，包括 parentNode, parentKey, index 等信息
   */
  _delete(): {
    parentNode: SyntaxNode | null;
    parentKey: string;
    index: number;
    object: null;
    oldObject: BaseNode;
  } | null {
    const params = {
      parentNode: this.parentNode,
      parentKey: this.parentKey,
      index: -1,
      object: null,
      oldObject: this,
    };

    if (params.parentNode && params.parentKey) {
      const parentNode = params.parentNode;
      const parentKey = params.parentKey;
      const parentProperty = (parentNode as any)[parentKey];

      if (Array.isArray(parentProperty)) {
        // 从数组中删除
        const index = parentProperty.findIndex((child) => {
          // 通过 id 匹配（处理 proxy 情况）
          if (child === this) return true;
          return (child as any)?.id && (child as any).id === this.id;
        });
        if (index !== -1) {
          parentProperty.splice(index, 1);
          params.index = index;
        }
      } else {
        // 单个属性，设置为 undefined
        const oldNode = parentProperty;
        if (oldNode === this || ((oldNode as any)?.id && (oldNode as any).id === this.id)) {
          params.index = 0;
          (parentNode as any)[parentKey] = undefined;
        }
      }
    }

    return params;
  }

  /**
   * 如果有父节点，则删除节点，在添加时调用
   * 用于在将节点添加到新位置之前，先从其原来的位置删除
   */
  ensureDelete() {
    if (this.parentNode && this.parentKey) {
      const path = this.getNodePath(false);
      const parentParams = this._delete();
      if (parentParams && parentParams.index !== -1) {
        if (Array.isArray((this.parentNode as any)[this.parentKey])) {
          this.emit('delete', {
            action: 'delete',
            path,
            object: null,
            objNasl: [],
            oldObjNasl: [this],
            ...parentParams,
          });
        } else {
          const parentPath = this.parentNode.getNodePath(false);
          this.parentNode.emit('update', {
            action: 'update',
            path: parentPath,
            object: {
              [this.parentKey]: null,
            },
            oldObject: {
              [this.parentKey]: this.toJSON(),
            },
            objNasl: [],
            oldObjNasl: [this],
          });
        }
      }
    }
  }

  /**
   * 删除节点
   * 会触发 delete 或 update 事件，最终通过 genActionListener 触发 change 事件
   */
  delete() {
    const path = this.getNodePath(false);
    const parentParams = this._delete();

    if (parentParams && parentParams.index !== -1) {
      if (Array.isArray((this.parentNode as any)?.[this.parentKey])) {
        // 从数组中删除，触发 delete 事件
        this.emit('delete', {
          action: 'delete',
          path,
          object: null,
          objNasl: [],
          oldObjNasl: [this],
          ...parentParams,
        });
      } else {
        // 单个属性删除，触发父节点的 update 事件
        const parentPath = this.parentNode?.getNodePath ? this.parentNode.getNodePath(false) : '';
        this.parentNode?.emit('update', {
          action: 'update',
          path: parentPath,
          object: {
            [this.parentKey]: null,
          },
          oldObject: {
            [this.parentKey]: this.toJSON(),
          },
          objNasl: [],
          oldObjNasl: [this],
        });
      }
    }
  }

  /**
   * 移动节点
   * @param sourceNode
   * @param position
   */
  moveNode(options: { sourceNode: BaseNode; position: 'append' | 'insertBefore' | 'insertAfter'; action?: string }) {
    const { sourceNode, position } = options;
    let actionMsg = `移动${(this.constructor as any).nodeTitle}`;
    if (this.name) {
      actionMsg += `“${this.name}”`;
    }

    const view = sourceNode?.concept === 'View' ? sourceNode : sourceNode?.view;
    view.emit('collect:start', {
      actionMsg,
    });
    // 如果是兄弟节点之前的移动
    if (position !== 'append' && this.concept !== sourceNode.concept) {
      return;
    }
    // 先删
    this.delete();
    if (position === 'append') {
      let { action } = options;
      if (!action) action = `add${this.concept}`;
      const parentNode = sourceNode;
      (parentNode as any)[action](this as any);
    } else {
      const parentNode = sourceNode?.parentNode;
      const parentKey = sourceNode?.parentKey || '';
      const list = (parentNode as any)[parentKey];
      if (Array.isArray(list)) {
        let index = list.indexOf(sourceNode);
        if (position === 'insertAfter') {
          index += 1;
        }
        Object.assign(this, {
          parentNode,
          parentKey,
        });

        // 注释掉这行，否则拖拽的时候会更新name
        // if (this.concept === 'ViewElement') this.name = (this as unknown as ViewElement).getViewElementUniqueName(this.name);

        list.splice(index, 0, this);
        this.emit('create', {
          action: 'create',
          parentNode,
          parentKey,
          index,
          object: this,
          target: this,
        });
      }
    }
    view.emit('collect:end');
    return this;
  }

  static from(source: any, parentNode?: BaseNode, parentKey?: string): BaseNode {
    // 根据 source.concept 获取具体的构造函数，如果没有则使用当前类
    const Ctor: any = getConceptConstructor(source?.concept) ?? this;

    // 检查 Ctor 是否存在，并且 source 是否已经是该类的实例
    if (Ctor && source instanceof Ctor) {
      if (parentNode && !source.parentNode) {
        source.parentNode = parentNode as any;
      }
      if (parentKey && !source.parentKey) {
        source.parentKey = parentKey;
      }
      return source;
    }

    // 如果 Ctor 存在，创建新实例
    if (Ctor) {
      const instance = new Ctor({});
      const ctorConcept = (Ctor as any).ConceptName;
      if (ctorConcept && !(instance as any)._concept) {
        (instance as any)._concept = ctorConcept;
      }
      const finalSource = {
        ...source,
        concept: source?.concept ?? ctorConcept,
        parentNode,
      };
      if (parentNode && !instance.parentNode) {
        instance.parentNode = parentNode as any;
      }
      if (parentKey && !instance.parentKey) {
        instance.parentKey = parentKey;
      }
      instance.subConstructor(finalSource);
      return instance;
    }

    // 如果 Ctor 不存在，返回 source（兼容处理）
    return source;
  }

  /**
   * 获取添加时的默认选项
   * @returns
   */
  static getDefaultOptions(): any {
    return {};
  }

  /**
   * 根节点
   */
  get rootNode() {
    return this.getAncestor('View');
  }

  get view() {
    return this.getAncestor('View');
  }

  /**
   * 获取祖先节点
   */
  getAncestor<Concept extends SyntaxNode['concept']>(concept: Concept): SyntaxNode | null {
    let { parentNode } = this;
    while (
      parentNode &&
      parentNode.concept &&
      parentNode.concept !== concept &&
      !(parentNode.constructor as any).inheritanceChain?.includes(concept)
    ) {
      parentNode = parentNode.parentNode;
    }

    return parentNode as any;
  }

  /**
   * 迭代所有子节点
   *
   * @description 严格迭代所有子节点！排除属性！
   * @param cb 回调函数，对每个子节点执行
   * @param whitelist 白名单属性，即使不在 childProperties 或 childrenProperties 中也会遍历
   */
  traverseStrictChildren(cb: (el: SyntaxNode) => void, whitelist: string[] = []): void {
    const isBaseNode = (nd: SyntaxNode | null): nd is SyntaxNode => {
      if (!nd) return false;
      const concept = (nd as any).concept ?? (nd.constructor as any)?.ConceptName;
      return concept && typeof concept === 'string' && concept.length > 0;
    };

    const traverseChild = (child: SyntaxNode | null) => {
      if (isBaseNode(child)) {
        cb(child);
        traverse(child);
      }
    };

    const traverseChildren = (children: (SyntaxNode | null)[] | null) => {
      if (!Array.isArray(children)) {
        return;
      }

      for (const child of children) {
        traverseChild(child);
      }
    };

    const traverse = (node: SyntaxNode) => {
      const concept = (node as any).concept ?? (node.constructor as any)?.ConceptName;
      const meta = getConceptMeta(concept);
      const { childProperties, childrenProperties } = meta;

      // 遍历单个子节点属性
      for (const key of childProperties) {
        const child = (node as any)[key] as SyntaxNode | null;
        traverseChild(child);
      }

      // 遍历子节点数组属性
      for (const key of childrenProperties) {
        const children = (node as any)[key] as (SyntaxNode | null)[] | null;
        traverseChildren(children);
      }

      // 遍历白名单属性
      for (const key of whitelist) {
        const item = (node as any)[key] as any;

        if (Array.isArray(item)) {
          traverseChildren(item);
        } else {
          traverseChild(item);
        }
      }
    };

    // 从当前节点开始遍历
    cb(this as unknown as SyntaxNode);
    traverse(this as unknown as SyntaxNode);
  }

  /**
   * 迭代所有子节点
   *
   * @description 严格迭代所有子节点！排除属性！条件满足时整个遍历全部终止！
   *
   * 警告：获取到的不仅仅是语法节点还可能是数字。例如AssignmentLine的leftIndex也会被遍历到
   * @param cb 回调函数，对每个子节点执行
   * @param setStopFlag 设置停止标志的函数，返回 true 时停止遍历
   * @param whitelist 白名单属性，即使不在 childProperties 或 childrenProperties 中也会遍历
   */
  traverseStrictChildrenStopWhen(cb: (el: unknown) => void, setStopFlag: (el: unknown) => boolean, whitelist?: string[]): void {
    let shouldStop = false;

    const isBaseNode = (nd: unknown): nd is SyntaxNode => {
      if (!nd) return false;
      const concept = (nd as any)?.concept ?? (nd as any)?.constructor?.ConceptName;
      return concept && typeof concept === 'string' && concept.length > 0;
    };

    const __traverse = (node: any) => {
      if (isBaseNode(node)) {
        cb(node as SyntaxNode);
      }

      shouldStop = shouldStop || setStopFlag(node);

      if (shouldStop) {
        return;
      }

      const propertyMap = getConceptPropertyMap(node?.concept);
      if (!propertyMap) return;

      const propertyKeys = [...propertyMap.keys()];
      if (Array.isArray(whitelist) && whitelist.length) {
        propertyKeys.push(...whitelist);
      }
      for (const property of propertyKeys) {
        const child = node[property as keyof SyntaxNode];
        if (!child) continue;
        else if (Array.isArray(child)) child?.forEach?.((node: SyntaxNode) => __traverse(node));
        else __traverse(child);
      }
    };

    __traverse(this);
  }
}

export default BaseNode;
