import * as naslTypes from '@nasl/ast-mini';
import {
  firstLowerCase,
  getFirstDisplayedProperty,
  filterProperty,
  transEntityMetadataTypes,
  NameGroup,
} from './utils';

/**
 * where条件生成
 * @param {*} entity
 */
function genWhereExpression(entity: naslTypes.Entity) {
  const properties = entity.properties.filter((property) => property?.display.inFilter);
  const expressions = properties.map((property) => {
    if (!property.relationEntity && ['String', 'Text'].includes(property.typeAnnotation.typeName)) {
      return `LIKE(${entity.name}.${property.name}, filter.${property.name})`;
    }
    return `${entity.name}.${property.name} == filter.${property.name}`;
  });
  return expressions.join('&&');
}

/**
 * 生成后端数据查询逻辑
 * @param {*} allEntities
 * @param {*} nameGroup
 * @param {*} supportSort
 * @param {*} supportFilter
 * @returns
 */
export function genQueryLogic(allEntities: Array<naslTypes.Entity>, nameGroup: NameGroup, supportSort: boolean, supportFilter: boolean): string {
  allEntities = Array.from(allEntities);
  const entity = allEntities.shift();
  if (!entity) {
    return '';
  }
  const namespace = entity.getNamespace();
  const entityLowerName = firstLowerCase(entity.name);
  const properties = entity.properties.filter((property) => property?.display.inFilter);
  return `export function ${nameGroup.logic}(page: Long, size: Long${supportSort ? ', sort: String, order: String' : ''}${supportFilter ? `, filter: ${namespace}.${entity.name}` : ''}) {
        let result;
        result = PAGINATE(FROM(${namespace}.${entity.name}Entity, ${entity.name} => $
        ${allEntities.map((relationEntity) => {
    const onExpressions = entity.properties
      ?.filter((property) => property.relationEntity === relationEntity.name)
      .map((leftProperty) => {
        return `${entity.name}.${leftProperty.name} == ${relationEntity.name}.${leftProperty.relationProperty}`;
      }).join('&&');
    return `.LEFT_JOIN(${namespace}.${relationEntity.name}Entity, ${relationEntity.name} => ON(${onExpressions}))`;
  }).join('\n')}
  ${supportFilter && properties.length ? `.WHERE(${genWhereExpression(entity)})` : ''}
        ${supportSort ? '.ORDER_BY([sort, order])' : ''}
        .SELECT({
            ${entityLowerName}: ${entity.name},
            ${allEntities.map((relationEntity) => `${firstLowerCase(relationEntity.name)}: ${relationEntity.name}`).join(',')}
        })), page, size)
        return result;
    }`;
}

/**
 * 列的MemberExpression生成
 * @param {*} property
 * @param {*} nameGroup
 * @returns
 */
