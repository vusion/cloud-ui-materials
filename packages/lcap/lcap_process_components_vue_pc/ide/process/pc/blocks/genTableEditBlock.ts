import * as naslTypes from '@nasl/ast-mini';
import {
  filterProperty,
  firstLowerCase,
  getFirstDisplayedProperty,
  genUniqueQueryNameGroup,
  getEntityPromaryKeyProperty,
  transEntityMetadataTypes,
  NameGroup,
  getViewUniqueVariableNames,
  getAllEntityPromaryKeyProperty,
  getCurrentName,
} from './utils';
import {
  genQueryLogic, genTextTemplate, genColumnMeta,
  genFilterTemplate, genFormItemsTemplate,
} from './genCommonBlock';

function genBlurFunction(property: naslTypes.EntityProperty, nameGroup: NameGroup) {
  const { entityExpression, currentName } = genColumnMeta(property, nameGroup);
  const { entity } = property;
  return `function ${nameGroup.viewLogicBlurUpdate}(event) {
    $refs.${nameGroup.viewElementMainView}.resetEdit(${currentName}.item)
    ${entity.getNamespace()}.${entity.name}Entity.update(${entityExpression})
  }`;
}

function genEditComponent(entity: naslTypes.Entity, property: naslTypes.EntityProperty, nameGroup: NameGroup, selectNameGroupMap: Map<string, NameGroup>) {
  if (property.readonly) {
    return '';
  }
  const dataSource = entity.parentNode;
  const lowerEntityName = firstLowerCase(entity.name);
  const currentName = nameGroup.currentName || 'current';
  const vModel = `${currentName}.item.${lowerEntityName}.${property.name}`;
  const label = (property.label || property.name).replace(/"/g, '&quot;');
  const required = !!property.required;
  const rules: Array<string> = [];
  if (property.rules && property.rules.length) {
    property.rules.forEach((rule) => {
      if (!rule.endsWith(')')) {
        rule += '()';
      }
      rules.push(`nasl.validation.${rule}`);
    });
  }
  if (required) rules.push('nasl.validation.required()');
  let formItem = '';
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
        const lowerEntityName1 = firstLowerCase(relationEntity.name);
        // 存在多个属性关联同一个实体的情况，因此加上属性名用以唯一标识
        const key = [property.name, relationEntity.name].join('-');
        const selectNameGroup = selectNameGroupMap.get(key);
        const dataSourceValue = `app.logics.${selectNameGroup.logic}(elements.$ce.page, elements.$ce.size)`;
        formItem += `<USelect
            clearable={true}
            placeholder="请选择${label}"
            dataSource={${dataSourceValue}}
            pageSize={50}
            textField="${lowerEntityName1}.${displayedProperty.name}"
            valueField="${lowerEntityName1}.${relationProperty.name}"
            pagination={true}
            value={$sync(${vModel})}
            autofocus={true}
            opened={true}
            appendTo="body"
            emptyValueIsNull={true}
            onBlur={
              ${genBlurFunction(property, nameGroup)}
            }
            onSelect={
              ${genBlurFunction(property, nameGroup)}
            }>
        </USelect>`;
      }
    }
  } else if (propertyTypeName === 'Boolean') {
    formItem += `<USelect
        clearable={true}
        value={$sync(${vModel})}
        placeholder="请选择${label}"
        autofocus={true}
        opened={true}
        appendTo="body"
        emptyValueIsNull={true}
        onBlur={
          ${genBlurFunction(property, nameGroup)}
        }
        onSelect={
          ${genBlurFunction(property, nameGroup)}
        }>
        <USelectItem value={true} text="是"></USelectItem>
        <USelectItem value={false} text="否"></USelectItem>
    </USelect>`;
  } else if (propertyTypeName === 'Integer' || propertyTypeName === 'Long') {
    formItem += `<UNumberInput
        value={$sync(${vModel})}
        placeholder="请输入${label}"
        autofocus={true}
        onBlur={
          ${genBlurFunction(property, nameGroup)}
        }>
    </UNumberInput>`;
  } else if (propertyTypeName === 'Double') {
    formItem += `<UNumberInput
        value={$sync(${vModel})}
        precision={0}
        step={0}
        placeholder="请输入${label}"
        autofocus={true}
        onBlur={
          ${genBlurFunction(property, nameGroup)}
        }>
    </UNumberInput>`;
  } else if (propertyTypeName === 'Decimal') {
    formItem += `<UNumberInput
        value={$sync(${vModel})}
        precision={0}
        step={0}
        placeholder="请输入${label}"
        autofocus={true}
        onBlur={
          ${genBlurFunction(property, nameGroup)}
        }>
    </UNumberInput>`;
  } else if (propertyTypeName === 'String' && propertyTypeMaxLength > 256) {
    formItem += `<UValidator
        placement="bottom"
        display="appear"
        onBlurValid={
          ${genBlurFunction(property, nameGroup)}
        }
        style="width:100%"
        appendTo="body">
          <UTextarea
              value={$sync(${vModel})}
              placeholder="请输入${label}"
              autofocus={true}
              size="full"
              emptyValueIsNull={true}>
          </UTextarea>
        </UValidator>`;
  } else if (propertyTypeName === 'Date') {
    formItem += `<UDatePicker
        clearable={true}
        value={$sync(${vModel})}
        placeholder="请选择${label}"
        autofocus={true}
        opened={true}
        appendTo="body"
        emptyValueIsNull={true}
        onBlur={
          ${genBlurFunction(property, nameGroup)}
        }>
    </UDatePicker>`;
  } else if (propertyTypeName === 'Time') {
    formItem += `<UTimePicker
        value={$sync(${vModel})}
        placeholder="请选择${label}"
        autofocus={true}
        opened={true}
        appendTo="body"
        emptyValueIsNull={true}
        onBlur={
          ${genBlurFunction(property, nameGroup)}
        }>
    </UTimePicker>`;
  } else if (propertyTypeName === 'DateTime') {
    formItem += `<UDateTimePicker
        clearable={true}
        value={$sync(${vModel})}
        placeholder="请选择${label}"
        autofocus={true}
        opened={true}
        appendTo="body"
        emptyValueIsNull={true}
        onBlur={
          ${genBlurFunction(property, nameGroup)}
        }>
    </UDateTimePicker>`;
  } else {
    const namespaceArr = propertyTypeNamespace.split('.');
    const type = namespaceArr.pop();
    if (type === 'enums') {
      const enumTypeAnnotationStr = `${propertyTypeNamespace}.${propertyTypeName}`;
      formItem += `<USelect
          clearable={true}
          value={$sync(${vModel})}
          placeholder="请输入${label}"
          dataSource={nasl.util.EnumToList<${enumTypeAnnotationStr}>()}
          autofocus={true}
          opened={true}
          appendTo="body"
          emptyValueIsNull={true}
          onBlur={
            ${genBlurFunction(property, nameGroup)}
          }
          onSelect={
            ${genBlurFunction(property, nameGroup)}
          }>
      </USelect>`;
    } else {
      formItem += `<UValidator
        placement="bottom"
        display="appear"
        onBlurValid={
          ${genBlurFunction(property, nameGroup)}
        }
        style="width:100%"
        appendTo="body">
      <UInput value={$sync(${vModel})} placeholder="请输入${label}" autofocus={true} size="full" emptyValueIsNull={true}></UInput>
      </UValidator>`;
    }
  }
  return `slotEditcell={
    (current) => <ULinearLayout gap="small">
    ${formItem}
    </ULinearLayout>
  }`;
}

