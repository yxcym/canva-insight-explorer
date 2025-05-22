// vue.config.js
const { defineConfig } = require('@vue/cli-service')
const path = require('path')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  },
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