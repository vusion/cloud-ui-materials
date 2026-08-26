import type { StorybookConfig } from '@storybook/vue3-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {
      builder: {
        viteConfigPath: './vite.config.mjs',
      },
    },
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      optimizeDeps: {
        include: [...(config.optimizeDeps?.include ?? []), 'xss'],
      },
    });
  },
};
export default config;
