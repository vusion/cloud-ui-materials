import { type Preview, setup } from "@storybook/vue3";

import UI from '../src/index';
setup((app) => {
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