function genTableEditColumnTemplate(entity: naslTypes.Entity, property: naslTypes.EntityProperty, nameGroup: NameGroup, selectNameGroupMap: Map<string, NameGroup>) {
  const canEditable = (property1) => !property1.readonly;
  const title = property.label || property.name;
  return `<UTableViewColumn
    field="${firstLowerCase(entity.name)}.${property.name}"
    ${canEditable(property) ? 'type="editable"' : ''}
    slotTitle={
      <UText text="${title}"></UText>
    }
    slotCell={
      (current) => <ULinearLayout gap="small">
          ${genTextTemplate(property, nameGroup)}
      </ULinearLayout>
    }
    slotExpander={
      (current) => <UTableViewExpander
          item={current.item}>
      </UTableViewExpander>
    }
    ${genEditComponent(entity, property, nameGroup, selectNameGroupMap)}>
  </UTableViewColumn>`;
}

export function genEditTableTemplate(entity: naslTypes.Entity, nameGroup: NameGroup, selectNameGroupMap: Map<string, NameGroup>) {
  const namespace = entity.getNamespace();
  const entityName = entity.name;
  const currentName = nameGroup.currentName || 'current';
  const properties = entity.properties.filter(filterProperty('inTable'));
  const dataSourceValue = `app.logics.${nameGroup.logic}(elements.$ce.page, elements.$ce.size, elements.$ce.sort, elements.$ce.order, ${nameGroup.viewVariableFilter})`;
  const idProperties = getAllEntityPromaryKeyProperty(entity);
  return `<UTableView
    ref="${nameGroup.viewElementMainView}"
    dataSource={${dataSourceValue}}
    valueField="${firstLowerCase(entity.name)}.${getEntityPromaryKeyProperty(entity)}"
    pagination={true}
    showSizer={true}
    pageSize={20}
    pageNumber={1}
    defaultColumnWidth={300}>
      <UTableViewColumn
        type="index"
        width={60}
        slotTitle={
            <UText text="序号"></UText>
        }
        slotExpander={
            (current) => <UTableViewExpander
                item={current.item}>
            </UTableViewExpander>
        }>
      </UTableViewColumn>
      ${properties.map((property) => `${genTableEditColumnTemplate(entity, property, nameGroup, selectNameGroupMap)}`).join('\n')}
      <UTableViewColumn
          slotTitle={
              <UText text="操作"></UText>
          }
          slotCell={
              (current) => <ULinearLayout gap="small">
                  <ULink
                      text="删除"
                      onClick={
                          function ${nameGroup.viewLogicRemove}(event) {
                              ${namespace}.${entityName}Entity.delete(${idProperties.map((property) => `${currentName}.item.${firstLowerCase(entity.name)}.${property.name}`).join(',')})
                              $refs.${nameGroup.viewElementMainView}.reload()
                          }
                      }>
                  </ULink>
              </ULinearLayout>
          }
          slotExpander={
              (current) => <UTableViewExpander
                  item={current.item}>
              </UTableViewExpander>
          }>
      </UTableViewColumn>
  </UTableView>`;
}

