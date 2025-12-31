
const path = require('path')
module.exports = {
  chainWebpack: (config) => {
    config.module
        .rule('images')
        .use('url-loader')
        .loader(require.resolve('url-loader'))
        .tap((options) => Object.assign(options, {
            limit: 20000,
        }));
},
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.css$/,
          exclude: /node_modules\/vue-cli-plugin-vusion/,
          use: ["lcap-css-loader"]
        },
        {
          test: /\.vue$/,
          include: /components/,
          exclude: /node_modules/,
            use: [
              'lcap-template-loader'
            ],
        }
      ]
    },
  },
  devServer: {
    proxy: {
      // 将 /api 开头的请求代理到 http://localhost:3000
      '^/api': {
        target: 'http://dev.zkjs.smbu.lcap.cnpc.com.cn/',
        changeOrigin: true
      }
    }
  }
}
