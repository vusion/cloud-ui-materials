import * as sharedUtils from '@/components/cw-form-designer/components/property-panel/shared';
import * as naslUtils from '@/mini-nasl/utils';
import { EntityProperty } from '@/mini-nasl';
import * as formDesignerUtils from '@/components/cw-form-designer/utils';
import { getFieldPropertyType } from './addblock';
import { getAttrValue, setAttrValue, getFormItemControlNode } from '@/components/cw-form-designer/components/property-panel/fields';
import { subFormDropColumnBlock } from '@/components/cw-form-designer/config';

export const TABLE_TAG = 'u-table-view';
export const TABLE_COLUMN_TAG = 'u-table-view-column';
export const SUB_FORM_TEMPLATE_TAG = 'u-linear-layout'; // 子表单模版标签

// 是否是表格标签
export function isTableTag(tag) {
  return tag == TABLE_TAG;
}

// 是否是表格列标签
export function isTableColumnTag(tag) {
  return tag == TABLE_COLUMN_TAG;
}

// 获取表单项中的控件节点标签
export function getFormItemControlNodeTag(node) {
  if (!node || node?.tag !== 'u-form-item') return null;
  const tempNode = getFormItemControlNode(node);
  if (tempNode?.tag === SUB_FORM_TEMPLATE_TAG) {
    return 'u-sub-form';
  }
  return tempNode.tag;
}

// 添加子表单模版
export function addSubFormTemplate(block, title) {
  return {
    concept: 'ViewElement',
    tag: 'u-form-item',
    slotScope: '',
    bindAttrs: [
      { concept: 'BindAttribute', name: 'labelLayout', type: 'string', value: 'block' },
      { concept: 'BindAttribute', name: 'layout', type: 'string', value: 'center' },
      { concept: 'BindAttribute', name: 'span', type: 'static', value: 2 },
    ],
    bindEvents: [],
    children: [
      {
        concept: 'ViewElement',
        tag: 'template',
        slotTarget: 'label',
        slotScope: '',
        bindAttrs: [],
        bindEvents: [],
        children: [
          {
            concept: 'ViewElement',
            tag: 'u-text',
            slotScope: '',
            bindAttrs: [
              { concept: 'BindAttribute', name: 'text', type: 'string', value: title }, // 标题
              { concept: 'BindAttribute', name: 'subFormLabel', type: 'static', value: true },
            ],
            bindEvents: [],
            children: [],
          },
        ],
      },
      block, // 待插入组件
    ],
  };
}

