module.exports = {
    chainWebpack: (config) => {
        const fontRule = config.module.rule('fonts');
        fontRule.uses.clear();
        fontRule.use('base64-inline-loader').loader('base64-inline-loader');
        // config.plugin('icon-font-plugin').tap((args) => {
        //     args[0].dataURL = true;
        //     return args;
        // });
    },
};
