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
};
