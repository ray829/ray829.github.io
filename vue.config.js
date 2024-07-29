const { defineConfig } = require('@vue/cli-service');
// const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  assetsDir: 'assets',
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        args[0].title = "SoulLove's Blog";
        return args;
      })
    config.module.rule('md').test(/\.md$/)
      .use('html-loader')
      .loader('html-loader')
      .end()
  },
})

