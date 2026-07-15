import Vue from 'vue';
import * as Components from '@/index';

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
