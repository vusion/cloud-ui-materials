import * as Components from './components';
import * as logics from './logics';

const LIBRARY_NAME = 'cw_ex_h_5_steps';
const UtilsLogics = {
  install: (Vue) => {
    Vue.prototype.$library = Vue.prototype.$library || {};
    Vue.prototype.$library[LIBRARY_NAME] = {
      ...logics,
    };
  },
};

const UseComponents = {
  install: (Vue) => {
    Object.keys(Components).forEach((name) => {
      if (Components[name].Component && Components[name].install) {
        Vue.component(name, Components[name].Component);
        return;
      }
      Vue.component(name, Components[name])
    })
  }
};

export {
  UseComponents,
  UtilsLogics,
};
