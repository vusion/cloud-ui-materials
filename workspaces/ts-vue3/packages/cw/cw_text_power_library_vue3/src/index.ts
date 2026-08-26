import { type Component, type Plugin } from 'vue';
import VueViewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';
import * as Components from './components';

export * from './components';
export * from './logics';

export const install: Plugin = (app) => {
  app.use(VueViewer);
  Object.keys(Components).forEach((name) => {
    app.component(name, (Components as Record<string, Component>)[name]);
  });
};

export default {
  install,
} as Plugin;
