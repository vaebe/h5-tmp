const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.entry.app = ['babel-polyfill', './src/main.js']
  }
})
