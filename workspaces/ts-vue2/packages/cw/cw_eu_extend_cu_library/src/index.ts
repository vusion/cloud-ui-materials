import * as Components from './components';
import * as logics from './logics';

import * as CloudUI from '@lcap-ui/src/main';
import { installOptions, installDirectives, installComponents } from '@lcap/vue2-utils';

const LIBRARY_NAME = 'cw_eu_extend_cu_library';
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
    if (typeof window !== 'undefined') {
      Vue.prototype.$env = Vue.prototype.$env || {};
      Vue.prototype.$env.VUE_APP_DESIGNER = String(process.env.VUE_APP_DESIGNER) === 'true';
      Vue.prototype.$at2 = function (obj, propertyPath) {
        if (propertyPath === '' && !this.$env.VUE_APP_DESIGNER) return obj;
        return this.$at(obj, propertyPath);
      };
      installOptions(Vue);
      installDirectives(Vue, CloudUI.directives);
      installComponents(Vue, CloudUI);

      Vue.mixin(CloudUI.MEmitter);
      Vue.mixin(CloudUI.MPubSub);

      window.LcapUI = CloudUI;
    }

    Object.keys(Components).forEach((name) => {
      if (Components[name].Component && Components[name].install) {
        Vue.component(name, Components[name].Component);
        return;
      }
      Vue.component(name, Components[name]);
    });
  },
};

export { UseComponents, UtilsLogics };
