import * as Components from './components';
import * as logics from './logics';
import at from 'lodash/at';

import * as CloudUI from '@lcap-ui/src/main';
import { installDirectives, installComponents } from '@lcap/vue2-utils';

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
    Vue.prototype.$t =
      Vue.prototype.$t ||
      function (key, data) {
        const message = this.$options.i18n.messages['zh-CN'][key];
        if (data) return message.replace(/{(.*?)}/g, (a, b) => data[b]);

        return message;
      };

    Vue.prototype.$at =
      Vue.prototype.$at ||
      function (obj, propertyPath) {
        if (propertyPath === undefined || propertyPath === null) {
          return undefined;
        } else return at(obj, [propertyPath])[0];
      };

    Vue.prototype.$setAt =
      Vue.prototype.$setAt ||
      function (obj, propertyPath, value) {
        const lastIndex = propertyPath.lastIndexOf('.');
        if (lastIndex === -1) return Vue.prototype.$set(obj, propertyPath, value);
        else {
          const prepath = propertyPath.slice(0, lastIndex);
          const subpath = propertyPath.slice(lastIndex + 1);
          return Vue.prototype.$set(Vue.prototype.$at(obj, prepath), subpath, value);
        }
      };

    Vue.prototype.$deleteAt =
      Vue.prototype.$setAt ||
      function (obj, propertyPath) {
        const lastIndex = propertyPath.lastIndexOf('.');
        if (lastIndex === -1) return Vue.prototype.$delete(obj, propertyPath);
        else {
          const prepath = propertyPath.slice(0, lastIndex);
          const subpath = propertyPath.slice(lastIndex + 1);
          return Vue.prototype.$delete(Vue.prototype.$at(obj, prepath), subpath);
        }
      };
    Vue.prototype.$at2 = function (obj, propertyPath) {
      if (propertyPath === '' && !this.$env.VUE_APP_DESIGNER) return obj;
      return this.$at(obj, propertyPath);
    };

    Object.keys(Components).forEach((name) => {
      if (Components[name].Component && Components[name].install) {
        Vue.component(name, Components[name].Component);
        return;
      }
      Vue.component(name, Components[name]);
    });

    installDirectives(Vue, CloudUI.directives);
    installComponents(Vue, CloudUI);

    Vue.mixin(CloudUI.MEmitter);
    Vue.mixin(CloudUI.MPubSub);
  },
};

export { UseComponents, UtilsLogics };
