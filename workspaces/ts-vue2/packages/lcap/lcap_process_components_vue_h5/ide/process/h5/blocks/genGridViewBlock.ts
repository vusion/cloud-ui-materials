import * as naslTypes from '@nasl/ast-mini';
import {
  filterProperty,
  firstLowerCase,
  getFirstDisplayedProperty,
  genUniqueQueryNameGroup,
  getEntityPromaryKeyProperty,
  NameGroup,
  getCurrentName,
} from './utils';
import { genQueryLogic, genTextTemplate } from './genCommonBlock';

function genGridViewCardTemplate(property: naslTypes.EntityProperty, nameGroup: NameGroup) {
  return `${genTextTemplate(property, nameGroup)}`;
}

export function genGridViewTemplate(entity: naslTypes.Entity, nameGroup: NameGroup) {
  const properties = entity.properties.filter(filterProperty('inTable'));
  const dataSourceValue = `app.logics.${nameGroup.logic}(elements.$ce.page, elements.$ce.size)`;
  return `<VanGridView
        ref="${nameGroup.viewElementMainView}"
        dataSource={${dataSourceValue}}
        pageable="auto-more"
        pageSize={50}
        pageNumber={1}
        remotePaging={true}
        col={2}
        iffall={false}
        slotItem={
            (current) => <VanCardu noTitle={true}>
              ${properties.map((property) => `${genGridViewCardTemplate(property, nameGroup)}`).join('\n')}
            </VanCardu>
        }>
    </VanGridView>`;
}

export function genGridViewBlock(entity: naslTypes.Entity, refElement: naslTypes.ViewElement) {
  const likeComponent = refElement?.likeComponent;
  const dataSource = entity.parentNode;
  const module = dataSource.app;

  const viewElementMainView = likeComponent.getViewElementUniqueName('gridView');
  const nameGroup = genUniqueQueryNameGroup(module, likeComponent, viewElementMainView);
  nameGroup.viewElementMainView = viewElementMainView;
  nameGroup.viewVariableEntity = likeComponent.getVariableUniqueName(firstLowerCase(entity.name));
  nameGroup.viewVariableFilter = likeComponent.getVariableUniqueName('filter');
  nameGroup.lowerEntity = firstLowerCase(entity.name);

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
    return ${genGridViewTemplate(entity, nameGroup)}
  }
    export namespace app.logics {
      ${genQueryLogic(allEntities, nameGroup, false, false)}
    }`;
}
