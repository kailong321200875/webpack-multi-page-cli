'use strict'

const path = require('path')
const webpack = require('webpack')
const glob = require('glob')
// 消除冗余的css
const PurifyCssWebpack = require('purifycss-webpack')
// html模板
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const rules = require('./webpack.rules.conf')

// 获取html-webpack-plugin参数的方法
function getHtmlConfig(name, chunks) {
  return {
    template: `./src/views/${name}/index.html`,
    filename: process.env.NODE_ENV === 'development'
      ? `${name.slice(name.lastIndexOf('/') + 1)}.html`
      : `html/${name.slice(name.lastIndexOf('/') + 1)}.html`,
    inject: true,
    hash: false,
    chunks: chunks,
    minify: process.env.NODE_ENV === 'development'
      ? false
      : {
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 折叠空白区域 也就是压缩代码
        removeAttributeQuotes: true // 去除属性引用
      }
  }
}

function getEntry() {
  let entry = {}
  glob.sync('./src/views/**/*.js')
    .forEach((name) => {
      const start = name.indexOf('src/') + 4
      const end = name.length - 3
      const eArr = []
      let n = name.slice(start, end)
      n = n.slice(0, n.lastIndexOf('/'))
      n = n.split('views/')[1]
      eArr.push(name)
      entry[n] = eArr
    })
  return entry
}

module.exports = {
  entry: getEntry(),
  module: {
    rules: [...rules]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  // 提取公共代码
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10
        },
        jquery: {
          name: 'jquery',
          priority: 20,
          chunks: 'all',
          test: /[\\/]node_modules[\\/]_?jquery(.*)/
        },
        common: {
          chunks: 'all',
          name: 'common',
          test: /[\\/]src[\\/]_?common(.*)/,
          minChunks: 3,
          priority: 5
        }
      }
    }
  },
  node: {
    // 阻止 webpack 注入无用的 setImmediate polyfill.
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    dgram: 'empty',
    setImmediate: false,
    child_process: 'empty'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      jquery: 'jquery',
      'window.jQuery': 'jquery'
    }),
    // 消除冗余的css代码
    new PurifyCssWebpack({
      paths: glob.sync(path.join(__dirname, '../src/views/*/*.html'))
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash].css',
      chunkFilename: '[id].[hash].css'
    })
  ]
}

// 配置页面
const entryObj = getEntry()
const htmlArray = []
Object.keys(entryObj).forEach(element => {
  htmlArray.push({
    _html: element,
    title: '',
    chunks: ['vendor', 'jquery', 'common', element]
  })
})

//自动生成html模板
htmlArray.forEach(element => {
  module.exports.plugins.push(new HtmlWebpackPlugin(getHtmlConfig(element._html, element.chunks)))
})
