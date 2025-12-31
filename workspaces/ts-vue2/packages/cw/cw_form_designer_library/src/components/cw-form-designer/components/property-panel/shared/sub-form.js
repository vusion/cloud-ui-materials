import { getAttrValue } from '@/components/cw-form-designer/components/property-panel/fields';

// ------------------------------  常量 ------------------------------
// 子表单的外层标签
export const subFormTags = ['u-linear-layout'];

// 子表单列的外层标签
export const subFormColumnTags = ['u-table-view-column'];

// 允许添加的节点标签
export const allowAddNodeTags = [
  // pc端
  'u-input',
  'u-textarea',
  'u-number-input',
  'u-number-input-decimal',
  'u-select',
  'u-radios',
  'u-checkboxes',
  'u-date-time-picker',
  'u-date-picker',
  'u-time-picker',
];

//  ------------------------------ utils ------------------------------
// 是否是子表单节点
export const isSubFormNode = (node) => {
  return subFormTags.includes(node?.children?.[1]?.tag);
};

// 是否是子表单列节点
export const isSubFormColumnNode = (node) => {
  return subFormColumnTags.includes(node?.tag);
};

// 获取当前子节点的后缀序号
export function getSubFormSuffixIndex(entityName) {
  return Number(entityName.match(/\d+$/)?.[0] || 0);
}

// 获取子表单节点列表
export function getSubFormNodeList(node) {
  const nodeList = {};
  node.traverseStrictChildren((child) => {
    const { concept, tag, name, value } = child;
    if (concept === 'ViewElement') {
      if (tag === 'u-validator') {
        nodeList.validator = child; // 子表单验证器
      } else if (tag === 'u-table-view') {
        nodeList.subForm = child; // 子表单表格
      } else if (tag === 'u-modal') {
        nodeList.modal = child; // 子表单弹窗
      }
    } else if (concept === 'BindAttribute') {
      if (name === 'subFormBtnType') {
        nodeList[value] = child.parentNode; // 按钮类节点（添加 导出 复制 删除 确定 取消）
      } else if (name === 'subFormLabel') {
        nodeList.label = child.parentNode; // 子表单标题节点
      } else if (name === 'subFormInitialColumn') {
        nodeList[value] = child.parentNode; // 子表单初始化列节点
      } else if (name === 'operateType') {
        let target = child.parentNode;
        if (value === 'operateColumnList') {
          target = getSubFormColumnControlNode(child.parentNode).parentNode;
        }
        nodeList[value] = target; // 操作类型节点
      } else if (name === 'subFormLayout') {
        nodeList.subFormLayout = child.parentNode; // 子表单布局节点
      }
    }
  });
  return nodeList;
}

// 获取子表单的初始化列
export function getSubFormInitialColumn(node, type = 'drop') {
  if (isSubFormColumnNode(node)) {
    const parentNode = node.parentNode;
    return parentNode.children.find((child) => getAttrValue({ node: child, key: 'subFormInitialColumn' }) === type);
  }
}

// 获取子表单绑定实体
export function getSubFormBindEntity(subFormNode) {
  const entityName = getAttrValue({ node: subFormNode, key: 'subFormBindEntity' });
  if (!entityName) return null;
  return subFormNode.view.entities.find((entity) => entity.name === entityName);
}

// 获取子表单列的标签节点
export function getSubFormColumnLabelNode(subFormNode) {
  return subFormNode.children
    .find((child) => child.tag === 'template' && child.slotTarget === 'title')
    ?.children?.find((it) => getAttrValue({ node: it, key: 'text' }) !== '*');
}

// 获取子表单的控件节点
export function getSubFormColumnControlNode(columnNode) {
  return columnNode.children.find((child) => child.slotTarget === 'cell')?.children?.[0]?.children?.[0];
}
