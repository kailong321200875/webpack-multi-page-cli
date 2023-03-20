const requireContext = require('require-context')
const path = require('path')
const fs = require('fs')
const os = require('os')

const template = []

function writeFile() {
  const context = requireContext(path.join(__dirname, '../../src/views/'), true, /\.html$/)
  context.keys().forEach((key) => {
    // 是否是windows系统
    const isWindows = os.platform() === 'win32'
    const newKey = !isWindows ? key : key.replace(/\\/, '/')
    const name = newKey.match(/\/([^/]+)\.html$/).filter((item) => item[1])[1]
    const templateObj = {
      name,
      entry: `./src/views/${name}/${name}.js`,
      template: `./src/views/${name}/${name}.html`,
      devFilename: `./${name}.html`,
      proFilename: `html/${name}.html`,
      favicon: '../public/favicon.ico',
      chunks: ['chunk-vendors', name]
    }
    template.push(templateObj)
  })

  fs.writeFile('./config/template.json', JSON.stringify(template), (err) => {
    if (err) {
      console.error(err)
      return
    }
    //文件写入成功。
  })
}

module.exports = writeFile