// 添加子表单列模版
export function addSubFormColumnTemplate(block, title) {
  return {
    concept: 'ViewElement',
    tag: 'u-table-view-column',
    bindAttrs: [
      {
        concept: 'BindAttribute',
        name: 'width',
        type: 'string',
        value: '180',
      },
    ],
    bindEvents: [],
    children: [
      {
        concept: 'ViewElement',
        tag: 'template',
        slotTarget: 'title',
        slotScope: '',
        bindAttrs: [],
        bindEvents: [],
        children: [
          {
            concept: 'ViewElement',
            tag: 'u-text',
            bindAttrs: [
              {
                concept: 'BindAttribute',
                name: 'text',
                type: 'string',
                value: title,
              },
            ],
            bindEvents: [],
            children: [],
          },
        ],
      },
      {
        concept: 'ViewElement',
        tag: 'template',
        slotTarget: 'cell',
        slotScope: 'current',
        bindAttrs: [],
        bindEvents: [],
        children: [
          {
            concept: 'ViewElement',
            tag: 'u-validator',
            staticStyle: 'width:100%;',
            slotScope: '',
            bindAttrs: [
              {
                concept: 'BindAttribute',
                name: 'label',
                type: 'string',
                value: title,
              },
              {
                concept: 'BindAttribute',
                name: 'appendTo',
                type: 'string',
                value: 'body',
              },
            ],
            bindEvents: [],
            children: [block],
          },
        ],
      },
      {
        concept: 'ViewElement',
        tag: 'template',
        slotTarget: 'expander',
        slotScope: 'current',
        bindAttrs: [],
        bindEvents: [],
        children: [
          {
            concept: 'ViewElement',
            tag: 'u-table-view-expander',
            bindAttrs: [
              {
                concept: 'BindAttribute',
                name: 'item',
                type: 'dynamic',
                value: '',
                expression: {
                  concept: 'MemberExpression',
                  name: '',
                  object: {
                    concept: 'Identifier',
                    name: 'current',
                  },
                  property: {
                    concept: 'Identifier',
                    name: 'item',
                  },
                },
              },
            ],
            bindEvents: [],
            children: [],
          },
        ],
      },
    ],
  };
}
// ================================ 子表单处理主逻辑 ================================
// 添加子表单
export async function onAddSubForm(node) {
  const { view } = node;
  // step1: 获取当前form绑定的实体
  const formEntity = formDesignerUtils.getFormEntity(view);
  if (!formEntity) return;
  const formEntityName = formEntity.name;

  const newEntityName = view.getEntityUniqueName(`${formEntityName}_sub_form_info`),
    suffix = sharedUtils.getSubFormSuffixIndex(newEntityName),
    relationName = `relation_data${suffix ? `_${suffix}` : ''}`;

  const newEntity = naslUtils.addEntityWithBasicProperties({
    view,
    entityName: newEntityName,
    origin: 'sub-form',
    description: relationName,
    sequencePrefix: formEntityName,
  });

  // step2: 添加外键关联属性
  const newProperty = EntityProperty.from({
    typeAnnotation: {
      concept: 'TypeAnnotation',
      typeKind: 'primitive',
      typeNamespace: 'nasl.core',
      typeName: 'Long',
    },
    concept: 'EntityProperty',
    name: 'relatedEntity',
    columnName: 'related_entity',
    label: '外键',
    required: false, // 是否需要为true
    relationNamespace: 'entities',
    relationEntity: formEntityName,
    relationProperty: 'id',
    deleteRule: 'cascade',
  });
  newEntity.addProperty(newProperty);

  // step3: 后续处理
  handleSubFormAfterAdd({ formEntity, newEntity, node, suffix });
}

// 子表单添加后处理,⚠️：抽离成独立逻辑，可以在添加/复制 子表单时复用
export function handleSubFormAfterAdd({ formEntity, newEntity, node, suffix }) {
  const { view } = node;
  const formEntityName = formEntity.name;
  const newEntityName = newEntity.name;
  // step1: 添加局部变量（作为：子表单数据源）
  const dataSourceVar = view.addVariable({
    name: view.getVariableUniqueName(`${formEntityName}_sub_form`),
    typeAnnotation: {
      concept: 'TypeAnnotation',
      typeKind: 'generic',
      typeNamespace: 'nasl.collection',
      typeName: 'List',
      typeArguments: [
        {
          concept: 'TypeAnnotation',
          typeKind: 'reference',
          typeNamespace: 'entities',
          typeName: newEntityName,
          name: 'T',
        },
      ],
    },
  });

  // step2: 子表单绑定数据源 记录属性名
  const { subForm, subFormLayout, ...otherNodes } = sharedUtils.getSubFormNodeList(node);

  if (subForm) {
    setAttrValue({
      node: subForm,
      key: 'dataSource',
      type: 'dynamic',
      expression: {
        concept: 'Identifier',
        name: dataSourceVar.name,
      },
    });
    setAttrValue({
      node: subForm,
      key: 'subFormBindEntity',
      type: 'string',
      value: newEntityName,
    });
  }
  if (subFormLayout) {
    setAttrValue({
      node: subFormLayout,
      key: 'subFormBindEntity',
      type: 'string',
      value: newEntityName,
    });
  }

  // step3: 给子表单模版中的按钮或link等添加对应事件
  updateSubFormEvents({
    nodes: otherNodes,
    newEntity,
    dataSourceVarName: dataSourceVar.name,
    suffixStr: suffix ? `${suffix}` : '',
  });
}

