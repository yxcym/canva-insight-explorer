const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  
  // 公共路径配置（关键修复）
  publicPath: process.env.NODE_ENV === 'production'
    ? '/canva-insight-explorer/'  // 与 GitHub 仓库名一致
    : '/',
  
  // Webpack 配置
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  },
  
  // 开发服务器配置
  devServer: {
    proxy: {
      '/api/images': {
        target: 'https://gitee.com/yxcym/images',
        changeOrigin: true,
        pathRewrite: { '^/api/images': '' }
      }
    }
  }
})  