import Vue from 'vue';
import Antd from 'ant-design-vue';
import moment from 'moment';
import 'moment/locale/zh-cn';
// 安装 Ant Design Vue 插件
Vue.use(Antd);
// 把被Antd覆盖掉的pc-ui中的方法，再覆盖回去
const Modal = window.LcapUI?.UModalReal
if (Modal) {
  Modal.install(Vue, 'UModalReal')
}

import 'ant-design-vue/dist/antd.css';
import '@/styles/index.css';
// COMPONENT IMPORTS
export {
  // COMPONENT EXPORTS
};
export { default as CwAntdCustomView } from './cw-antd-custom-view';
export { default as CwAntdInput } from './cw-antd-input';
export { default as CwAntdTextarea } from './cw-antd-textarea';
export { default as CwAntdAutoComplete } from './cw-antd-auto-complete';
export { default as CwAntdCascader } from './cw-antd-cascader';
export { default as CwAntdCheckbox } from './cw-antd-checkbox';
export { default as CwAntdCheckboxImg } from './cw-antd-checkbox-img';
export { default as CwAntdCheckboxWithInput } from './cw-antd-checkbox-with-input';
export { default as CwAntdCustomRenderView } from './cw-antd-custom-render-view';
export { default as CwAntdCustomTable } from './cw-antd-custom-table';
export { default as CwAntdDatePicker } from './cw-antd-date-picker';
export { default as CwAntdImage } from './cw-antd-image';
export { default as CwAntdInputNumber } from './cw-antd-input-number';
export { default as CwAntdRadio } from './cw-antd-radio';
export { default as CwAntdRadioImg } from './cw-antd-radio-img';
export { default as CwAntdRangePicker } from './cw-antd-range-picker';
export { default as CwAntdSelect } from './cw-antd-select';
export { default as CwAntdSwitch } from './cw-antd-switch';
export { default as CwAntdText } from './cw-antd-text';
export { default as CwAntdTimePicker } from './cw-antd-time-picker';
export { default as CwAntdUpload } from './cw-antd-upload';
export { default as CwGxInputView } from './cw-gx-input-view';
const el = document.createElement('div');
el.setAttribute('id', 'cw_dynamic_form_library');
el.classList.add('cw_dynamic_form_library');
document.body.appendChild(el);
// window.message.config({
// 	getContainer:el
// })
moment.locale('zh-cn');
export { default as CwAntdGrid } from './cw-antd-grid';
export { default as DragableDesigner } from './dragable-designer';