// 复制子表单
export function onDuplicateSubForm(formItemNode) {
  const { view } = formItemNode;
  const { subFormLayout, subForm } = sharedUtils.getSubFormNodeList(formItemNode);
  if (!subFormLayout || !subForm) return;
  // 子表单实体名称
  const subFormEntityName = getAttrValue({ node: subFormLayout, key: 'subFormBindEntity' });
  if (!subFormEntityName) return;
  const subFormEntity = view.entities.find((it) => it.name === subFormEntityName);
  // 主表单实体
  const formEntityName = subFormEntity.properties.find((it) => it.name === 'relatedEntity')?.relationEntity;
  if (!formEntityName) return;
  const formEntity = view.entities.find((it) => it.name === formEntityName);
  // step1: 复制子表单布局
  const currentIndex = formItemNode.parentNode.children.indexOf(formItemNode);
  const newFormItemNode = formItemNode.parentNode.insertViewElementAt(
    formItemNode._duplicate(({ node }) => {
      if (node.concept === 'ViewElement' && node.bindEvents.length > 0) {
        node.bindEvents = []; // 复制时，删除绑定事件，后续会重新绑定
      }
    }),
    currentIndex + 1
  );
  // step2: 复制子表单实体, 并更新主键序列
  const newSubFormEntity = view.addEntity(Object.assign({}, subFormEntity.toJSON(), { name: view.getEntityUniqueName(subFormEntityName) }));
  naslUtils.updatePrimaryKeySequence(newSubFormEntity, formEntityName);
  const suffix = sharedUtils.getSubFormSuffixIndex(newSubFormEntity.name);
  // step3: 后续处理
  handleSubFormAfterAdd({ formEntity, newEntity: newSubFormEntity, node: newFormItemNode, suffix });

  return newFormItemNode?.nodePath;
}

// 删除子表单
export function onDelSubForm(formItemNode) {
  const { view } = formItemNode;
  const subFormLayout = getFormItemControlNode(formItemNode);
  if (!subFormLayout) return;
  const subFormEntityName = getAttrValue({ node: subFormLayout, key: 'subFormBindEntity' });
  if (!subFormEntityName) return;
  const subFormEntity = view.entities.find((it) => it.name === subFormEntityName);
  if (!subFormEntity) return;
  // step1: 删除子表单相关的局部变量
  const dataSourceVar = view.variables.filter(
    (it) =>
      (it.typeAnnotation?.typeName === 'List' && it.typeAnnotation?.typeArguments?.[0]?.typeName === subFormEntityName) ||
      it.typeAnnotation?.typeName === subFormEntityName
  );
  dataSourceVar.forEach((it) => it.delete());
  // step2: 删除子表单实体
  subFormEntity.delete();
  // step3: 删除子表单节点
  formItemNode.delete();
}

// 添加子表单列
export function onAddSubFormColumn(columnNode, tagName, title) {
  const { view, parentNode: subFormNode } = columnNode;
  // step1: 如果是第一个非初始化列， 删除drop列
  const dropColumn = sharedUtils.getSubFormInitialColumn(columnNode, 'drop');
  dropColumn && dropColumn?.delete?.();

  // step2: 更新子表单样式（宽度）
  updateSubFormStyle(subFormNode);

  // step3: 添加新列属性
  const subFormEntity = sharedUtils.getSubFormBindEntity(subFormNode);
  if (!subFormEntity) return;
  const newPropertyName = subFormEntity.getPropertyUniqueName();
  const property = subFormEntity.addProperty({
    name: newPropertyName,
    columnName: newPropertyName,
    label: title,
    typeAnnotation: getFieldPropertyType(tagName),
  });

  // step4: 绑定值字段到控件上
  const controlNode = sharedUtils.getSubFormColumnControlNode(columnNode);
  if (!controlNode) return;
  updateSubFormColumnBindValue(columnNode, controlNode, newPropertyName);

  // step5: 同步addBtn 和 copyLink节点事件
  syncBtnAndLinkEvents(subFormNode, subFormEntity);
}

