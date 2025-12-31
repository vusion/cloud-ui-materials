import { getAttrValue, setAttrValue, getFormItemControlNode, getFormItemLabelNode, getControlNodeEntityProperty } from './utils';
import * as sharedUtils from '../shared';
import { eventBus } from '@/components/cw-form-designer/utils';
import * as utils from '@/components/cw-form-designer/utils';

export * from './utils';

export default {
  /**
   * form 分组的字段处理函数
   */
  form: {
    // 列数
    repeat: {
      getValue: (params) => {
        return getAttrValue(params) || 2;
      },
      setValue: (params) => {
        return setAttrValue(Object.assign(params, { type: 'static' }));
      },
    },
    // 标题布局
    labelLayout: {
      getValue: (params) => {
        const { node, key } = params;
        const sizeList = [
          ...new Set(
            node.children
              .filter?.((child) => getFormItemControlNode(child))
              ?.map?.((child) => {
                return getAttrValue({ node: child, key }) || 'inline';
              })
          ),
        ];
        if (node.children.length === 0) return 'inline';
        // 表单项目数量>1且标题布局不一致，则返回空
        if (node.children.length > 1 && sizeList.length > 1) return '';
        return sizeList[0];
      },
      setValue: (params) => {
        const { node, key, value } = params;
        setAttrValue({ node, key, value });
        node.children.forEach((child) => {
          if (child.tag === 'u-form-item') {
            setAttrValue({ node: child, key, value });
          }
        });
        return node;
      },
    },
    // 标题宽度
    labelSize: {
      getValue: (params) => {
        const { node, key } = params;
        const sizeList = [
          ...new Set(
            node.children
              .filter?.((child) => getFormItemControlNode(child))
              ?.map?.((child) => {
                return getAttrValue({ node: child, key }) || 'normal';
              })
          ),
        ];
        if (node.children.length === 0) return 'normal';
        // 表单项目数量>1且标题宽度不一致，则返回空
        if (node.children.length > 1 && sizeList.length > 1) return '';
        return sizeList[0];
      },
      setValue: (params) => {
        const { node, key, value } = params;
        setAttrValue({ node, key, value });
        node.children.forEach((child) => {
          if (child.tag === 'u-form-item') {
            setAttrValue({ node: child, key, value });
          }
        });
        return node;
      },
    },
    labelEllipsis: {
      getValue: (params) => {
        const { node, key } = params;
        const sizeList = [
          ...new Set(
            node.children
              .filter?.((child) => getFormItemControlNode(child))
              ?.map?.((child) => {
                return getAttrValue({ node: child, key }) || false;
              })
          ),
        ];
        if (node.children.length === 0) return false;
        // 表单项目数量>1且标签过长省略不一致，则返回空
        if (node.children.length > 1 && sizeList.length > 1) return '';
        return sizeList[0];
      },
      setValue: (params) => {
        const { node, key, value } = params;
        setAttrValue({ node, key, value });
        node.children.forEach((child) => {
          if (child.tag === 'u-form-item') {
            setAttrValue({ node: child, key, value, type: 'static' });
          }
        });
        return node;
      },
    },
  },
  /**
   * form-item 分组的字段处理函数
   */
  'form-item': {
    label: {
      getValue: (params) => {
        const { node, key } = params;
        const lebelNode = getFormItemLabelNode(node);
        if (!lebelNode) return '';
        return getAttrValue({ node: lebelNode, key: 'text' }) || '';
      },
      setValue: (params) => {
        const { node, key, value, oldValue } = params;
        const lebelNode = getFormItemLabelNode(node);
        if (lebelNode) {
          // step1: 设置实体属性上的label
          const property = getControlNodeEntityProperty(node);
          property && property.setLabel(value);
          // step2: 设置控件的label
          return setAttrValue({ node: lebelNode, key: 'text', value });
        } else {
          eventBus.emit('logError', { message: '表单项的标题节点不存在' });
        }
      },
    },
    // 列数
    span: {
      getValue: (params) => {
        return getAttrValue(params) || 1;
      },
      setValue: (params) => {
        return setAttrValue(Object.assign(params, { type: 'static' }));
      },
    },
    // 标题布局
    labelLayout: {
      getValue: (params) => {
        return getAttrValue(params) || 'inline';
      },
      setValue: (params) => {
        return setAttrValue(params);
      },
    },
    // 标题宽度
    labelSize: {
      getValue: (params) => {
        return getAttrValue(params) || 'normal';
      },
      setValue: (params) => {
        return setAttrValue(params);
      },
    },
    labelEllipsis: {
      getValue: (params) => {
        return getAttrValue(params) || false;
      },
      setValue: (params) => {
        return setAttrValue(Object.assign(params, { type: 'static' }));
      },
    },
    // 显示状态
    hideField: {
      getValue: (params) => {
        return getAttrValue(params) || false;
      },
      setValue: (params) => {
        return setAttrValue(Object.assign(params, { type: 'static' }));
      },
    },
  },
  /**
   * control 分组的字段处理函数
   */
  control: {
    // input 组件
    // 占位提示
    placeholder: {
      getValue: (params) => {
        return getAttrValue(params) || '';
      },
      setValue: (params) => {
        return setAttrValue(params);
      },
    },
    // 文本类型
    type: {
      getValue: (params) => {
        return getAttrValue(params) || 'text';
      },
      setValue: (params) => {
        return setAttrValue(params);
      },
    },
    // 最大字符数
    maxlength: {
      getValue: (params) => {
        return getAttrValue(params);
      },
      setValue: (params) => {
        return setAttrValue(Object.assign(params, { type: 'static' }));
      },
    },
    // radios 组件

    // 整数输入 和 小数输入 共用
    // 最小值
    min: {
      getValue: (params) => {
        return getAttrValue(params);
      },
      setValue: (params) => {
        return setAttrValue(Object.assign(params, { type: 'static' }));
      },
    },
    // 最大值
    max: {
      getValue: (params) => {
        return getAttrValue(params);
      },
      setValue: (params) => {
        return setAttrValue(Object.assign(params, { type: 'static' }));
      },
    },
    // 隐藏按钮
    hideButtons: {
      getValue: (params) => {
        return getAttrValue(params) ?? false;
      },
      setValue: (params) => {
        return setAttrValue(Object.assign(params, { type: 'static' }));
      },
    },
    // 后缀单位
    unitValue: {
      getValue: (params) => {
        return getAttrValue(params);
      },
      setValue: (params) => {
        return setAttrValue(params);
      },
    },
    // 显示千分位
    thousandths: {
      getValue: (params) => {
        return getAttrValue(params) ?? false;
      },
      setValue: (params) => {
        return setAttrValue(Object.assign(params, { type: 'static' }));
      },
    },
    // 小数输入
    // 小数位数
    decimalLength: {
      getValue: (params) => {
        const { node, key } = params;
        return getAttrValue({ node, key: 'decimalPlacesValue' }) ?? 2;
      },
      setValue: (params) => {
        const { node, key, value } = params;
        // step1: 设置实体属性上的ruleMap
        const property = getControlNodeEntityProperty(node);
        if (property && property.typeAnnotation) {
          property.typeAnnotation.update({
            ruleMap: { scale: value },
          });
        }
        // step2: 设置控件的decimalLength属性
        setAttrValue(Object.assign(params, { type: 'static' }));
        // step3: 设置控件的decimalPlacesValue属性
        return setAttrValue(Object.assign(params, { key: 'decimalPlacesValue', type: 'static' }));
      },
    },

    // 文件上传
    // 按钮文本
    'uploader-text-btn': {
      getValue: (params) => {
        const { node } = params;
        const buttonNode = node.children.find((child) => child.tag === 'u-button');
        return getAttrValue({ key: 'text', node: buttonNode });
      },
      setValue: (params) => {
        const { node, value } = params;
        const buttonNode = node.children.find((child) => child.tag === 'u-button');
        setAttrValue({ value, key: 'text', node: buttonNode });
      },
    },
    // 按钮颜色
    'uploader-color-btn': {
      getValue: (params) => {
        const { node } = params;
        const buttonNode = node.children.find((child) => child.tag === 'u-button');
        return getAttrValue({ key: 'color', node: buttonNode });
      },
      setValue: (params) => {
        const { node, value } = params;
        const buttonNode = node.children.find((child) => child.tag === 'u-button');
        setAttrValue({ value, key: 'color', node: buttonNode });
      },
    },
    'uploader-accept': {
      getValue: (params) => {
        const { node } = params;
        return getAttrValue({ key: 'accept', node }) || '';
      },
      setValue: (params) => {
        const { node, value } = params;
        setAttrValue({ value, key: 'accept', node });
      },
    },
    'uploader-limit': {
      getValue: (params) => {
        const { node } = params;
        return getAttrValue({ key: 'limit', node });
      },
      setValue: (params) => {
        const { node, value } = params;
        setAttrValue({ value, key: 'limit', node, type: 'static' });
      },
    },
    'uploader-max-size-pc': {
      getValue: (params) => {
        const { node } = params;
        const res = getAttrValue({ key: 'maxSize', node });
        if (typeof res === 'string' && res.includes('MB')) {
          return Number(res.split('MB')[0]);
        }
      },
      setValue: (params) => {
        let { node, value } = params;
        value = value.toString() + 'MB';
        setAttrValue({ value, key: 'maxSize', node });
      },
    },
    // 地区选择
    // 筛选
    'region-filterable': {
      getValue: (params) => {
        const { node } = params;
        return getAttrValue({ key: 'filterable', node }) || false;
      },
      setValue: (params) => {
        const { node, value } = params;
        setAttrValue({ value, key: 'filterable', node, type: 'static' });
      },
    },
    // 可清空
    'region-clearable': {
      getValue: (params) => {
        const { node } = params;
        return getAttrValue({ key: 'clearable', node }) || false;
      },
      setValue: (params) => {
        const { node, value } = params;
        setAttrValue({ value, key: 'clearable', node, type: 'static' });
      },
    },
    // 只显示最后一项
    'region-show-final-value': {
      getValue: (params) => {
        const { node } = params;
        return getAttrValue({ key: 'showFinalValue', node }) || false;
      },
      setValue: (params) => {
        const { node, value } = params;
        setAttrValue({ value, key: 'showFinalValue', node, type: 'static' });
      },
    },
    // 日期选择
    // 日期类型
    picker: {
      getValue: (params) => {
        return getAttrValue(params) || 'date';
      },
      setValue: (params) => {
        return setAttrValue(params);
      },
    },
  },
  // table-view-column 分组的字段处理函数
  'table-view-column': {
    label: {
      getSelectedNode: (params) => {
        return sharedUtils.getSubFormColumnLabelNode(params.node);
      },
      getValue: (params) => {
        return getAttrValue(Object.assign(params, { key: 'text' })) || '';
      },
      setValue: (params) => {
        return setAttrValue(Object.assign(params, { key: 'text' }));
      },
    },
  },
};
