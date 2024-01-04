const path = require("path");
module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule("images")
      .use("url-loader")
      .loader(require.resolve("url-loader"))
      .tap((options) =>
        Object.assign(options, {
          limit: 20000,
        })
      );
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            // 在这里设置你的主题变量
            'primary-color': '#1DA57A',
            'link-color': '#1DA57A',
            'border-radius-base': '2px',
            // ...其他变量
          },
          javascriptEnabled: true,
        },
      },
    },
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.css$/,
          exclude: /node_modules\/vue-cli-plugin-vusion/,
          use: ["lcap-css-loader"],
        },
        {
          test: /\.vue$/,
          include: /components/,
          exclude: /node_modules/,
          use: ["lcap-template-loader"],
        },
      ],
    },
  },
};
