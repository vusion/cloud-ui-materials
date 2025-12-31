module.exports = {
    devServer: {
        proxy: {
            // 将 /api 开头的请求代理到 http://localhost:3000
            '^/api': {
                target: 'http://dev.xgj1.dogfood.lcap.163yun.com/',
                changeOrigin: true
            }
        }
    }
}