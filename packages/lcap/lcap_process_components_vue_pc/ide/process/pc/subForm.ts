import * as naslTypes from '@nasl/ast-mini';
import type { ProcessV2 } from '../index';
import {
  NameGroup,
  filterProperty,
  firstUpperCase,
  firstLowerCase,
  getFirstDisplayedProperty,
  genUniqueQueryNameGroup,
  transEntityMetadataTypes,
} from './blocks/utils';

import { genColumnMeta, genQueryLogic } from './blocks/genCommonBlock';

// ----------------------------------------------------------------------------- utils -----------------------------------------------------------------------------
// 生成当前子表单的命名组
function genSubFormNameGroup(variableConfig: any, likeComponent: any, isApprovePage: boolean) {
  const { entity, name, processName, delInfoVarName } = variableConfig;
  const entityName = entity.name;
  return {
    headerTitle: `子表单${entityName}`, // 子表单标题
    addInfo: likeComponent.getLogicUniqueName('addInfo'), // 添加信息逻辑
    copyInfo: likeComponent.getLogicUniqueName('copyInfo'), // 复制信息逻辑
    deleteInfo: likeComponent.getLogicUniqueName('deleteInfo'), // 删除信息逻辑
    tableNode: likeComponent.getViewElementUniqueName('tableView'), // 子表单table节点名
    dataSourceVarName: isApprovePage // 子表单数据源局部变量名
      ? `${processName}.${name}` // (审批页面)
      : `${firstLowerCase(entityName)}List`, // (申请页面)
    delInfoVarName, // 子表单删除信息局部变量名
    delModalName: likeComponent.getViewElementUniqueName(`del${entityName}Modal`), // 删除弹窗节点名
    vModelName: 'current.item', // 子表单列v-model绑定值
    entityFullName: `${entity.getNamespace()}.${entityName}`, // 子表单实体全名
  };
}

// 子表单实体属性过滤
const filterProperties = ['id', 'createdTime', 'updatedTime', 'createdBy', 'updatedBy'];

// 生成子表单列模版
function genTableColumnTemplate(
  entity: naslTypes.Entity,
  property: naslTypes.EntityProperty,
  nameGroup: NameGroup,
  selectNameGroupMap: Map<string, NameGroup>
) {
  const { title } = genColumnMeta(property, nameGroup);
  const required = property.required;
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
  return `<UTableViewColumn
    width={180}
    field="${property.name}"
    slotTitle={
      <>
        ${required ? '<UText text="*" style="color: red;"></UText>' : ''}
        <UText text="${title}"></UText>
      </>
    }
    slotCell={
        (current) => <UValidator label="${title}" appendTo="body"
        ${rules.length ? `rules={[${rules.join(',')}]}` : ''}
        style="width: 100%;">
            ${genPropertyEditableTemplate(entity, property, nameGroup, selectNameGroupMap)}
        </UValidator>
    }
    slotExpander={
        (current) => <UTableViewExpander
            item={current.item}>
        </UTableViewExpander>
    }>
  </UTableViewColumn>`;
}

// ----------------------------------------------------------------------------- export ----------------------------------------------------------------------------
// 获取子表单配置
export function getSubFormConfig(process: ProcessV2, source?: any, likeComponent?: any) {
  const app = process.getAncestor('App');
  const processName = process.name;
  return (
    process?.bind?.typeAnnotation?.properties
      ?.filter((property: any) => {
        if (property?.name?.startsWith('relation_data')) {
          const { typeName } = property.typeAnnotation.typeArguments[0];
          return source ? source[typeName] : true;
        }
      })
      ?.map((property: any) => {
        const typeAnnotation = property?.typeAnnotation?.typeArguments?.[0];
        if (typeAnnotation) {
          const { typeName, typeNamespace } = typeAnnotation;
          const fullName = `${typeNamespace}.${typeName}`;
          let delInfoVarName = `del${typeName}`;
          return {
            name: property.name, // 子表单名称
            varName: firstLowerCase(typeName), // 局部变量名为首字母小写
            entity: app.findNodeByCompleteName(fullName), // 实体
            type: fullName,
            isMainEntity: false,
            processName,
            delInfoVarName: likeComponent ? likeComponent.getVariableUniqueName(delInfoVarName) : delInfoVarName, // 子表单删除信息局部变量需要唯一
          };
        }
      }) || []
  );
}

// 生成子表单新建实体的配置
export function genSubFormEntityNewComposite(entity: naslTypes.Entity, withConnection: boolean) {
  return entity.properties
    .map((property) => {
      const propertyName = property.name;
      return `${propertyName}: ${
        filterProperties.includes(propertyName) ? 'undefined' : withConnection ? `current.item.${propertyName}` : 'undefined'
      }`;
    })
    .join(', ');
}

