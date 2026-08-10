import type { NaslComponentPluginOptions } from '@lcap/vue2-utils';
import styles from './form-field.module.css';

export const useFormFieldClass: NaslComponentPluginOptions = {
  setup(props) {
    return {
      class: props.useComputed(['class', 'range', 'autoWidth'], (className, range = false, autoWidth = false) => {
        const list = className ? className.split(' ') : [];
        list.push(range ? styles.formRangeFieldInput : styles.formFieldInput);

        if (autoWidth) {
          list.push(styles.autoWidth);
        }
        return list.join(' ');
      }),
    };
  },
  order: 10,
};
