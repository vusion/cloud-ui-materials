import * as naslTypes from '@nasl/ast-mini';
import {
  firstLowerCase,
  getFirstDisplayedProperty,
  genUniqueQueryNameGroup,
  getEntityPromaryKeyProperty,
  NameGroup,
  getCurrentName,
} from './utils';
import { genQueryLogic } from './genCommonBlock';

export function genListViewTemplate(entity: naslTypes.Entity, nameGroup: NameGroup) {
  const displayedProperty = getFirstDisplayedProperty(entity);
  const lowerEntityName = firstLowerCase(entity.name);
  const currentName = nameGroup.currentName || 'current';
  const valueExpression = `${currentName}.item.${lowerEntityName}.${displayedProperty.name}`;
  const dataSourceValue = `app.logics.${nameGroup.logic}(elements.$ce.page, elements.$ce.size)`;

  return `<VanListView
    ref="${nameGroup.viewElementMainView}"
    dataSource={${dataSourceValue}}
    pageSize={50}
    pageNumber={1}
    textField="${lowerEntityName}.${displayedProperty.name}"
    valueField="${lowerEntityName}.${getEntityPromaryKeyProperty(entity)}"
    pageable="auto-more"
    remotePaging={true}
    slotItem={
        (current) => <VanCell
            value={${valueExpression}}
            isLink
            slotTitle={
                <VanText text={${valueExpression}}></VanText>
            }>
        </VanCell>
    }
    slotPrev={
        <VanText text="上一页"></VanText>
    }
    slotNext={
        <VanText text="下一页"></VanText>
    }>
  </VanListView>`;
}

export function genListViewBlock(entity: naslTypes.Entity, refElement: naslTypes.ViewElement) {
  const likeComponent = refElement?.likeComponent;
  const dataSource = entity.parentNode;
  const module = dataSource.app;

  // 生成唯一name
  // 加到页面上的params、variables、logics等都需要唯一name
  // 页面上有ref引用的element也需要唯一name
  const viewElementMainView = likeComponent.getViewElementUniqueName('listView');
  const nameGroup = genUniqueQueryNameGroup(module, likeComponent, viewElementMainView);
  nameGroup.viewElementMainView = viewElementMainView;
  nameGroup.viewVariableEntity = likeComponent.getVariableUniqueName(firstLowerCase(entity.name));
  // 当前节点的currentName
  nameGroup.currentName = getCurrentName(refElement);

  // 收集所有和本实体关联的实体
  const entitySet: Set<naslTypes.Entity> = new Set();
  entitySet.add(entity);
  entity.properties.forEach((property) => {
    if (property.relationEntity) {
      // 有外键关联
      const relationEntity = dataSource?.findEntityByName(property.relationEntity);
      if (relationEntity) {
        const displayedProperty = getFirstDisplayedProperty(relationEntity);
        if (displayedProperty) entitySet.add(relationEntity);
      }
    }
  });
  const allEntities = [...entitySet];

  return `export function view() {
        return ${genListViewTemplate(entity, nameGroup)}
      }
      export namespace app.logics {
          ${genQueryLogic(allEntities, nameGroup, false, false)}
      }`;
}
