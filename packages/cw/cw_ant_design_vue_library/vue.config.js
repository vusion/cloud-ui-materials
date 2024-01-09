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
        modifyVars: {
          hack: `true; @import "${path.resolve(__dirname, 'styles/theme.less')}";`
        },
        javascriptEnabled: true
      }
    }
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
          test: /\.less$/,
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
