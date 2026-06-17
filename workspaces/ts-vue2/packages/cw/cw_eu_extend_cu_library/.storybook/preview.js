import 'virtual-lcap:lcap-ui.css';
import Vue from 'vue';
import * as Components from '@/index';
import * as LcapUI from 'virtual-lcap:lcap-ui';

// Storybook 环境下未必注入 i18n；lcap-ui 内部组件会在 render 中访问 `$i18n`
if (!Vue.prototype.$i18n) {
  const fallbackI18n = (key) => key;
  fallbackI18n.t = (key) => key;
  Vue.prototype.$i18n = fallbackI18n;
}
Vue.use(LcapUI);

Object.keys(Components).forEach((key) => {
  if (Components[key] && Components[key].name) {
    Vue.component(Components[key].name, Components[key]);
  } else if (Components[key] && typeof Components[key].install === 'function') {
    Vue.use(Components[key]);
  }
});

const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
