import * as naslTypes from '@nasl/ast-mini';
import type { ProcessV2 } from '../index';
import { genViewVariables, genProcessV2LaunchLogic, genGridLayoutColumnTemplate } from './utils';
import { getSubFormConfig, genSubFormStencilTemplate } from './subForm';

import { filterProperty, firstLowerCase, getFirstDisplayedProperty, genUniqueQueryNameGroup, NameGroup, firstUpperCase } from './blocks/utils';
import { genQueryLogic } from './blocks/genCommonBlock';

/**
 * @description: 一键生成申请页面
 * @return {*}
 */
export function genPcCreateBlock(entity: naslTypes.Entity, parentElement: naslTypes.ViewElement, process: ProcessV2) {
  const likeComponent = parentElement?.likeComponent;
  const dataSource = entity.parentNode;
  const module = dataSource.app;

  // 生成唯一name
  // 加到页面上的params、variables、logics等都需要唯一name
  // 页面上有ref引用的element也需要唯一name
  const nameGroup = {
    viewElementMainView: likeComponent.getViewElementUniqueName('form1'),
    viewVariableEntity: firstLowerCase(entity.name), // 新建的页面， 局部变量名根据实体名生成，不需要考虑唯一性
    viewLogicSubmit: likeComponent.getLogicUniqueName('submit'),
    processLaunch: module.getLogicUniqueName(`${process.name}Launch`),
    entityFullName: `${entity.getNamespace()}.${entity.name}`, // 实体全名
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
  const variableConfigList = [
    {
      name: 'data',
      varName: nameGroup.viewVariableEntity, // 局部变量名为实体名的首字母小写
      entity,
      type: nameGroup.entityFullName,
      isMainEntity: true, // 是否是主实体
      processName: '',
    },
  ];
  if (process) {
    // step1: 获取子表单配置
    const subFormConfigList = getSubFormConfig(process);
    variableConfigList.push(...subFormConfigList);
    // step2: 生成流程launch逻辑
    const processV2LunchLogic = genProcessV2LaunchLogic(entity, process, nameGroup, variableConfigList);
    newLogics.push(processV2LunchLogic);
  }

  return `export function view() {
    ${genViewVariables(variableConfigList, false)}
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
  const properties = entity.properties.filter(filterProperty('inForm'));
  nameGroup.vModelName = nameGroup.viewVariableEntity; // 主表单绑定的局部变量名
  const submitArgs = variableConfigList
    .map((variableConfig) => {
      const { varName, isMainEntity } = variableConfig;
      return isMainEntity ? varName : `${varName}List`;
    })
    .join(', ');

  return `<UCard
    slotTitle={
      <UText text="发起流程" style="font-size: 18px; font-weight: bold;"></UText>
    }
  >
    <UForm ref="${nameGroup.viewElementMainView}">
      <UGridLayout>
        <UGridLayoutRow repeat={12}>
          ${genGridLayoutColumnTemplate(entity, properties, nameGroup, selectNameGroupMap)}
          ${genSubFormStencilTemplate(entity, likeComponent, variableConfigList, selectNameGroupMap, newLogics, false)}
          <UGridLayoutColumn span={12}>
            <UFormItem layout="center" labelSize="auto" style="text-align: center;">
              <UButton color="primary" text="提交流程"
                onClick={
                  function ${nameGroup.viewLogicSubmit}(event) {
                    if ($refs.${nameGroup.viewElementMainView}.validate().valid) {
                      app.logics.${nameGroup.processLaunch}(${submitArgs})
                      nasl.ui.showMessage('创建成功！')
                    }
                  }
                }>
              </UButton>
            </UFormItem>
          </UGridLayoutColumn>
        </UGridLayoutRow>
      </UGridLayout>
    </UForm>
  </UCard>`;
}
