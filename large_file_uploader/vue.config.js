const path = require('path');

module.exports = {
  configureWebpack: {
    module: {
      rules: [
        // 处理文件资源
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'file-loader',
          options: {
            esModule: true,
            name: 'assets/[name].[hash:8].[ext]'
          }
        }
      ]
    }
  }
};