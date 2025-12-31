import * as naslTypes from '@nasl/ast-mini';
import {
  firstLowerCase,
  getFirstDisplayedProperty,
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
            <VanText _if={${valueExpression}} text="是" display="block"></VanText>
            <VanText _if={!${valueExpression}} text="否" display="block"></VanText>
            `;
  }
  return `<VanText text={${valueExpression}} display="block"></VanText>`;
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
        return `<VanPickerson
            type="list"
            showToolbar={true}
            title="请选择${label}"
            placeholder="请选择${label}"
            value={$sync(${vModel})}
            dataSource={${dataSourceValue}}
            pageSize={50}
            textField="${lowerEntityName}.${displayedProperty.name}"
            valueField="${lowerEntityName}.${relationProperty.name}"
            notitleblock={true}
            pageable={true}
            inputAlign="left"
            remotePaging={true}
            slot-pannel-title={
              <VanText text="请选择${label}"></VanText>
            }
            slot-picker-top={
              <>
                <VanPickerActionSlot targetMethod="cancel">
                  <VanIconv name="left-arrow" icotype="only"></VanIconv>
                </VanPickerActionSlot>
                <VanPickerActionSlot targetMethod="confirm">
                </VanPickerActionSlot>
              </>
            }
            slot-picker-bottom={
              <>
                <VanPickerActionSlot targetMethod="cancel">
                  <VanButton
                    type="info_secondary"
                    size="normal"
                    text="取消"
                    squareroud="round"
                  ></VanButton>
                </VanPickerActionSlot>
                <VanPickerActionSlot targetMethod="confirm">
                  <VanButton
                    type="info"
                    size="normal"
                    text="确认"
                    squareroud="round"
                  ></VanButton>
                </VanPickerActionSlot>
              </>
            }>
          </VanPickerson>`;
      } return '';
    } return '';
  }
  if (propertyTypeName === 'Boolean') {
    return `<VanSwitch value={$sync(${vModel})}></VanSwitch>`;
  } if (propertyTypeName === 'Integer' || propertyTypeName === 'Long') {
    return `<VanStepperNew value={$sync(${vModel})} placeholder="请输入${property.label || property.name
    }" showPlus={false} showMinus={false} align="left"></VanStepperNew>`;
  } if (propertyTypeName === 'Double') {
    return `<VanStepperNew value={$sync(${vModel})} placeholder="请输入${property.label || property.name
    }" showPlus={false} showMinus={false} align="left"></VanStepperNew>`;
  } if (propertyTypeName === 'Decimal') {
    return `<VanStepperNew value={$sync(${vModel})} placeholder="请输入${property.label || property.name
    }" showPlus={false} showMinus={false} align="left"></VanStepperNew>`;
  } if (propertyTypeName === 'String' && propertyTypeMaxLength > 256) {
    return `<VanFieldtextarea value={$sync(${vModel})} placeholder="请输入${property.label || property.name
    }"></VanFieldtextarea>`;
  } if (propertyTypeName === 'Date') {
    return `<VanCalendar value={$sync(${vModel})} title="选择日期" inputAlign="left"></VanCalendar>`;
  } if (propertyTypeName === 'Time') {
    return `<VanDatetimePicker type="time" value={$sync(${vModel})} title="请选择${property.label || property.name
    }" labelField="" inputAlign="left"></VanDatetimePicker>`;
  } if (propertyTypeName === 'DateTime') {
    return `<VanDatetimePicker type="datetime" value={$sync(${vModel})} title="请选择${property.label || property.name
    }" labelField="" inputAlign="left"></VanDatetimePicker>`;
  }
  const namespaceArr = propertyTypeNamespace.split('.');
  const type = namespaceArr.pop();
  if (type === 'enums') {
    const enumTypeAnnotationStr = `${propertyTypeNamespace}.${propertyTypeName}`;
    return `<VanPickerson
            type="list"
            showToolbar={true}
            title="请选择${label}"
            placeholder="请选择${label}"
            value={$sync(${vModel})}
            dataSource={nasl.util.EnumToList<${enumTypeAnnotationStr}>()}
            pageSize={50}
            notitleblock={true}
            slot-pannel-title={
              <VanText text="请选择${label}"></VanText>
            }
            slot-picker-top={
              <>
                <VanPickerActionSlot targetMethod="cancel">
                  <VanIconv name="left-arrow" icotype="only"></VanIconv>
                </VanPickerActionSlot>
                <VanPickerActionSlot targetMethod="confirm">
                </VanPickerActionSlot>
              </>
            }
            slot-picker-bottom={
              <>
                <VanPickerActionSlot targetMethod="cancel">
                  <VanButton
                    type="info_secondary"
                    size="normal"
                    text="取消"
                    squareroud="round"
                  ></VanButton>
                </VanPickerActionSlot>
                <VanPickerActionSlot targetMethod="confirm">
                  <VanButton
                    type="info"
                    size="normal"
                    text="确认"
                    squareroud="round"
                  ></VanButton>
                </VanPickerActionSlot>
              </>
            }>
          </VanPickerson>`;
  }
  return `<VanFieldinput value={$sync(${vModel})} placeholder="请输入${property.label || property.name
  }"></VanFieldinput>`;
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
    return `<VanField
    ${required ? 'required={true}' : ''}
    ${rules.length ? ` rules={[${rules.join(',')}]}` : ''}
    drole="other"
    slotTitle={
      <VanText text="${label}"></VanText>
    }
    slotInput={
      <VanLinearLayout
      style="width:100%;"
      direction="horizontal">
        ${genPropertyEditableTemplate(entity, property, nameGroup, selectNameGroupMap)}
      </VanLinearLayout>
    }></VanField>`;
  }).join('\n')}`;
}
