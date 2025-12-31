import * as utils from './index';
import { setAttrValue, getAttrValue, getFormItemControlNode } from '../components/property-panel/fields';

// 外层包裹form-item模版
export function addFormItemTemplate(block, title) {
  return {
    concept: 'ViewElement',
    tag: 'u-form-item',
    name: 'form_item_1',
    slotScope: '',
    bindAttrs: [
      // { concept: 'BindAttribute', name: 'required', type: 'static', value: 'true', playground: [] },
      { concept: 'BindAttribute', name: 'layout', type: 'string', value: 'center', playground: [] },
    ],
    bindEvents: [],
    bindDirectives: [],
    children: [
      {
        concept: 'ViewElement',
        tag: 'template',
        name: 'template_1',
        slotTarget: 'label',
        slotScope: '',
        bindAttrs: [],
        bindEvents: [],
        bindDirectives: [],
        children: [
          {
            concept: 'ViewElement',
            tag: 'u-text',
            name: 'text_2',
            slotScope: '',
            bindRoles: [],
            cssRules: [],
            bindAttrs: [{ concept: 'BindAttribute', name: 'text', type: 'string', value: title, playground: [] }], // 标题
            bindEvents: [],
            bindDirectives: [],
            bindStyles: [],
            children: [],
          },
        ],
      },
      block, // 待插入组件
    ],
  };
}

// 插入页面元素
export function insertViewElement(targetNode, newBlock, position = 'insertAfter') {
  if (!targetNode || !newBlock) return;
  let newNode = null;

  // case1: 父节点是form，且children为空，直接添加
  if (position === 'append') {
    newNode = targetNode.addViewElement(newBlock);
    newNode && newNode.updateUniqueViewElementName();
    return newNode;
  }

  // case2: 父节点是form，且children不为空，根据position插入到参考节点/前/后
  const parent = targetNode.parentNode;
  if (!parent) return;
  let index = parent.children?.indexOf?.(targetNode);
  if (index < 0) return;
  if (position === 'insertAfter') {
    index += 1;
  }

  newNode = parent.insertViewElementAt(newBlock, index);
  newNode && newNode.updateUniqueViewElementName();
  return newNode;
}

export function getFieldPropertyType(tagName) {
  const defaultTypeAnnotation = {
    concept: 'TypeAnnotation',
    typeKind: 'primitive',
    typeNamespace: 'nasl.core',
    typeName: 'string',
  };
  switch (tagName) {
    case 'u-input':
    case 'u-textarea':
    case 'u-radios':
    case 'u-select':
    case 'u-region-select':
      return defaultTypeAnnotation;
    case 'u-number-input':
      return Object.assign({}, defaultTypeAnnotation, {
        typeName: 'Long',
      });
    case 'u-number-input-decimal':
      return Object.assign({}, defaultTypeAnnotation, {
        typeName: 'Decimal',
        ruleMap: {
          scale: 2,
        },
      });
    case 'u-checkboxes':
      return {
        concept: 'TypeAnnotation',
        typeKind: 'generic',
        typeNamespace: 'nasl.collection',
        typeName: 'List',
        typeArguments: [
          {
            concept: 'TypeAnnotation',
            typeKind: 'primitive',
            typeNamespace: 'nasl.core',
            typeName: 'String',
            name: 'T',
          },
        ],
      };
    case 'u-date-picker':
      return Object.assign({}, defaultTypeAnnotation, {
        typeName: 'Date',
      });
    case 'u-time-picker':
      return Object.assign({}, defaultTypeAnnotation, {
        typeName: 'Time',
      });
    case 'u-date-time-picker':
      return Object.assign({}, defaultTypeAnnotation, {
        typeName: 'DateTime',
      });
    case 'u-uploader':
      return Object.assign({}, defaultTypeAnnotation, {
        rules: ['maxLength(16777215)'],
        databaseTypeAnnotation: {
          concept: 'DatabaseTypeAnnotation',
          typeName: 'mediumtext',
        },
      });
    default:
      return defaultTypeAnnotation;
  }
}

// 生成实体属性并绑定
export function handleAddEntityAndBind(node, tagName, title) {
  // step1: 获取当前form绑定的实体
  const formEntity = utils.getFormEntity(node.view);
  if (!formEntity) return;

  // step2: 在实体上添加新属性
  const propertyName = formEntity.getPropertyUniqueName();
  const property = formEntity.addProperty({
    name: propertyName,
    columnName: propertyName,
    label: title,
    typeAnnotation: getFieldPropertyType(tagName),
  });

  // step3: 绑定值字段到控件上
  const controlNode = getFormItemControlNode(node);
  if (!controlNode) return;
  setAttrValue({
    node: controlNode,
    key: 'value',
    type: 'dynamic',
    value: '',
    expression: {
      concept: 'MemberExpression',
      object: {
        concept: 'Identifier',
        name: formEntity.name,
      },
      property: {
        concept: 'Identifier',
        name: propertyName,
      },
    },
    sync: true,
  });
}
