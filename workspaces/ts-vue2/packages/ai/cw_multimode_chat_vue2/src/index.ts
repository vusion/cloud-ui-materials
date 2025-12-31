import * as Components from './components';
import * as logics from './logics';
import 'ant-design-vue/lib/button/style/css'; 
import 'ant-design-vue/lib/progress/style/css';
import 'ant-design-vue/lib/icon/style/css';
import 'ant-design-vue/lib/upload/style/css';
import 'ant-design-vue/lib/input/style/css';
import 'ant-design-vue/lib/avatar/style/css';
import 'ant-design-vue/lib/tooltip/style/css';

const LIBRARY_NAME = 'cw_antd_x_vue_2';
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
