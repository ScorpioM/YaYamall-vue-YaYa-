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
                target: 'http://192.168.0.123:8080/api/education/',
                changeOrigin: true,
                pathRewrite: {
                    '^/requestApi': 'http://192.168.0.123:8080/api/education/'
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