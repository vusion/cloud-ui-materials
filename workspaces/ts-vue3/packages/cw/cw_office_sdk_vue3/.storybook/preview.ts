import { type Preview, setup } from '@storybook/vue3';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './vars.css';

import UI from '../src/index';

setup((app) => {
  app.use(ElementPlus);
  app.use(UI);
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
