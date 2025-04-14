import * as naslTypes from '@nasl/ast-mini';
import {
  firstLowerCase,
  getFirstDisplayedProperty,
  genUniqueQueryNameGroup,
  getViewUniqueVariableNames,
  getCurrentName,
} from './utils';
import { genQueryLogic, genFilterTemplate, genSaveModalTemplate } from './genCommonBlock';
import { genGridViewTemplate } from './genGridViewBlock';

export function genGridViewCurdBlock(entity: naslTypes.Entity, refElement: naslTypes.ViewElement) {
  const likeComponent = refElement?.likeComponent;
  const dataSource = entity.parentNode;
  const module = dataSource.app;
  const namespace = entity.getNamespace();
  const entityName = entity.name;
  const entityFullName = `${namespace}.${entityName}`;

  const viewElementMainView = likeComponent.getViewElementUniqueName('gridView');
  const nameGroup = genUniqueQueryNameGroup(module, likeComponent, viewElementMainView);
  nameGroup.viewElementMainView = viewElementMainView;
  nameGroup.viewElementFilterForm = likeComponent.getViewElementUniqueName('filterform');
  nameGroup.viewElementSaveModal = likeComponent.getViewElementUniqueName('saveModal');
  nameGroup.viewElementSaveModalForm = likeComponent.getViewElementUniqueName('saveModalForm');
  nameGroup.viewLogicRemove = likeComponent.getLogicUniqueName('remove');
  nameGroup.viewLogicInit = likeComponent.getLogicUniqueName('init');
  nameGroup.viewLogicCreate = likeComponent.getLogicUniqueName('create');
  nameGroup.viewLogicModify = likeComponent.getLogicUniqueName('modify');
  nameGroup.viewLogicSubmit = likeComponent.getLogicUniqueName('submit');
  nameGroup.viewLogicUpdateSubmit = likeComponent.getLogicUniqueName('updateSubmit');
  nameGroup.viewLogicReload = likeComponent.getLogicUniqueName('reload');
  nameGroup.viewVariableEntity = likeComponent.getVariableUniqueName(firstLowerCase(entity.name));
  nameGroup.viewVariableInput = getViewUniqueVariableNames(likeComponent.getVariableUniqueName('input'), nameGroup.viewVariableEntity);
  nameGroup.viewVariableFilter = getViewUniqueVariableNames(likeComponent.getVariableUniqueName('filter'), nameGroup.viewVariableEntity);
  nameGroup.viewVariableIsUpdate = getViewUniqueVariableNames(likeComponent.getVariableUniqueName('isUpdate'), nameGroup.viewVariableEntity);
  nameGroup.lowerEntity = firstLowerCase(entity.name);
  // 当前节点的currentName
  nameGroup.currentName = getCurrentName(refElement);

  // 收集所有和本实体关联的实体
  const entitySet: Set<naslTypes.Entity> = new Set();
  entitySet.add(entity);
  const selectNameGroupMap = new Map();
  const newLogics: Array<string> = [];
  entity.properties.forEach((property) => {
    if (property.relationEntity) {
      // 有外键关联
      const relationEntity = dataSource?.findEntityByName(property.relationEntity);
      if (relationEntity) {
        const displayedProperty = getFirstDisplayedProperty(relationEntity);
        if (displayedProperty) {
          entitySet.add(relationEntity);
          const viewElementSelect = likeComponent.getViewElementUniqueName('select');
          const selectNameGroup = genUniqueQueryNameGroup(module, likeComponent, viewElementSelect, false, relationEntity.name);
          selectNameGroup.viewElementSelect = viewElementSelect;
          // 存在多个属性关联同一个实体的情况，因此加上属性名用以唯一标识
          const key = [property.name, relationEntity.name].join('-');
          selectNameGroupMap.set(key, selectNameGroup);
          const newLogic = genQueryLogic([relationEntity], selectNameGroup, false, false);
          newLogics.push(newLogic);
        }
      }
    }
  });
  const allEntities = [...entitySet];
  const entityLogic = genQueryLogic(allEntities, nameGroup, false, true);
  newLogics.push(entityLogic);

  return `export function view() {
      let ${nameGroup.viewVariableEntity}: ${entityFullName};
      let ${nameGroup.viewVariableInput}: ${entityFullName};
      let ${nameGroup.viewVariableFilter}: ${entityFullName};
      let ${nameGroup.viewVariableIsUpdate}: Boolean;

      const $lifecycles = {
          onCreated: [
              function ${nameGroup.viewLogicInit}(event) {
                nasl.util.Clear(${nameGroup.viewVariableFilter},'deep');
                return;
              },
          ]
      }

      return <ULinearLayout direction="vertical">
          ${genFilterTemplate(entity, nameGroup, selectNameGroupMap)}
          <ULinearLayout mode="flex" alignment="start" justify="end">
              <UButton
                  color="primary"
                  text="创 建"
                  onClick={
                      function ${nameGroup.viewLogicCreate}(event) {
                          ${nameGroup.viewVariableIsUpdate} = false
                          ${nameGroup.viewVariableInput} = nasl.util.Clone(${nameGroup.viewVariableEntity});
                          $refs.${nameGroup.viewElementSaveModal}.open()
                      }
                  }></UButton>
          </ULinearLayout>
          ${genGridViewTemplate(entity, nameGroup, { hasFileter: true, modifyable: true })}
          ${genSaveModalTemplate(entity, nameGroup, selectNameGroupMap)}
      </ULinearLayout>
    }
      export namespace app.logics {
          ${newLogics.join('\n')}
      }`;
}
