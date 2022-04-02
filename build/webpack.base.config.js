// 引入 path 模块
const path = require('path')

// 判断当前环境是否是生产环境
const isProduction = process.env.NODE_ENV === 'production'

// 样式单独分离到一个文件中
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  // 模块resolve的规则
  // resolve: {
  //   //自动的扩展后缀，比如一个js文件，则引用时书写可不要写.js
  //   extensions: ['.js', '.json', '.css', '.less'],
  //   // 路径别名
  //   alias: {
  //     '@': path.resolve(__dirname, '../src')
  //   }
  // },

  // context 是 webpack entry 的上下文，是入口文件所处的目录的绝对路径，默认情况下是当前根目录。
  // 由于我们 webpack 配置文件放于 build 目录下，所以需要重新设置下 context ，使其指向根目录。
  context: path.resolve(__dirname, '../'),

  // 不同类型模块的处理规则
  module: {
    rules: [
      // 处理 css、less 文件
      {
        test: /\.(css|less)$/,
        use: [
          isProduction ? {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 这个是关键，为了能让html和css中的图片能同时显示出来
              publicPath: '../'
            }
          } : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              // 是否使用source-map
              sourceMap: !isProduction
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              // 是否使用source-map
              sourceMap: !isProduction
            }
          },
          'less-loader'
        ]
      },
      // 对图片资源文件进行处理，webpack5已经废弃了url-loader，改为type
      // {
      //   test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      //   type: 'asset',
      //   exclude: [path.resolve(__dirname, '../src/assets/imgs')],
      //   exclude: [path.resolve(__dirname, '../public')],
      //   generator: {
      //     filename: '../img/[name].[contenthash:7].[ext]'
      //   }
      // },
    ]
  }
}
