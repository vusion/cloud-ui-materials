import * as naslTypes from '@nasl/ast-mini';
/**
 * 命名组，主要承载一次 mergeBlock 中的逻辑名称
 */
export interface NameGroup {
  logic?: string;
  structure?: string;
  load?: string;
  remove?: string;
  modify?: string;
  submit?: string;
  lowerEntity?: string;
  [key: string]: string;
}

export const filterProperty = (key) => (property: naslTypes.EntityProperty) => {
  if (property.display) {
    return property.display[key];
  }
  return !['id', 'createdTime', 'updatedTime'].includes(property.name);
};

export const firstUpperCase = (value) => value.replace(/^\S/, (letter) => letter.toUpperCase());
export const firstLowerCase = (value) => value.replace(/^\S/, (letter) => letter.toLowerCase());

export function transEntityMetadataTypes(typeAnnotation: naslTypes.TypeAnnotation, app: naslTypes.App) {
  let { typeName: propertyTypeName } = typeAnnotation || {};
  if (typeAnnotation?.typeNamespace?.endsWith('.metadataTypes')) {
    const referenceNode = app.findNodeByCompleteName(`${typeAnnotation.typeNamespace}.${typeAnnotation.typeName}`) || {};
    const { typeName } = referenceNode.typeAnnotation || {};
    propertyTypeName = typeName;
  }
  return propertyTypeName;
}

export function getFirstDisplayedProperty(entity: naslTypes.Entity) {
  let property = entity.properties.find((property1) => !property1.readonly);
  if (!property) property = entity.properties[0];
  return property;
}

function capFirstLetter(word) {
  if (!word) return word;

  return word[0].toUpperCase() + word.slice(1);
}

/**
 * 生成数据查询唯一的命名组
 * @param viewName 页面名称
 * @param componentName 组件名称
 * @param suffix 其它后缀，比如实体名等等
 * @param defaultInView 是否在页面逻辑中用 load 简写
 */
export function genUniqueQueryNameGroup(
  scope: naslTypes.App | naslTypes.Module | naslTypes.Namespace,
  view: naslTypes.View | naslTypes.BusinessComponent,
  componentName: string = '',
  defaultInView: boolean = true,
  suffix: string = '',
) {
  const result: NameGroup = {};
  result.viewLogicLoad = view?.getLogicUniqueName?.(`load${defaultInView ? '' : capFirstLetter(componentName)}${suffix ? capFirstLetter(suffix) : ''}`);
  result.logic = scope?.getLogicUniqueName?.(
    `load${capFirstLetter(view.name)}${componentName ? capFirstLetter(componentName) : ''}${suffix ? capFirstLetter(suffix) : ''}`,
  );
  result.structure = scope?.getStructureUniqueName?.(firstUpperCase(`${result.logic}Structure`));
  return result;
}

export function getEntityPromaryKeyProperty(entity: naslTypes.Entity) {
  return entity.properties.find((p) => p.primaryKey)?.name || 'id';
}

export function getAllEntityPromaryKeyProperty(entity: naslTypes.Entity) {
  return entity.properties.filter((property) => property.primaryKey || property.name === 'id');
}

export function getViewUniqueVariableNames(name: string, entityName: string) {
  const start = 1;
  if (entityName === name) {
    const newName = name.replace(/\d*$/, (m) => String(m === '' ? start : +m + 1));
    return newName;
  }
  return name;
}

// 拖拽到有slotScope的template中，current需要加1
export function getCurrentName(refElement: naslTypes.ViewElement) {
  let currentName = refElement.getCurrentName();
  const start = 1;
  if (refElement.tag === 'template' && !!refElement.slotScope) {
    currentName = currentName.replace(/\d*$/, (m) => String(m === '' ? start : +m + 1));
  }
  return currentName;
}
