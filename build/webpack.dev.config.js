// 引入合并对象插件
const { merge } = require('webpack-merge')

// 引入 path 模块
const path = require('path')

// 引入打包html插件
const HtmlWebpackPlugin = require('html-webpack-plugin')

const ESLintPlugin = require('eslint-webpack-plugin')

// 引入基础配置文件
const baseWebpackConfig = require('./webpack.base.config')

const utils = require('./utils')

const devWebpackConfig = merge(baseWebpackConfig, {
  // 模式，必填项
  mode: 'development',

  // 开启持久化缓存
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename]
    }
  },

  module: {
    rules: [
      // 处理 css、less 文件
      {
        test: /\.(css|less)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              // 是否使用source-map
              sourceMap: true,
              esModule: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              // 是否使用source-map
              sourceMap: true
            }
          },
          'less-loader'
        ]
      },
    ]
  },

  output: {
    // 输出文件目录
    path: path.resolve(__dirname, '../dist'),
    // 输出文件名
    filename: 'js/[name].js'
  },

  // 源码映射
  devtool: 'eval-cheap-module-source-map',

  // 开发服务配置
  devServer: {
    // 服务器 host，默认为 localhost
    host: '0.0.0.0',
    // 服务器端口号，默认 8080
    port: 7001,
    // 静态资源属性
    static: {
      // 挂载到服务器中间件的可访问虚拟地址
      // 例如设置为 /static，在访问服务器静态文件时，就需要使用 /static 前缀
      // 相当于webpack-dev-server@3.X的 contentBasePublicPath 属性
      publicPath: './',
      // 告诉服务器从哪里提供内容
      directory: path.join(__dirname, '../public')
    },
    // 需要监听的文件，由于是多页应用，无法实现热更新，所以都只能刷新页面
    watchFiles: ['src/**/*']
  },

  // 插件
  plugins: [
    ...utils.getDevHtmls(),
    new ESLintPlugin({
      extensions: ['js', 'html']
    })
  ]
})

module.exports = devWebpackConfig
