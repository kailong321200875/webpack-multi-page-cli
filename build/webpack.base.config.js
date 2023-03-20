// 引入 path 模块
const path = require('path')

// 判断当前环境是否是生产环境
const isProduction = process.env.NODE_ENV === 'production'

// 样式单独分离到一个文件中
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// 引入静态资源复制插件
const CopyWebpackPlugin = require('copy-webpack-plugin')
const utils = require('./utils')

const DefinePlugin = require("webpack").DefinePlugin;

const dotenv = require("dotenv");

const dotenvFile = path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`);

dotenv.config({
  path: dotenvFile,
});

module.exports = {
  // 打包入口地址
  entry: utils.getEntry(),

  // 模块resolve的规则
  resolve: {
    //自动的扩展后缀，比如一个js文件，则引用时书写可不要写.js
    extensions: ['.js', '.json', '.css', '.less'],
    // 路径别名
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },

  // 构建目标
  target: ['web', 'es5'],

  // 不同类型模块的处理规则
  module: {
    rules: [
      // 处理 css、less 文件
      {
        test: /\.(css|less)$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              // 是否使用source-map
              sourceMap: !isProduction,
              esModule: false
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
      // 解析 html 中的 src 路径
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      // 对图片资源文件进行处理，webpack5已经废弃了url-loader，改为type
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: 'asset',
        exclude: [path.resolve(__dirname, 'src/assets/imgs')],
        generator: {
          filename: 'imgs/[name].[contenthash][ext]'
        }
      },
      // 对字体资源文件进行处理，webpack5已经废弃了url-loader，改为type
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        type: 'asset',
        generator: {
          filename: 'fonts/[name].[contenthash][ext]'
        }
      },
      // 对音频资源文件进行处理，webpack5已经废弃了url-loader，改为type
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        type: 'asset',
        exclude: [path.resolve(__dirname, 'src/assets/medias')],
        generator: {
          filename: 'medias/[name].[contenthash][ext]'
        }
      },
      {
        test: /\.(m|j)s$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      }
    ]
  },

  // 插件
  plugins: [
    // 把public的一些静态文件复制到指定位置，排除 html 文件
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ['**/*.html']
          }
        }
      ]
    }),
    new DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ]
}