// 生成子表单模版
export function genSubFormStencilTemplate(
  mainEntity: naslTypes.Entity,
  likeComponent: any,
  variableConfigList: Array<any>,
  selectNameGroupMap: Map<string, NameGroup>,
  newLogics: Array<string>,
  isApprovePage: boolean, // 是否是审批页面
  source?: any // 选择的属性
) {
  let result = '';
  const module = mainEntity.getAncestor('App');
  variableConfigList.forEach((variableConfig) => {
    const { isMainEntity, entity } = variableConfig;
    if (!isMainEntity) {
      const entityName = entity.name;
      const subFormTitle = `子表单${entityName}`;
      const nameGroup = genSubFormNameGroup(variableConfig, likeComponent, isApprovePage); // 生成子表单命名组
      let properties: any = [];
      if (source) {
        properties = source[entityName] || [];
      } else {
        properties = entity.properties.filter((property: any) => {
          return !filterProperties.includes(property.name) && property?.relationEntity !== mainEntity.name && filterProperty('inForm')(property);
        });
      }
      if (!properties.length) return;
      properties.forEach((property) => {
        // 有外键关联
        if (property.relationEntity) {
          const relationEntity = entity.parentNode?.findEntityByName(property.relationEntity);
          if (relationEntity) {
            const displayedProperty = getFirstDisplayedProperty(relationEntity);
            if (displayedProperty) {
              const viewElementSelect = likeComponent.getViewElementUniqueName('select');
              const selectNameGroup = genUniqueQueryNameGroup(module, likeComponent, viewElementSelect, false, relationEntity.name);
              selectNameGroup.viewElementSelect = viewElementSelect;
              // 存在多个属性关联同一个实体的情况，因此加上属性名用以唯一标识
              const key = [entityName, property.name, relationEntity.name].join('-');
              selectNameGroupMap.set(key, selectNameGroup);
              const newLogic = genQueryLogic([relationEntity], selectNameGroup, false, false);
              newLogics.push(newLogic);
            }
          }
        }
      });
      const width = 60 + 160 + properties.length * 180; // “序号列 + 操作列 + 属性列” 的宽度
      result += `<UGridLayoutColumn span={12} style="margin-bottom: 24px;">
        <UFormItem layout="center" labelLayout="block" slotLabel={
          <UText text="${subFormTitle}"></UText>
        }>
          <ULinearLayout direction="vertical" mode="flex" alignment="start" justify="center">
            <ULinearLayout direction="horizontal" wrap={true}>
              <UButton color="primary" text="添 加" subFormBtnType="add"
                onClick={
                  function ${nameGroup.addInfo}(event) {
                    nasl.util.Add(${nameGroup.dataSourceVarName}, nasl.util.NewEntity<${nameGroup.entityFullName}>({ ${genSubFormEntityNewComposite(
        entity,
        false
      )} }))
                  }
              }></UButton>
            </ULinearLayout>
            <UValidator label="${subFormTitle}" style="width:100%;">
              <UTableView
                ref="${nameGroup.tableNode}"
                pageSize={20}
                pageNumber={1}
                dataSource={$sync(${nameGroup.dataSourceVarName})}
                pagination={false}
                showSizer={true}
                style="--custom-start: auto; width: min(${width}px, 100%);"
              >
                <UTableViewColumn
                  type="index"
                  width={60}
                  fixed={true}
                  slotTitle={ <UText text="序号"></UText> }
                  slotExpander={
                      (current) => <UTableViewExpander item={current.item}>
                      </UTableViewExpander>
                  }>
                </UTableViewColumn>
                ${properties.map((property: any) => `${genTableColumnTemplate(entity, property, nameGroup, selectNameGroupMap)}`).join('\n')}
                <UTableViewColumn
                  width={160}
                  fixed={true}
                  subFormInitialColumn="action"
                  slotTitle={ <UText text="操作"></UText> }
                  slotCell={
                      (current) => <ULinearLayout direction="horizontal" wrap={true}>
                          <ULink text="复制"
                            onClick={
                              function ${nameGroup.copyInfo}(event) {
                                nasl.util.Add(${nameGroup.dataSourceVarName}, nasl.util.NewEntity<${
        nameGroup.entityFullName
      }>({ ${genSubFormEntityNewComposite(entity, true)} }))
                              }
                          }></ULink>
                          <ULink text="删除"
                            onClick={
                              function ${nameGroup.deleteInfo}(event) {
                                  ${nameGroup.delInfoVarName} = current.item
                                  $refs.${nameGroup.delModalName}.open()
                              }
                          }></ULink>
                      </ULinearLayout>
                  }
                  slotExpander={
                      (current) => <UTableViewExpander item={current.item}>
                      </UTableViewExpander>
                  }>
                </UTableViewColumn>
              </UTableView>
            </UValidator>
            <UModal ref="${nameGroup.delModalName}" icon="warning"
              slotTitle={
                <UText text="删除"></UText>
              }
              slotBody={
                <ULinearLayout direction="horizontal" wrap={true} mode="flex" justify="start" alignment="start">
                  <UText text="请确认是否删除？" style="font-size:18px;font-weight:bold;"></UText>
                  <UText text="删除后将无法恢复，请谨慎操作"></UText>
                </ULinearLayout>
              }
              slotFoot={
                <ULinearLayout justify="end" gap="normal">
                  <UButton text="取 消"
                    onClick={
                      function ${nameGroup.deleteInfo}(event) {
                          $refs.${nameGroup.delModalName}.close()
                      }
                    }
                  ></UButton>
                  <UButton text="确 定" color="primary"
                    onClick={
                      function ${nameGroup.deleteInfo}(event) {
                          nasl.util.Remove(${nameGroup.dataSourceVarName}, ${nameGroup.delInfoVarName})
                          $refs.${nameGroup.delModalName}.close()
                      }
                    }
                  ></UButton>
                </ULinearLayout>
              }
            ></UModal>
          </ULinearLayout>
        </UFormItem>
      </UGridLayoutColumn>\n`;
    }
  });
  return result;
}

