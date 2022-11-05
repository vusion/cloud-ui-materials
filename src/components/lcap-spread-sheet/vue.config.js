const path = require('path');

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                '@spread': path.resolve(__dirname, 'spreadjs/src/index.js'),
            },
        },
        devtool: 'source-map',
    },
};
