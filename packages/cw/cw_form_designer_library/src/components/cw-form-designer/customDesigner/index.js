export const getTableViewNode = (node) => {
  // 向上找到node的class以u-table-view_table__开头的节点
  while (node) {
    if (node?.className && node.className.startsWith('u-table-view_table__')) {
      return node;
    }
    node = node.parentElement;
  }
  return null;
};

export const isDropColumn = (node) => {
  return node?.hasAttribute('sub-form-drop-column');
};

/**
 * @description: 获取tableView中th或td对应的另一个元素
 * @param {*} node
 * @return {*}
 */
export const getCorrespondThOrTdNode = (node) => {
  const nodePath = node?.getAttribute('vusion-node-path');
  if (!nodePath) return null;
  const tag = node?.tagName.toLowerCase();
  const anotherTag = tag === 'th' ? 'td' : 'th';
  const tableViewNode = getTableViewNode(node);
  return tableViewNode?.querySelector(`${anotherTag}[vusion-node-path="${nodePath}"]`);
};

export const subFormColumnTags = ['u-table-view-column'];

/**
 * @description: 判断该列是否是初始列/可放置列
 */
export const getColumnConfig = (node) => {
  const isInitialColumn = node?.hasAttribute('sub-form-initial-column'); // 初始化列
  const isDropColumn = node?.hasAttribute('sub-form-drop-column'); // 可放置列
  const initialColumnType = node?.getAttribute('sub-form-initial-column');
  return { isInitialColumn, isDropColumn, initialColumnType };
};

//  ------------------------------ 数据表格类的标签 ------------------------------
export const tableTags = ['u-table-view'];

export const tableItemTags = ['u-table-view-column'];

export const isTableTag = (tag) => tableTags.includes(tag);

export const isTableItemTag = (tag) => tableItemTags.includes(tag);

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
  'u-table-view-column',
];

export const isAllowAddNode = (tag) => {
  return allowAddNodeTags.includes(tag);
};