// 复制子表单列
export function onDuplicateSubFormColumn(columnNode) {
  const { view, parentNode: subFormNode } = columnNode;
  const subFormEntity = sharedUtils.getSubFormBindEntity(subFormNode);
  const propertyName = getSubFormColumnPropertyName(columnNode);
  const property = subFormEntity.properties.find((it) => it.name === propertyName);

  // step1: 复制子表单列
  const currentIndex = subFormNode.children.indexOf(columnNode);
  const newColumnNode = subFormNode.insertViewElementAt(columnNode._duplicate(), currentIndex + 1);

  // step2: 更新子表单样式（宽度）
  updateSubFormStyle(subFormNode);
  // step3: 复制实体属性
  const newProperty = subFormEntity.addProperty(
    Object.assign({}, property.toJSON(), {
      name: subFormEntity.getPropertyUniqueName(),
    })
  );
  // step4: 更新节点上绑定的属性, 子表单列绑定值字段
  const newControlNode = sharedUtils.getSubFormColumnControlNode(newColumnNode);
  updateSubFormColumnBindValue(newColumnNode, newControlNode, newProperty.name);
  // step5: 同步addBtn 和 copyLink节点事件
  syncBtnAndLinkEvents(subFormNode, subFormEntity);
  return newColumnNode?.nodePath;
}

// 删除子表单列
export function onDelSubFormColumn(columnNode) {
  const { view, parentNode: subFormNode } = columnNode;
  const subFormEntity = sharedUtils.getSubFormBindEntity(subFormNode);
  const propertyName = getSubFormColumnPropertyName(columnNode);
  const property = subFormEntity.properties.find((it) => it.name === propertyName);

  // step1: 删除子表单列 属性
  columnNode.delete();
  property.delete();
  // subFormEntity.update({
  //   properties: subFormEntity.properties.map((it) => it.toJSON()).filter((it) => it.name !== propertyName),
  // });

  // step2: 如果没有了非初始化列，则添加dro列
  const normalColumn = subFormNode.children.find((it) => !getAttrValue({ node: it, key: 'subFormInitialColumn' }));
  if (!normalColumn) {
    const actionColumn = sharedUtils.getSubFormInitialColumn(columnNode, 'action');
    actionColumn && formDesignerUtils.insertViewElement(actionColumn, subFormDropColumnBlock, 'insertBefore');
  }

  // step3: 更新子表单样式（宽度）
  updateSubFormStyle(subFormNode);

  // step4: 同步addBtn 和 copyLink节点事件
  syncBtnAndLinkEvents(subFormNode, subFormEntity);
}

// ================================ 基础处理逻辑 ================================
export function getSubFormColumnPropertyName(columnNode) {
  const controlNode = sharedUtils.getSubFormColumnControlNode(columnNode);
  return controlNode?.bindAttrs.find((it) => it.name === 'value')?.expression?.property?.name;
}

export function updateSubFormEvents({ nodes, newEntity, dataSourceVarName, suffixStr }) {
  const { addBtn, copyLink, deleteLink, confirmBtn, cancelBtn } = nodes;
  // step2: 更新add节点事件
  addBtn && addBtn.addBindEvent(genBindEventTemplate('click', `addInfo${suffixStr}`, genAddLogic(dataSourceVarName, newEntity)));

  // step3: 更新copyLink节点事件
  copyLink && copyLink.addBindEvent(genBindEventTemplate('click', `copyInfo${suffixStr}`, genCopyLogic(dataSourceVarName, newEntity)));

  // step4: 更新deleteLink节点事件
  deleteLink &&
    deleteLink.addBindEvent(
      genBindEventTemplate(
        'click',
        `deleteInfo${suffixStr}`,
        `this.delInfoIndex = current.index; \nthis.delSubFormDataSource = this.${dataSourceVarName}; \nawait this.$refs?.delInfoModal?.open?.();`
      )
    );
}

