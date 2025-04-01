import * as naslTypes from '@nasl/ast-mini';
import type { ProcessV2 } from '../index';

import { filterProperty, firstLowerCase, getFirstDisplayedProperty, genUniqueQueryNameGroup, NameGroup } from './blocks/utils';
import { genQueryLogic, genFormItemsTemplate } from './blocks/genCommonBlock';

/**
 * @description: 根据选择属性，生成流程表单
 * @param {naslTypes.Entity} entity: 主实体
 * @param {any} source: 选择的属性
 * @param {naslTypes.ViewElement} parentElement: 父元素
 * @param {ProcessV2} process: 流程
 * @return {*}
 */
export function genH5ProcessFormBlock(entity: naslTypes.Entity, source: any, parentElement: naslTypes.ViewElement, process: ProcessV2) {
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

  const selectedProperties = source[entity.name];

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

  return `export function view() {
    return ${genCreateFormTemplate(entity, selectedProperties, nameGroup, selectNameGroupMap)}
  }
    export namespace app.logics {
        ${newLogics.join('\n')}
    }
    `;
}

function genCreateFormTemplate(
  entity: naslTypes.Entity,
  selectedProperties: Array<naslTypes.EntityProperty>,
  nameGroup: NameGroup,
  selectNameGroupMap: Map<string, NameGroup>
) {
  nameGroup.vModelName = nameGroup.viewVariableEntity;

  return `<VanForm
    ref="${nameGroup.viewElementMainView}"
    id="dynamicRenderContainer"
    processPrefix="${nameGroup.processPrefix}"
  >
    ${genFormItemsTemplate(entity, selectedProperties, nameGroup, selectNameGroupMap)}
  </VanForm>`;
}
