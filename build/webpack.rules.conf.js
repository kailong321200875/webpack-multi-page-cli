'use strict'

const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const rules = [
  {
    test: /\.(css|scss|sass)$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      {
        // css分离写法
        loader: 'postcss-loader',
        options: {
          publicPath: '../',
          plugins: [
            require('autoprefixer')(),
            require('../postcss.config')
          ]
        }
      },
      'sass-loader',
      {
        loader: 'sass-resources-loader',
        options: {
          resources: [
            path.resolve(__dirname, '../src/styles/variables.scss'),
            path.resolve(__dirname, '../src/styles/reset.css')
          ]
        }
      }
    ]
  },
  {
    test: /\.js$/,
    use: [
      {
        loader: 'babel-loader'
      },
      {
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
          formatter: require('eslint-friendly-formatter')
        }
      }
    ],
    enforce: 'pre',
    exclude: /node_modules/,
    include: [path.resolve(__dirname, 'src')]
  },
  {
    test: /\.(png|jpe?g|gif|svg|icon)(\?.*)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 5 * 1024,
          publicPath: '../imgs',
          outputPath: 'imgs'
        }
      }
    ]
  },
  {
    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 5 * 1024,
          publicPath: '../medias',
          outputPath: 'medias'
        }
      }
    ]
  },
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 5 * 1024,
          publicPath: '../fonts',
          outputPath: 'fonts'
        }
      }
    ]
  },
  {
    test: /\.html$/,
    use: {
      loader: 'html-loader',
      options: {
        attrs: ['img:src', 'img:data-src', 'audio:src', 'video:src', 'source:src'],
        minimize: true
      }
    }
  }
]

module.exports = rules
