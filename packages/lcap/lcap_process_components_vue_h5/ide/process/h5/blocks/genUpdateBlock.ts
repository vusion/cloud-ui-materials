import * as naslTypes from '@nasl/ast-mini';
import {
  filterProperty,
  firstLowerCase,
  getFirstDisplayedProperty,
  genUniqueQueryNameGroup,
  NameGroup,
  getAllEntityPromaryKeyProperty,
} from './utils';
import { genQueryLogic, genFormItemsTemplate } from './genCommonBlock';

function genUpdateFormTemplate(entity: naslTypes.Entity, nameGroup: NameGroup, selectNameGroupMap: Map<string, NameGroup>) {
  const namespace = entity.getNamespace();
  const properties = entity.properties.filter(filterProperty('inForm'));
  nameGroup.vModelName = nameGroup.viewVariableEntity;

  return `<VanForm ref="${nameGroup.viewElementMainView}">
    ${genFormItemsTemplate(entity, properties, nameGroup, selectNameGroupMap)}
    <VanButton
      round
      block="blockb"
      type="info"
      text="提交修改"
      onClick={
        function ${nameGroup.viewLogicSubmit}(event) {
          if ($refs.${nameGroup.viewElementMainView}.validate().valid) {
              ${namespace}.${entity.name}Entity.update(${nameGroup.viewVariableEntity})
              nasl.ui.showMessage('修改成功！')
          }
        }
      }></VanButton>
  </VanForm>`;
}

export function genUpdateBlock(entity: naslTypes.Entity, refElement: naslTypes.ViewElement) {
  const likeComponent = refElement?.likeComponent;
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
    viewVariableEntity: likeComponent.getVariableUniqueName(firstLowerCase(entity.name)),
    viewLogicSubmit: likeComponent.getLogicUniqueName('submit'),
    viewLogicLoad: likeComponent.getLogicUniqueName('load'),
  };
  const idProperties = getAllEntityPromaryKeyProperty(entity);
  let viewParamIds: Array<{name:string, type: string}> = [];
  viewParamIds = idProperties.map((property) => {
    const name = idProperties.length === 1 ? 'id' : property.name;
    return {
      name: likeComponent.getParamUniqueName(name),
      type: (property.typeAnnotation?.toNaturalTS && property.typeAnnotation?.toNaturalTS()) || 'Long',
    };
  });

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
          const newLogic = genQueryLogic([relationEntity], selectNameGroup, false, false);
          newLogics.push(newLogic);
        }
      }
    }
  });

  return `export function view(${viewParamIds.map((param) => `${param.name}: ${param.type}`).join(', ')}) {
    let ${nameGroup.viewVariableEntity}: ${entityFullName};

    const $lifecycles = {
        onCreated: [
            function ${nameGroup.viewLogicLoad}() {
                ${nameGroup.viewVariableEntity} = ${namespace}.${entity.name}Entity.get(${viewParamIds.map((param) => param.name).join(',')})
            },     
        ]      
    }

    return ${genUpdateFormTemplate(entity, nameGroup, selectNameGroupMap)}
  }
      export namespace app.logics {
          ${newLogics.join('\n')}
      }`;
}
