// 引入打包html插件
const HtmlWebpackPlugin = require('html-webpack-plugin')
const templates = require('../config/template.json')
const path = require('path')

function getEntry() {
  const entry = {}
  for (const item of templates) {
    entry[item.name] = `./src/views/${item.name}/${item.name}.js`
  }
  return entry
}

function getDevHtmls() {
  const templates = require('../config/template.json')
  return templates.map(item => {
    return new HtmlWebpackPlugin({
      filename: `${item.name}.html`,
      template: `./src/views/${item.name}/${item.name}.html`,
      favicon: path.resolve(__dirname, item.favicon),
      chunks: ['chunk-vendors', item.name]
    })
  })
}

function getProHtmls() {
  const templates = require('../config/template.json')
  return templates.map(item => {
    return new HtmlWebpackPlugin({
      filename: `html/${item.name}.html`,
      template: `./src/views/${item.name}/${item.name}.html`,
      favicon: path.resolve(__dirname, item.favicon),
      chunks: ['chunk-vendors', item.name]
    })
  })
}

module.exports = {
  getEntry,
  getDevHtmls,
  getProHtmls
}
