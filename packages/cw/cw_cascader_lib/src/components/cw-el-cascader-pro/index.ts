import { extendComponent, ElCascaderPro } from 'virtual-lcap:lcap-ui';
import ExtendElCascaderPro from './index.vue';

export const CwElCascaderPro = extendComponent(ElCascaderPro, ExtendElCascaderPro);
// export const CwElFormCascaderPro = WithFormItem(CwElCascaderPro, { name: 'cw-el-form-cascader-pro', methodNames: ['reload'] });
export default CwElCascaderPro;

