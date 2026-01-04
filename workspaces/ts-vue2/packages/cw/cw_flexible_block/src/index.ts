export * from './components';
import * as logics from './logics';

const LIBRARY_NAME = 'cw_flexible_block';
const UtilsLogics = {
  install: (Vue) => {
    Vue.prototype.$library = Vue.prototype.$library || {};
    Vue.prototype.$library[LIBRARY_NAME] = {
      ...logics,
    };
  },
};

export {
  UtilsLogics,
};
