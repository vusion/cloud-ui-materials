export type ConceptMeta = {
  constructor: any;
  propertyMap: Map<string, any>;
  whitePropertyMap: Map<string, any>;
  childProperties: string[];
  childrenProperties: string[];
  normalProperties: string[];
};

export const ConceptMap = new Map<string, ConceptMeta>();

export function getConceptMeta(concept: string): ConceptMeta {
  let meta = ConceptMap.get(concept);
  if (!meta && concept) {
    meta = {
      constructor: (() => {}) as any,
      propertyMap: new Map(),
      whitePropertyMap: new Map(),
      childProperties: [],
      childrenProperties: [],
      normalProperties: [],
    };
    ConceptMap.set(concept, meta);
  }
  return meta;
}

export function getConceptConstructor<T = any>(concept: string | undefined): T | undefined {
  const conceptMeta = getConceptMeta(concept);

  if ((conceptMeta?.constructor as any)?.from) {
    return conceptMeta?.constructor as any;
  }
}

/**
 * 获取属性 map
 * @param concept
 * @returns
 */
export function getConceptPropertyMap(concept: string) {
  const conceptMeta = getConceptMeta(concept);
  return conceptMeta?.propertyMap;
}

/**
 * 获取白名单属性 map
 * @param concept
 * @returns
 */
export function getConceptWhitePropertyMap(concept: string) {
  const conceptMeta = getConceptMeta(concept);
  return conceptMeta?.whitePropertyMap;
}
