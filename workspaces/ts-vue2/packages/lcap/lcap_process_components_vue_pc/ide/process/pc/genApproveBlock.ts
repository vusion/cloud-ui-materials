import * as naslTypes from '@nasl/ast-mini';
import type { ProcessV2 } from '../index';
import { genGridLayoutColumnTemplate, genViewVariables } from './utils';
import { getSubFormConfig, genSubFormStencilTemplate } from './subForm';

import { filterProperty, firstLowerCase, getFirstDisplayedProperty, genUniqueQueryNameGroup, NameGroup } from './blocks/utils';
import { genQueryLogic } from './blocks/genCommonBlock';

/**
 * @description: 一键生成审批页面
 * @return {*}
 */
export function genPcApproveBlock(entity: naslTypes.Entity, parentElement: naslTypes.ViewElement, process: ProcessV2) {
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
      const relationEntity = dataSource?.findEntityByName(property.relationEntity);
      if (relationEntity) {
        const displayedProperty = getFirstDisplayedProperty(relationEntity);
        if (displayedProperty) {
          const viewElementSelect = likeComponent.getViewElementUniqueName('select');
          const selectNameGroup = genUniqueQueryNameGroup(module, likeComponent, viewElementSelect, false, relationEntity.name);
          selectNameGroup.viewElementSelect = viewElementSelect;
          // 存在多个属性关联同一个实体的情况，因此加上属性名用以唯一标识
          const key = [property.name, relationEntity.name].join('-');
          selectNameGroupMap.set(key, selectNameGroup);
          const newLogic = genQueryLogic([relationEntity], selectNameGroup, false, false, module);
          newLogics.push(newLogic);
        }
      }
    }
  });
  // 页面上的局部变量
  const variableConfigList = [] as any[];
  if (process) {
    // 获取子表单配置
    const subFormConfigList = getSubFormConfig(process);
    variableConfigList.push(...subFormConfigList);
  }
  return `export function view() {
    ${genViewVariables(variableConfigList, true)}
    return ${genCreateFormTemplate(entity, nameGroup, selectNameGroupMap, variableConfigList, likeComponent, newLogics)}
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
  variableConfigList: Array<any>,
  likeComponent: naslTypes.View,
  newLogics: Array<string>
) {
  // 审批页面中需要额外显示的属性
  const extraProperties = ['createdTime', 'updatedTime', 'createdBy', 'updatedBy'];
  const properties = entity.properties.filter((property) => {
    return extraProperties.includes(property.name) || filterProperty('inForm')(property);
  });
  nameGroup.vModelName = nameGroup.viewVariableEntity; // 主表单绑定的局部变量名

  return `<ULinearLayout direction="vertical" gap="normal">
    <ULinearLayout style="text-align: center;">
      <FlProcessButton auto-gen-process-block="fl-process-button"></FlProcessButton>
    </ULinearLayout>
    <ULinearLayout direction="vertical" justify="start" alignment="start">
      <UCard slotTitle={
        <UText text="流程信息" style="font-size:16px;font-weight:bold;"></UText>
      }>
        <FlProcessInfo auto-gen-process-block="fl-process-info"></FlProcessInfo>
      </UCard>
      <UCard style="margin-top:10px;" slotTitle={
        <UText text="表单信息" style="font-size:16px;font-weight:bold;"></UText>
      }>
        <UForm
          ref="${nameGroup.viewElementMainView}"
          id="dynamicRenderContainer"
          processPrefix="${nameGroup.processPrefix}"
        >
          <UGridLayout>
            <UGridLayoutRow repeat={12}>
              ${genGridLayoutColumnTemplate(entity, properties, nameGroup, selectNameGroupMap)}
              ${genSubFormStencilTemplate(entity, likeComponent, variableConfigList, selectNameGroupMap, newLogics, true)}
            </UGridLayoutRow>
          </UGridLayout>
        </UForm>
      </UCard>
      <UCard style="margin-top:10px;" slotTitle={
        <UText text="审批记录" style="font-size:16px;font-weight:bold;"></UText>
      }>
        <FlProcessRecord auto-gen-process-block="fl-process-record-table"></FlProcessRecord>
      </UCard>
    </ULinearLayout>
  </ULinearLayout>`;
}
