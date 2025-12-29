import { getConceptMeta } from './utils';

export * from './utils';

// 供调试/兼容主仓：登记概念到类映射
export const ClassMap = new Map<string, any>();

export function concept(nodeTitle: string) {
  return (target: any) => {
    const concept = target.ConceptName ?? target.name;
    const meta = getConceptMeta(concept);

    // 继承父类的属性元数据（与主仓行为对齐）
    const proto = Object.getPrototypeOf(target);
    if (proto) {
      const pConcept = proto.ConceptName ?? proto.name;
      if (pConcept) {
        const pMeta = getConceptMeta(pConcept);
        // 复制父类属性映射
        pMeta.propertyMap.forEach((v, k) => meta.propertyMap.set(k, v));
        pMeta.whitePropertyMap.forEach((v, k) => meta.whitePropertyMap.set(k, v));
        // 合并属性分类
        meta.childProperties = [...new Set([...meta.childProperties, ...pMeta.childProperties])];
        meta.childrenProperties = [...new Set([...meta.childrenProperties, ...pMeta.childrenProperties])];
        meta.normalProperties = [...new Set([...meta.normalProperties, ...pMeta.normalProperties])];
      }
    }

    target.nodeTitle = nodeTitle;
    meta.constructor = target;
    ClassMap.set(concept, target);
  };
}

type PropertyDescriptorInput = {
  objectRef?: string;
  isArray?: boolean;
};

export function property(params?: PropertyDescriptorInput) {
  return function (target: any, key: string) {
    const concept = target.concept ?? target.constructor.ConceptName ?? target.constructor.name;
    const meta = getConceptMeta(concept);
    const desc = {
      key,
      objectRef: (params?.objectRef || '')
        .split('|')
        .map((s) => s.trim())
        .filter(Boolean),
      isArray: !!params?.isArray,
    };
    if (desc.objectRef.length > 0) {
      if (desc.isArray) meta.childrenProperties = [...new Set([...meta.childrenProperties, key])];
      else meta.childProperties = [...new Set([...meta.childProperties, key])];
      meta.propertyMap.set(key, desc);
    } else {
      meta.normalProperties = [...new Set([...meta.normalProperties, key])];
      meta.propertyMap.set(key, desc);
    }
  };
}

// JSON 序列化时排除字段（最小实现）
export function excludedInJSON(keys?: Array<string>) {
  return function (target: any, key: string) {
    if (!target.JSON_EXCLUDED_KEYS) target.JSON_EXCLUDED_KEYS = new Set();
    target.JSON_EXCLUDED_KEYS.add(key);
    keys && keys.forEach((k) => target.JSON_EXCLUDED_KEYS.add(k));
  };
}

// 白名单属性：也记录到 whitePropertyMap，供实例化读取
export function whiteProperty(params?: PropertyDescriptorInput) {
  return function (target: any, key: string) {
    const concept = target.concept ?? target.constructor.ConceptName ?? target.constructor.name;
    const meta = getConceptMeta(concept);
    const desc = {
      key,
      objectRef: (params?.objectRef || '')
        .split('|')
        .map((s) => s.trim())
        .filter(Boolean),
      isArray: !!params?.isArray,
    };
    if (desc.objectRef.length > 0) {
      if (desc.isArray) meta.childrenProperties = [...new Set([...meta.childrenProperties, key])];
      else meta.childProperties = [...new Set([...meta.childProperties, key])];
      meta.whitePropertyMap.set(key, desc);
    } else {
      meta.normalProperties = [...new Set([...meta.normalProperties, key])];
      meta.whitePropertyMap.set(key, desc);
    }
  };
}

/**
 * 表示上级对象，处理循环问题
 */
export function circular() {
  return function handleCircular(target: any, key: string | number | symbol) {
    if (!target.JSON_EXCLUDED_KEYS) target.JSON_EXCLUDED_KEYS = new Set();
    target.JSON_EXCLUDED_KEYS.add(key);
  };
}
