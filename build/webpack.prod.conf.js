'use strict'

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const rm = require('rimraf')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const webpackConfigBase = require('./webpack.base.conf')

//删除dist目录
rm(path.resolve(__dirname, '../dist'), err => {
  if(err) throw err
})

const webpackConfigProd = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name].[hash].js',
    publicPath: '../'
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new UglifyJSPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
          drop_debugger: false,
          drop_console: true
        }
      }
    })
  ]
}

if (process.env.npm_config_report) {
  // 打包后模块大小分析  npm run build --report
	const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
	webpackConfigProd.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = merge(webpackConfigBase, webpackConfigProd)
