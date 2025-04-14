import * as naslTypes from '@nasl/ast-mini';
import type { ProcessV2 } from '../index';
import {  genProcessV2LaunchLogic } from './utils';

import {
  filterProperty,
  firstLowerCase,
  getFirstDisplayedProperty,
  genUniqueQueryNameGroup,
  NameGroup,
} from './blocks/utils';
import { genQueryLogic, genFormItemsTemplate } from './blocks/genCommonBlock';

function genCreateFormTemplate(
  entity: naslTypes.Entity,
  nameGroup: NameGroup,
  selectNameGroupMap: Map<string, NameGroup>,
) {
  const properties = entity.properties.filter(filterProperty('inForm'));
  nameGroup.vModelName = nameGroup.viewVariableEntity;

  return `<VanCardu
    slotHead={
      <VanText text="发起流程" style="font-size: 18px; font-weight: bold;"></VanText>
    }
  >
    <VanForm ref="${nameGroup.viewElementMainView}">
      ${genFormItemsTemplate(entity, properties, nameGroup, selectNameGroupMap)}
      <VanButton round block="blockb" type="info" text="提交流程"
        onClick={
          function ${nameGroup.viewLogicSubmit}(event) {
            if ($refs.${nameGroup.viewElementMainView}.validate().valid) {
              app.logics.${nameGroup.processLaunch}(${nameGroup.viewVariableEntity})
              nasl.ui.showMessage('创建成功！')
            }
          }
        }>
      </VanButton>
    </VanForm>
  </VanCardu>`;
}

/**
 * @description: 一键生成申请页面
 * @return {*}
 */
export function genH5CreateBlock(
  entity: naslTypes.Entity,
  parentElement: naslTypes.ViewElement,
  process: ProcessV2,
) {
  const likeComponent = parentElement?.likeComponent;
  const dataSource = entity.parentNode;
  const module = dataSource.app;
  const namespace = entity.getNamespace();
  const entityName = entity.name;
  const entityFullName = `${namespace}.${entityName}`;

  // 生成唯一name
  // 加到页面上的params、variables、logics等都需要唯一name
  // 页面上有ref引用的element也需要唯一name
  const nameGroup = {
    viewElementMainView: likeComponent.getViewElementUniqueName('form1'),
    viewVariableEntity: likeComponent.getVariableUniqueName(
      firstLowerCase(entity.name),
    ),
    viewLogicSubmit: likeComponent.getLogicUniqueName('submit'),
    processLaunch: module.getLogicUniqueName(`${process.name}Launch`),
  };

  // 收集所有和本实体关联的实体
  const selectNameGroupMap = new Map();
  const newLogics: Array<string> = [];
  entity.properties.forEach((property) => {
    // 有外键关联
    if (property.relationEntity) {
      const relationEntity = dataSource?.findEntityByName(
        property.relationEntity,
      );
      if (relationEntity) {
        const displayedProperty = getFirstDisplayedProperty(relationEntity);
        if (displayedProperty) {
          const viewElementSelect =
            likeComponent.getViewElementUniqueName('select');
          const selectNameGroup = genUniqueQueryNameGroup(
            module,
            likeComponent,
            viewElementSelect,
            false,
            relationEntity.name,
          );
          selectNameGroup.viewElementSelect = viewElementSelect;
          // 存在多个属性关联同一个实体的情况，因此加上属性名用以唯一标识
          const key = [property.name, relationEntity.name].join('-');
          selectNameGroupMap.set(key, selectNameGroup);
          const newLogic = genQueryLogic(
            [relationEntity],
            selectNameGroup,
            false,
            false,
            module,
          );
          newLogics.push(newLogic);
        }
      }
    }
  });
  if (process) {
    const processV2LunchLogic = genProcessV2LaunchLogic(
      entityFullName,
      process,
      nameGroup,
    );
    newLogics.push(processV2LunchLogic);
  }

  return `export function view() {
    let ${nameGroup.viewVariableEntity}: ${entityFullName};
    return ${genCreateFormTemplate(entity, nameGroup, selectNameGroupMap)}
  }
    export namespace app.logics {
        ${newLogics.join('\n')}
    }
    `;
}
