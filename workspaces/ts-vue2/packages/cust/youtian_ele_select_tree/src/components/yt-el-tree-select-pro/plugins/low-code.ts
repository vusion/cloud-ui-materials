/* 仅在 ide 环境生效的插件 */
import type { NaslComponentPluginOptions } from '@lcap/vue2-utils';
import { getCurrentInstance, inject, onMounted } from '@vue/composition-api';
import { TAG_NAME, FORM_TAG_NAME } from '../constants';

const IN_ELEMENT_FORM = 'IN_ELEMENT_FORM';
const IN_ELEMENT_FORM_ITEM = 'IN_ELEMENT_FORM_ITEM';

export const useFormLowcode: NaslComponentPluginOptions = {
  setup(props, { extendComponent }) {
    const inForm = inject(IN_ELEMENT_FORM, false);
    const inFormItem = inject(IN_ELEMENT_FORM_ITEM, false);
    const instance = getCurrentInstance();
    onMounted(() => {
      if (!instance || extendComponent) {
        return;
      }

      const elem = (instance.refs.$base as any)?.$el;
      if (!elem) {
        return;
      }
      const nodePath = props.get<string>('data-nodepath');
      if (nodePath) {
        elem.setAttribute('data-element-tag', inForm && !inFormItem ? FORM_TAG_NAME : TAG_NAME);
        elem.setAttribute('data-nodepath', nodePath);
        elem.setAttribute('data-has-mutation', 'true');
      }
    });
  },
  order: 10,
  onlyUseIDE: true,
};