/**
 * property 列生成
 * @param {*} entity
 * @param {*} property
 * @param {*} nameGroup
 * @param {*} selectNameGroupMap
 * @returns
 */
// 与genCommonBlock中的genPropertyEditableTemplate不同点：
// 1.可能存在多个子表单，所以在检索属性的外健关联时，key由实体名+属性名+关联实体名组成
// 2.USelect组件需要额外添加appendTo="body"属性
function genPropertyEditableTemplate(
  entity: naslTypes.Entity,
  property: naslTypes.EntityProperty,
  nameGroup: NameGroup,
  selectNameGroupMap: Map<string, NameGroup>
) {
  const dataSource = entity.parentNode;
  const vModel = `${nameGroup.vModelName}.${property.name}`;
  const label = (property.label || property.name).replace(/"/g, '&quot;');
  const { typeAnnotation } = property || {};
  const { typeNamespace: propertyTypeNamespace } = typeAnnotation || {};
  const propertyTypeName = transEntityMetadataTypes(typeAnnotation, dataSource.app);
  const propertyTypeMaxLength =
    Number(
      property.rules
        .find((item) => item.indexOf('max') > -1)
        ?.split('(')[1]
        .slice(0, -1)
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
        const key = [entity.name, property.name, relationEntity.name].join('-'); // 此处的key多了entity.name
        const selectNameGroup = selectNameGroupMap.get(key);
        const dataSourceValue = `app.logics.${selectNameGroup.logic}(elements.$ce.page, elements.$ce.size)`;
        return `<USelect
                appendTo="body"
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
      }
      return '';
    }
    return '';
  }
  if (propertyTypeName === 'Boolean') {
    return `<USelect
        appendTo="body"
        clearable={true}
        value={$sync(${vModel})}
        placeholder="请选择${label}"
        emptyValueIsNull={true}>
        <USelectItem value={true} text="是"></USelectItem>
        <USelectItem value={false} text="否"></USelectItem>
    </USelect>`;
  }
  if (propertyTypeName === 'Integer' || propertyTypeName === 'Long') {
    return `<UNumberInput
        value={$sync(${vModel})}
        placeholder="请输入${label}">
    </UNumberInput>`;
  }
  if (propertyTypeName === 'Double') {
    return `<UNumberInput
        value={$sync(${vModel})}
        precision={0}
        step={0}
        placeholder="请输入${label}">
    </UNumberInput>`;
  }
  if (propertyTypeName === 'Decimal') {
    return `<UNumberInput
        value={$sync(${vModel})}
        precision={0}
        step={0}
        placeholder="请输入${label}">
    </UNumberInput>`;
  }
  if (propertyTypeName === 'String' && propertyTypeMaxLength > 256) {
    return `<UTextarea
        value={$sync(${vModel})}
        placeholder="请输入${label}"
        emptyValueIsNull={true}>
    </UTextarea>`;
  }
  if (propertyTypeName === 'Date') {
    return `<UDatePicker
        clearable={true}
        value={$sync(${vModel})}
        placeholder="请选择${label}"
        emptyValueIsNull={true}>
    </UDatePicker>`;
  }
  if (propertyTypeName === 'Time') {
    return `<UTimePicker
        value={$sync(${vModel})}
        placeholder="请选择${label}"
        emptyValueIsNull={true}>
    </UTimePicker>`;
  }
  if (propertyTypeName === 'DateTime') {
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
                appendTo="body"
                clearable={true}
                value={$sync(${vModel})}
                placeholder="请选择${label}"
                dataSource={nasl.util.EnumToList<${enumTypeAnnotationStr}>()}
                emptyValueIsNull={true}>
            </USelect>`;
  }
  return `<UInput value={$sync(${vModel})} placeholder="请输入${label}" emptyValueIsNull={true}></UInput>`;
}
