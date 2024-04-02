const webpack = require('webpack');

module.exports = {
    chainWebpack: (config) => {
        config.module
            .rule('images')
            .use('url-loader')
            .loader(require.resolve('url-loader'))
            .tap((options) =>
                Object.assign(options, {
                    limit: 200000,
                })
            );
        if (process.env.NODE_ENV === 'development') {
            config.plugin('injectDevEnv').use(webpack.DefinePlugin, [
                {
                    'process.vusionDevEnv': JSON.stringify(process.env),
                },
            ]);
        }
    },
};
