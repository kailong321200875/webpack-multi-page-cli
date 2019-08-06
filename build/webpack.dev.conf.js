'use strict'

const path = require('path')
const ip = require('ip')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.conf')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')

const server = {
  // 开发服务器配置
  port: 20000,
  https: false,
  proxy: {
    // 配置跨域代理
//     '/api': {
//       changeOrigin: true,
//       pathRewrite: { '^/api': '/api' },
//       target: ''
//     }
  }
}

const webpackConfigDev = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].bundle.js'
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        notes: ['尊敬的程序员大大~  编译成功!ヾ(o◕∀◕)ﾉヾ'],
        messages: [
          '启动应用:',
          `- Local: ${server.https ? 'https' : 'http'}://localhost:${server.port}`,
          `- Network: ${server.https ? 'https' : 'http'}://${ip.address()}:${server.port}`,
        ]
      }
    })
  ],
  devServer: Object.assign(server, {
    contentBase: path.join(__dirname, '../src/views/index'),
    publicPath: '/',
    host: ip.address(),
    open: false,
    noInfo: true, // 隐藏输出
    quiet: true, // 清空控制台输出
    inline: true, // 浏览器刷新
    overlay: {
      errors: true,
      warnings: true
    }
  })
}

module.exports = merge(webpackConfigBase, webpackConfigDev)
