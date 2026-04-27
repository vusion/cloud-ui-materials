const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@lcap/storybook-vue-vite',
    options: {
      builder: {
        viteConfigPath: './vite.config.js',
      },
    },
  },
  docs: {
    autodocs: 'tag',
  },
};
export default config;
