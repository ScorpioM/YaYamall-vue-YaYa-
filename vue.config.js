module.exports = {
    lintOnSave: false,
    publicPath: "./",
    devServer: {
        open: process.platform === 'vue',
        // host: '127.0.0.1',
        // port: 8080,
        // https: false,
        // hotOnly: false,
        proxy: { // 设置代理
            '/requestApi/*': {
                target: 'http://127.0.0.1:8079/',
                changeOrigin: true,
                pathRewrite: {
                    '^/requestApi': 'http://127.0.0.1:8079/'
                }
            }
        },
        disableHostCheck: true
    },
    // 第三方插件配置
    pluginOptions: {
        // ...
    }
}