function genSaveModalTemplate(entity: naslTypes.Entity, nameGroup: NameGroup, selectNameGroupMap: Map<string, NameGroup>) {
  const dataSource = entity.parentNode;
  const properties = entity.properties.filter(filterProperty('inForm'));
  nameGroup.vModelName = nameGroup.viewVariableInput;

  return `<UModal ref="${nameGroup.viewElementSaveModal}"
    slotTitle={
      <>
        <UText text="创建"></UText>
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

export function genTableEditBlock(entity: naslTypes.Entity, refElement: naslTypes.ViewElement) {
  const likeComponent = refElement?.likeComponent;
  const dataSource = entity.parentNode;
  const module = dataSource.app;
  const namespace = entity.getNamespace();
  const entityName = entity.name;
  const entityFullName = `${namespace}.${entityName}`;

  const viewElementMainView = likeComponent.getViewElementUniqueName('tableView');
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
  nameGroup.viewLogicBlurUpdate = likeComponent.getLogicUniqueName('blurUpdate');
  nameGroup.viewLogicReload = likeComponent.getLogicUniqueName('reload');
  nameGroup.viewVariableEntity = likeComponent.getVariableUniqueName(firstLowerCase(entity.name));
  nameGroup.viewVariableInput = getViewUniqueVariableNames(likeComponent.getVariableUniqueName('input'), nameGroup.viewVariableEntity);
  nameGroup.viewVariableFilter = getViewUniqueVariableNames(likeComponent.getVariableUniqueName('filter'), nameGroup.viewVariableEntity);
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
  const entityLogic = genQueryLogic(allEntities, nameGroup, true, true);
  newLogics.push(entityLogic);

  return `export function view() {
      let ${nameGroup.viewVariableEntity}: ${entityFullName};
      let ${nameGroup.viewVariableInput}: ${entityFullName};
      let ${nameGroup.viewVariableFilter}: ${entityFullName};

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
                        ${nameGroup.viewVariableInput} = nasl.util.Clone(${nameGroup.viewVariableEntity});
                        $refs.${nameGroup.viewElementSaveModal}.open()
                    }
                }></UButton>
        </ULinearLayout>
        ${genEditTableTemplate(entity, nameGroup, selectNameGroupMap)}
        ${genSaveModalTemplate(entity, nameGroup, selectNameGroupMap)}
    </ULinearLayout>
    }
    export namespace app.logics {
      ${newLogics.join('\n')}
    }`;
}
