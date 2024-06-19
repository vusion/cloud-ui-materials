
const path = require('path')
module.exports = {

  devServer: {
    proxy: {
      // 将 /api 开头的请求代理到 http://localhost:3000
      '^/upload': {
        target: 'http://dev.xgj.dogfood.lcap.163yun.com',
        changeOrigin: true
      }
    }
  },
  // transpileDependencies: true,
  // publicPath: './',
  // filenameHashing: false,
  // lintOnSave: false,
  // chainWebpack: config => {
  //   config
  //     .plugin('webpack-bundle-analyzer')
  //     .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
  // },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg');

    svgRule.uses.clear();

    svgRule.use('vue-svg-loader').loader('vue-svg-loader');
  },
  configureWebpack: {
    // optimization: {
    //   splitChunks: {
    //     chunks: 'all',
    //     cacheGroups: {
    //       defaultVendors: false,
    //       default: false
    //     }
    //   }
    // },
    module: {
      rules: [
        {
          test: /\.(less|css)$/,
          exclude: /node_modules\/vue-cli-plugin-vusion/,
          use: {
            loader: path.resolve(__dirname, 'loaders/my-css-loader'),
            options: {
              excludesNameSpace: ['.pswp'],
            },
          },
        },
        {
          test: /\.vue$/,
          include: /components/,
          exclude: /node_modules/,
            use: [
              'cache-loader',
              path.resolve(__dirname, 'loaders/my-vue-loader')
            ],
        }
      ]
      // rules: process.env.NODE_ENV === 'production' ? [
      //   {
      //     test: /\.(less|css)$/,
      //     exclude: /node_modules\/vue-cli-plugin-vusion/,
      //     use: [path.resolve(__dirname, 'loaders/my-css-loader')]
      //   },
      //   {
      //     test: /\.vue$/,
      //     include: /components/,
      //     exclude: /node_modules/,
      //       use: [
      //         'cache-loader',
      //         path.resolve(__dirname, 'loaders/my-vue-loader')
      //       ],
      //   }
      // ]:[]
    },
  },
 
    css: {
      // extract: false,
      // loaderOptions: {
      //   less: {
      //     lessOptions: {
      //       // If you are using less-loader@5 please spread the lessOptions to options directly
      //       // modifyVars: {
      //       //   'primary-color': '#1DA57A',
      //       //   'link-color': '#1DA57A',
      //       //   'border-radius-base': '2px',
      //       // },
      //       javascriptEnabled: true,
      //     },
      //   },
      // },
    }

}
