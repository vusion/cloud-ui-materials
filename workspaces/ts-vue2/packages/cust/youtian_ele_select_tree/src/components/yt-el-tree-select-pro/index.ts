import { TreeSelect, WithFormItem } from 'virtual-lcap:lcap-ui';
import { registerComponent } from '@lcap/vue2-utils';
import * as plugins from './plugins';
import { TAG_NAME, FORM_TAG_NAME } from './constants';

export const YtElTreeSelectPro = registerComponent(TreeSelect, plugins, {
  name: TAG_NAME,
  nativeEvents: [],
  slotNames: [],
  methodNames: [],
  model: {
    prop: 'value',
    event: 'update:value',
  },
});

export const YtElFormTreeSelectPro = WithFormItem(YtElTreeSelectPro, {
  name: FORM_TAG_NAME,
  methodNames: ['reload'],
});

export default YtElTreeSelectPro;
