module.exports = {
    chainWebpack: (config) => {
        const fontRule = config.module.rule('fonts');
        fontRule.uses.clear();
        fontRule.use('base64-inline-loader').loader('base64-inline-loader');
    },
};
