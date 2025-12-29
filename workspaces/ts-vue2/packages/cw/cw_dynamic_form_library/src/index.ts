import * as Components from './components';
import * as logics from './logics';
// import Vue from 'vue';
// import Antd from 'ant-design-vue';
// import moment from 'moment';
// import 'moment/locale/zh-cn';

// // 安装 Ant Design Vue 插件
// Vue.use(Antd);
// import 'ant-design-vue/dist/antd.css';

// import '@/styles/index.css';

const LIBRARY_NAME = 'cw_dynamic_form_library';
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
      Vue.component(name, Components[name]);
    });
  },
};

export { UseComponents, UtilsLogics };


// const el = document.createElement('div');
// el.setAttribute('id', 'cw_dynamic_form_library');
// el.classList.add('cw_dynamic_form_library');
// document.body.appendChild(el);
// // window.message.config({
// // 	getContainer:el
// // })

// moment.locale('zh-cn');