// 根据eventname，生成对应事件模版
export function genBindEventTemplate(eventName, logicName, body = '') {
  return {
    concept: 'BindEvent',
    name: eventName,
    logics: [
      {
        concept: 'Logic',
        name: logicName || eventName,
        body,
      },
    ],
  };
}

// 生成添加逻辑
export function genAddLogic(dataSourceVar, formEntity) {
  if (!dataSourceVar || !formEntity) return '';
  let code = `{\n`;
  formEntity.properties.forEach((property) => {
    code += `  ${property.name}: undefined,\n`;
  });
  code += `}`;
  return `await this.${dataSourceVar}.push(${code});`;
}

// 生成复制逻辑
export function genCopyLogic(dataSourceVar, formEntity) {
  if (!dataSourceVar || !formEntity) return '';
  const filterList = ['id', 'createdTime', 'updatedTime', 'createdBy', 'updatedBy', 'relatedEntity'];
  let code = `{\n`;
  formEntity.properties.forEach((property) => {
    const isListProperty = property.typeAnnotation?.typeName === 'List';
    code += `  ${property.name}: ${
      filterList.includes(property.name) ? 'undefined' : isListProperty ? `[...(current.item.${property.name} || [])]` : `current.item.${property.name}`
    },\n`;
  });
  code += `}`;
  return `await this.${dataSourceVar}.push(${code});`;
}
// 更新子表单列控件属性
export function updateSubFormColumnBindValue(columnNode, controlNode, newPropertyName) {
  setAttrValue({
    node: controlNode,
    key: 'value',
    type: 'dynamic',
    value: '',
    expression: {
      concept: 'MemberExpression',
      object: {
        concept: 'MemberExpression',
        object: {
          concept: 'Identifier',
          name: 'current',
        },
        property: {
          concept: 'Identifier',
          name: 'item',
        },
      },
      property: {
        concept: 'Identifier',
        name: newPropertyName,
      },
    },
    sync: true,
  });
  setAttrValue({
    node: columnNode,
    key: 'field',
    value: newPropertyName,
  });
}

// 更新子表单样式（宽度）
export function updateSubFormStyle(subFormNode) {
  const newWith = subFormNode.children.reduce((acc, curr) => {
    const curWidth = getAttrValue({ node: curr, key: 'width' });
    return acc + (curWidth ? Number(curWidth) : 0);
  }, 0);
  subFormNode.update({
    staticStyle: `--custom-start: auto; width: min(${newWith}px, 100%);`,
  });
}

// 同步按钮和链接事件
export function syncBtnAndLinkEvents(subFormNode, subFormEntity) {
  const dataSourceVarName = subFormNode.view.variables.find(
    (it) => it.typeAnnotation?.typeName === 'List' && it.typeAnnotation?.typeArguments?.[0]?.typeName === subFormEntity.name
  )?.name;
  const { addBtn, copyLink } = sharedUtils.getSubFormNodeList(subFormNode.parentNode.parentNode);
  if (addBtn) {
    const logic = addBtn.bindEvents.find((it) => it.name === 'click').logics.find((it) => it.name.startsWith('addInfo'));
    logic && logic.setBody(genAddLogic(dataSourceVarName, subFormEntity));
  }
  if (copyLink) {
    const logic = copyLink.bindEvents.find((it) => it.name === 'click').logics.find((it) => it.name.startsWith('copyInfo'));
    logic && logic.setBody(genCopyLogic(dataSourceVarName, subFormEntity));
  }
}
