const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        docs: false,
      },
    },
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
    autodocs: false,
  },
  viteFinal: async (config) => {
    if (config.plugins) {
      config.plugins = config.plugins.filter((plugin) => {
        if (!plugin) return true;
        const pluginName = plugin.name || (plugin.constructor && plugin.constructor.name) || '';
        return !pluginName.includes('vue-docgen') && !pluginName.includes('docgen');
      });
    }
    return config;
  },
};
export default config;
