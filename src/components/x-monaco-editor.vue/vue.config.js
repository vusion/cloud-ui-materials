module.exports = {
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /\.(js)$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            plugins: [
                                '@babel/plugin-proposal-optional-chaining',
                                '@babel/plugin-proposal-class-properties'
                            ]
                        }
                    },
                }
            ]
        }
    }
}