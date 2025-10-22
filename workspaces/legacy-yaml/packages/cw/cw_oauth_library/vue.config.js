const webpack = require('webpack');

module.exports = {
    chainWebpack: (config) => {
        if (process.env.NODE_ENV === 'development') {
            config.plugin('injectDevEnv').use(webpack.DefinePlugin, [
                {
                    'process.vusionDevEnv': JSON.stringify(process.env),
                },
            ]);
        }
    },
};