export function genColumnMeta(property: naslTypes.EntityProperty, nameGroup: NameGroup) {
  const { entity } = property;
  const currentName = nameGroup.currentName || 'current';

  const dataSource = entity.parentNode;
  const lowerEntityName = firstLowerCase(entity.name);
  let valueExpression = `${currentName}.item.${lowerEntityName}.${property.name}`;
  const entityExpression = `${currentName}.item.${lowerEntityName}`;
  const title = (property.label || property.name).replace(/"/g, '&quot;');

  if (property.relationEntity) {
    const relationLowerEntityName = firstLowerCase(property.relationEntity);
    const relationEntity = dataSource?.findEntityByName(property.relationEntity);
    const displayedProperty = getFirstDisplayedProperty(relationEntity);
    valueExpression = `${currentName}.item.${relationLowerEntityName}.${displayedProperty?.name || property.relationProperty}`;
  }
  return {
    lowerEntityName,
    valueExpression,
    title,
    currentName,
    entityExpression,
  };
}

/**
 * 列的text生成
 * @param {*} property
 * @param {*} nameGroup
 * @returns
 */
export function genTextTemplate(property: naslTypes.EntityProperty, nameGroup: NameGroup) {
  const { valueExpression } = genColumnMeta(property, nameGroup);
  if (property.typeAnnotation.typeName === 'Boolean') {
    return `
            <UText _if={${valueExpression}} text="是"></UText>
            <UText _if={!${valueExpression}} text="否"></UText>
            `;
  }
  return `<UText text={${valueExpression}}></UText>`;
}

/**
 * property 列生成
 * @param {*} entity
 * @param {*} property
 * @param {*} nameGroup
 * @param {*} selectNameGroupMap
 * @returns
 */
export function genPropertyEditableTemplate(entity: naslTypes.Entity, property: naslTypes.EntityProperty, nameGroup: NameGroup, selectNameGroupMap: Map<string, NameGroup>) {
  const dataSource = entity.parentNode;
  const vModel = `${nameGroup.vModelName}.${property.name}`;
  const label = (property.label || property.name).replace(/"/g, '&quot;');
  const { typeAnnotation } = property || {};
  const { typeNamespace: propertyTypeNamespace } = typeAnnotation || {};
  const propertyTypeName = transEntityMetadataTypes(typeAnnotation, dataSource.app);
  const propertyTypeMaxLength = Number(
    property.rules
      .find((item) => item.indexOf('max') > -1)
      ?.split('(')[1]
      .slice(0, -1),
  ) || 0;
  if (property.relationEntity) {
    // 有外键关联
    const relationEntity = dataSource?.findEntityByName(property.relationEntity);
    if (relationEntity) {
      const relationProperty = relationEntity.properties.find((prop) => prop.name === property.relationProperty);
      const displayedProperty = getFirstDisplayedProperty(relationEntity);
      if (displayedProperty) {
        const lowerEntityName = firstLowerCase(relationEntity.name);
        // 存在多个属性关联同一个实体的情况，因此加上属性名用以唯一标识
        const key = [property.name, relationEntity.name].join('-');
        const selectNameGroup = selectNameGroupMap.get(key);
        const dataSourceValue = `app.logics.${selectNameGroup.logic}(elements.$ce.page, elements.$ce.size)`;
        return `<USelect
                clearable={true}
                placeholder="请选择${label}"
                dataSource={${dataSourceValue}}
                pageSize={50}
                textField="${lowerEntityName}.${displayedProperty.name}"
                valueField="${lowerEntityName}.${relationProperty.name}"
                pagination={true}
                value={$sync(${vModel})}
                emptyValueIsNull={true}>
            </USelect>`;
      } return '';
    } return '';
  }
  if (propertyTypeName === 'Boolean') {
    return `<USelect
        clearable={true}
        value={$sync(${vModel})}
        placeholder="请选择${label}"
        emptyValueIsNull={true}>
        <USelectItem value={true} text="是"></USelectItem>
        <USelectItem value={false} text="否"></USelectItem>
    </USelect>`;
  } if (propertyTypeName === 'Integer' || propertyTypeName === 'Long') {
    return `<UNumberInput
        value={$sync(${vModel})}
        placeholder="请输入${label}">
    </UNumberInput>`;
  } if (propertyTypeName === 'Double') {
    return `<UNumberInput
        value={$sync(${vModel})}
        precision={0}
        step={0}
        placeholder="请输入${label}">
    </UNumberInput>`;
  } if (propertyTypeName === 'Decimal') {
    return `<UNumberInput
        value={$sync(${vModel})}
        precision={0}
        step={0}
        placeholder="请输入${label}">
    </UNumberInput>`;
  } if (propertyTypeName === 'String' && propertyTypeMaxLength > 256) {
    return `<UTextarea
        value={$sync(${vModel})}
        placeholder="请输入${label}"
        emptyValueIsNull={true}>
    </UTextarea>`;
  } if (propertyTypeName === 'Date') {
    return `<UDatePicker
        clearable={true}
        value={$sync(${vModel})}
        placeholder="请选择${label}"
        emptyValueIsNull={true}>
    </UDatePicker>`;
  } if (propertyTypeName === 'Time') {
    return `<UTimePicker
        value={$sync(${vModel})}
        placeholder="请选择${label}"
        emptyValueIsNull={true}>
    </UTimePicker>`;
  } if (propertyTypeName === 'DateTime') {
    return `<UDateTimePicker
        clearable={true}
        value={$sync(${vModel})}
        placeholder="请选择${label}"
        emptyValueIsNull={true}>
    </UDateTimePicker>`;
  }
  const namespaceArr = propertyTypeNamespace.split('.');
  const type = namespaceArr.pop();
  if (type === 'enums') {
    const enumTypeAnnotationStr = `${propertyTypeNamespace}.${propertyTypeName}`;
    return `<USelect
                clearable={true}
                value={$sync(${vModel})}
                placeholder="请选择${label}"
                dataSource={nasl.util.EnumToList<${enumTypeAnnotationStr}>()}
                emptyValueIsNull={true}>
            </USelect>`;
  }
  return `<UInput value={$sync(${vModel})} placeholder="请输入${label}" emptyValueIsNull={true}></UInput>`;
}

/**
 * 表单项
 * @param {*} entity
 * @param {*} properties
 * @param {*} nameGroup
 * @param {*} selectNameGroupMap
 * @param {*} options
 * @returns
 */
export function genFormItemsTemplate(entity: naslTypes.Entity, properties: Array<naslTypes.EntityProperty>, nameGroup: NameGroup, selectNameGroupMap: Map<string, NameGroup>, options = {
  needRules: true,
}) {
  return `
  ${properties.map((property) => {
    const label = (property.label || property.name).replace(/"/g, '&quot;');
    const required = !!property.required && options.needRules;
    const rules: Array<string> = [];
    if (options.needRules && property.rules && property.rules.length) {
      property.rules.forEach((rule) => {
        if (!rule.endsWith(')')) {
          rule += '()';
        }
        rules.push(`nasl.validation.${rule}`);
      });
    }
    if (required) rules.push('nasl.validation.required()');
    let formItem = `<UFormItem
          ${required ? 'required={true}' : ''}
          ${rules.length ? ` rules={[${rules.join(',')}]}` : ''}
          layout="center"
          slotLabel={
            <UText text="${label}"></UText>
          }>`;
    formItem += `${genPropertyEditableTemplate(entity, property, nameGroup, selectNameGroupMap)}`;
    formItem += '</UFormItem>';
    return formItem;
  }).join('\n')}`;
}

/**
 * 过滤条件
 * @param {*} entity
 * @param {*} nameGroup
 * @param {*} selectNameGroupMap
 */
export function genFilterTemplate(entity: naslTypes.Entity, nameGroup: NameGroup, selectNameGroupMap: Map<string, NameGroup>) {
  const properties = entity.properties.filter(filterProperty('inFilter'));
  nameGroup.vModelName = nameGroup.viewVariableFilter;
  return `<ULinearLayout>
  <UForm layout="inline">
        ${genFormItemsTemplate(entity, properties, nameGroup, selectNameGroupMap, {
    needRules: false,
  })}
        <UFormItem layout="center" labelSize="auto">
            <UButton
                color="primary"
                text="查 询"
                onClick={
                    function ${nameGroup.viewLogicReload}(event) {
                        $refs.${nameGroup.viewElementMainView}.reload()
                    }
                }>
            </UButton>
        </UFormItem>
  </UForm>
    </ULinearLayout>`;
}

export function genSaveModalTemplate(entity: naslTypes.Entity, nameGroup: NameGroup, selectNameGroupMap: Map<string, NameGroup>) {
  const dataSource = entity.parentNode;
  const properties = entity.properties.filter(filterProperty('inForm'));
  nameGroup.vModelName = nameGroup.viewVariableInput;

  return `<UModal ref="${nameGroup.viewElementSaveModal}"
    slotTitle={
      <>
        <UText _if={${nameGroup.viewVariableIsUpdate}} text="修改"></UText>
        <UText _if={!${nameGroup.viewVariableIsUpdate}} text="创建"></UText>
      </>
    }
    slotBody={
        <UForm ref="${nameGroup.viewElementSaveModalForm}">
            ${genFormItemsTemplate(entity, properties, nameGroup, selectNameGroupMap)}
        </UForm>
    }
    slotFoot={
        <ULinearLayout>
            <UButton
                _if={${nameGroup.viewVariableIsUpdate}}
                color="primary"
                text="提交修改"
                onClick={
                    function ${nameGroup.viewLogicUpdateSubmit}(event) {
                      if ($refs.${nameGroup.viewElementSaveModalForm}.validate().valid) {
                        ${entity.getNamespace()}.${entity.name}Entity.update(${nameGroup.viewVariableInput})
                        $refs.${nameGroup.viewElementSaveModal}.close()
                        $refs.${nameGroup.viewElementMainView}.reload()
                    }
                    }
                }>
            </UButton>
            <UButton
              _if={!${nameGroup.viewVariableIsUpdate}}
                color="primary"
                text="立即创建"
                onClick={
                    function ${nameGroup.viewLogicSubmit}(event) {
                        if ($refs.${nameGroup.viewElementSaveModalForm}.validate().valid) {
                          ${entity.getNamespace()}.${entity.name}Entity.create(${nameGroup.viewVariableInput})
                          $refs.${nameGroup.viewElementSaveModal}.close()
                          $refs.${nameGroup.viewElementMainView}.reload()
                        }
                      }
                }>
            </UButton>
        </ULinearLayout>
    }>
  </UModal>`;
}
