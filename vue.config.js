module.exports = {
    lintOnSave: false,
    devServer: {
        open: process.platform === 'vue',
        // host: '127.0.0.1',
        // port: 8080,
        // https: false,
        // hotOnly: false,
        proxy: { // 设置代理
            '/wllxApi': {
                target: 'http://47.97.74.226:8080/',
                changeOrigin: true,
                pathRewrite: {
                    '^/wllxApi': ''
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