
module.exports = {
    devServer: {
        proxy: {
            "/app": {
                target: "http://m.kugou.com", // 代理跳转的目标网站
                changeOrigin: true,
                pathRewrite: { // 路径重写
                    '^/app': '', // rewrite path
                }
            },
            "/api":{
                target: "http://mobilecdn.kugou.com", // 代理跳转的目标网站
                changeOrigin: true
            },
            "/lyric":{
                target:"http://www.kugou.com",
                changeOrigin:true,
                pathRewrite:{
                    '^/lyric':''
                }
            }
        }
    }
}