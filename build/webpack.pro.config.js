// 引入合并对象插件
const { merge } = require('webpack-merge')

// 引入 path 模块
const path = require('path')

// 引入打包html插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 压缩css
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const TerserPlugin = require('terser-webpack-plugin')

// 引入基础配置文件
const baseWebpackConfig = require('./webpack.base.config')

const utils = require('./utils')

const proWebpackConfig = merge(baseWebpackConfig, {
  // 模式，必填项
  mode: 'production',

  output: {
    // 输出文件目录
    path: path.resolve(__dirname, '../dist'),
    // 输出文件名
    filename: 'js/[name].[contenthash].js',
    // 清空目录
    clean: true
  },

  // 源码映射
  devtool: false,

  // 插件
  plugins: [
    ...utils.getProHtmls(),

    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css'
    })
  ],

  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        terserOptions: {
          // 生产环境自动删除console
          compress: {
            drop_debugger: true,
            drop_console: true,
            pure_funcs: ['console.log']
          }
        },
        parallel: true,
        exclude: /[\\/]node_modules[\\/]/
      })
    ],
    splitChunks: {
      cacheGroups: {
        // 配置提取模块的方案
        default: false,
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 2,
          enforce: true,
          reuseExistingChunk: true
        }
      }
    }
  }
})

module.exports = proWebpackConfig
