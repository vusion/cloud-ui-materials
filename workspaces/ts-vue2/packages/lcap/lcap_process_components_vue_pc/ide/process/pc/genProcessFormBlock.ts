import * as naslTypes from '@nasl/ast-mini';
import type { ProcessV2 } from '../index';
import { genGridLayoutColumnTemplate, genViewVariables } from './utils';
import { getSubFormConfig, genSubFormStencilTemplate } from './subForm';

import { filterProperty, firstLowerCase, getFirstDisplayedProperty, genUniqueQueryNameGroup, NameGroup } from './blocks/utils';
import { genQueryLogic } from './blocks/genCommonBlock';

/**
 * @description: 根据选择属性，生成流程表单
 * @param {naslTypes.Entity} entity: 主实体
 * @param {any} source: 选择的属性
 * @param {naslTypes.ViewElement} parentElement: 父元素
 * @param {ProcessV2} process: 流程
 * @return {*}
 */
export function genPcProcessFormBlock(entity: naslTypes.Entity, source: any, parentElement: naslTypes.ViewElement, process: ProcessV2) {
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

  const selectedProperties = source[entity.name] || []; // 选择的主表单属性
  // 收集所有和本实体关联的实体
  const selectNameGroupMap = new Map();
  const newLogics: Array<string> = [];
  selectedProperties.forEach((property) => {
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
    const subFormConfigList = getSubFormConfig(process, source, likeComponent);
    variableConfigList.push(...subFormConfigList);
  }

  return `export function view() {
    ${genViewVariables(variableConfigList, true)}
    return ${genCreateFormTemplate(entity, selectedProperties, source, nameGroup, selectNameGroupMap, variableConfigList, likeComponent, newLogics)}
  }
    export namespace app.logics {
        ${newLogics.join('\n')}
    }
    `;
}

function genCreateFormTemplate(
  entity: naslTypes.Entity,
  selectedProperties: Array<naslTypes.EntityProperty>,
  source: any,
  nameGroup: NameGroup,
  selectNameGroupMap: Map<string, NameGroup>,
  variableConfigList: Array<any>,
  likeComponent: naslTypes.View,
  newLogics: Array<string>
) {
  nameGroup.vModelName = nameGroup.viewVariableEntity; // 主表单绑定的局部变量名

  return `<UForm
    ref="${nameGroup.viewElementMainView}"
    id="dynamicRenderContainer"
    processPrefix="${nameGroup.processPrefix}"
  >
    <UGridLayout>
      <UGridLayoutRow repeat={12}>
        ${genGridLayoutColumnTemplate(entity, selectedProperties, nameGroup, selectNameGroupMap)}
        ${genSubFormStencilTemplate(entity, likeComponent, variableConfigList, selectNameGroupMap, newLogics, true, source)}
      </UGridLayoutRow>
    </UGridLayout>
  </UForm>`;
}
