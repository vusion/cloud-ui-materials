import * as naslTypes from '@nasl/ast-mini';
import type { ProcessV2 } from '../index';

import {
  filterProperty,
  firstLowerCase,
  getFirstDisplayedProperty,
  genUniqueQueryNameGroup,
  NameGroup,
} from './blocks/utils';
import { genQueryLogic, genFormItemsTemplate } from './blocks/genCommonBlock';

/**
 * @description: 一键生成审批页面
 * @return {*}
 */
export function genH5ApproveBlock(
  entity: naslTypes.Entity,
  parentElement: naslTypes.ViewElement,
  process: ProcessV2,
) {
  const likeComponent = parentElement?.likeComponent;
  const dataSource = entity.parentNode;
  const module = dataSource.app;

  // 生成唯一name
  // 加到页面上的params、variables、logics等都需要唯一name
  // 页面上有ref引用的element也需要唯一name
  const nameGroup = {
    viewElementMainView: likeComponent.getViewElementUniqueName('form1'),
    viewVariableEntity: `${process.name}.data`, // 审批页中的表单数据源，是流程的data
    processPrefix: process.name,
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
  return `export function view() {
    return ${genCreateFormTemplate(entity, nameGroup, selectNameGroupMap)}
  }
    export namespace app.logics {
        ${newLogics.join('\n')}
    }
    `;
}

function genCreateFormTemplate(
  entity: naslTypes.Entity,
  nameGroup: NameGroup,
  selectNameGroupMap: Map<string, NameGroup>,
) {
  // 审批页面中需要额外显示的属性
  const extraProperties = [
    'createdTime',
    'updatedTime',
    'createdBy',
    'updatedBy',
  ];
  const properties = entity.properties.filter((property) => {
    return (
      extraProperties.includes(property.name) ||
      filterProperty('inForm')(property)
    );
  });

  nameGroup.vModelName = nameGroup.viewVariableEntity;

  return `<VanLinearLayout direction="horizontal" wrap={true}>
    <VanTabs type="line" style="width: 100%">
      <VanTab slotTitle={
        <VanText text="表单信息"></VanText>
      }>
        <VanForm
          ref="${nameGroup.viewElementMainView}"
          id="dynamicRenderContainer"
          processPrefix="${nameGroup.processPrefix}"
        >
          ${genFormItemsTemplate(
            entity,
            properties,
            nameGroup,
            selectNameGroupMap,
          )}
        </VanForm>
      </VanTab>
      <VanTab slotTitle={
        <VanText text="流程信息"></VanText>
      }>
        <OwProcessInfo auto-gen-process-block="ow-process-info"></OwProcessInfo>
      </VanTab>
      <VanTab slotTitle={
        <VanText text="审批记录"></VanText>
      }>
        <OwProcessRecord auto-gen-process-block="ow-process-record-table"></OwProcessRecord>
      </VanTab>
    </VanTabs>
    <OwProcessButton auto-gen-process-block="ow-process-button" style="position: fixed; left: 0px; bottom: 0px; z-index: 10;">
    </OwProcessButton>
  </VanLinearLayout>`;
}
