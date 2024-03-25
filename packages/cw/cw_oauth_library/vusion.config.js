module.exports = {
    type: 'component',
    docs: {
        components: [
            {
                group: '组件',
                name: 'cw-oauth-page-embed',
                path: './components/cw-oauth-page-embed/api.yaml',
            },
            // Conponents Route List
            ,
        ],
    },
    chainWebpack: (config) => {
        if (process.env.NODE_ENV === 'development') {
            const a = config
                .externals({
                    'cloud-ui.vusion': 'ca',
                })
                .toConfig();
            console.log('🚀 ~ file: vue.config.js:7 ~ a:', a);
        }
    },
};
