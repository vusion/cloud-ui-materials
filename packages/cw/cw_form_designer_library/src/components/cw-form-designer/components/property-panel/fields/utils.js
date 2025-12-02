// 获取表单项中的控件节点
export const getFormItemControlNode = (node) => {
  if (!node || node?.tag !== 'u-form-item') return null;

  return node.children.find((child) => child.tag !== 'template');
};

// 获取表单项中的标题节点
export const getFormItemLabelNode = (node) => {
  if (!node || node?.tag !== 'u-form-item') return null;

  return node.children.find((child) => child.tag === 'template')?.children?.[0];
};

// 获取属性值
export const getAttrValue = ({ node, key }) => {
  if (!node || typeof key !== 'string') return '';

  const attr = node?.bindAttrs?.find((attr) => attr.name === key);
  if (!attr) return undefined;

  return attr.value;
};

// 设置属性值
export const setAttrValue = ({ node, key, value, type = 'string', expression = null, sync = false }) => {
  if (!node || typeof key !== 'string') return null;

  const payload = { type, value, expression, sync };
  let attr = node.bindAttrs?.find((item) => item.name === key);

  if (attr) {
    attr.update(payload);
  } else {
    attr = node.addBindAttribute({ name: key, ...payload });
  }

  return attr || null;
};

// 获取控件绑定的property
export const getControlNodeEntityProperty = (controlNode) => {
  if (!controlNode) return null;
  const propertyName = getBindEntityPropertyName(controlNode);
  if (!propertyName) return null;
  const formEntity = controlNode.view.entities.find((entity) => entity.origin === 'form');
  if (!formEntity) return null;
  return formEntity.properties.find((property) => property.name === propertyName);
};

// 获取控件绑定的property名称
export const getBindEntityPropertyName = (controlNode) => {
  if (!controlNode) return null;
  return controlNode.bindAttrs.find((attr) => attr.name === 'value')?.expression?.property?.name;
};
