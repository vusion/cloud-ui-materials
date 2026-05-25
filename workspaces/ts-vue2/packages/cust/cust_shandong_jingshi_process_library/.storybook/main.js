const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        docs: false, // 禁用文档功能以避免 vue-docgen 解析错误
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
    autodocs: false, // 禁用自动文档生成以避免 vue-docgen 解析错误
  },
  // 配置 Vite 来排除有问题的文件
  viteFinal: async (config) => {
    // 过滤掉 vue-docgen 相关插件以避免解析错误
    if (config.plugins) {
      config.plugins = config.plugins.filter(
        (plugin) => {
          if (!plugin) return true;
          const pluginName = plugin.name || (plugin.constructor && plugin.constructor.name) || '';
          return !pluginName.includes('vue-docgen') && !pluginName.includes('docgen');
        }
      );
    }
    return config;
  },
};
export default config;
