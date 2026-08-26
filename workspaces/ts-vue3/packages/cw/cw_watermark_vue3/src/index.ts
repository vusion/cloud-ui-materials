import { type Plugin } from 'vue';
import * as Components from './components';

export * from './components';
export * from './logics';

export const install: Plugin = (app, options) => {
  Object.keys(Components).forEach((name) => {
    app.component(name, Components[name]);
  });
};

export default {
  install,
} as Plugin;
