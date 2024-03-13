module.exports = {
    chainWebpack: (config) => {
        const fontRule = config.module.rule('fonts');
        fontRule.uses.clear();
        fontRule.test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/)
        .use('url-loader')
          .loader('url-loader')
          .options({
            limit: 10000, // 将小于10kb的字体文件转换成base64编码
            name: 'fonts/[name].[hash:7].[ext]'
          })
          .end();
    },
};
