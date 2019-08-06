'use strict'

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const baseDir = path.join(__dirname, '../src/views/')
const views = process.argv.slice(2).join('')

if (!views) {
  console.log(chalk.red('请输入页面名称!  ￣へ￣'))
  return
}

const hasPage = fs.existsSync(baseDir + views)

if (hasPage) {
  console.log(chalk.red('该页面已经存在!  ⊙﹏⊙‖∣'))
  return
}

try {
  fs.mkdirSync(baseDir + views)
  console.log(chalk.green(views + '目录创建成功!  (＾－＾)V'))
} catch (e) {
  console.log(chalk.red('创建目录失败!  (┬＿┬)'), e)
}

try {
  fs.writeFileSync(baseDir + views + '/index.html',
`<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title></title>
  </head>
  <body>
  </body>
</html>
`)
  console.log(chalk.green('index.html创建成功!  (＾－＾)V'))
} catch(e) {
  console.log(chalk.red('创建index.html失败!  (┬＿┬)'))
}

try {
  fs.writeFileSync(baseDir + views + '/index.js', `import './index.scss'`)
  console.log(chalk.green('index.js创建成功!  (＾－＾)V'))
} catch(e) {
  console.log(chalk.red('创建index.js失败!  (┬＿┬)'))
}

try {
  fs.writeFileSync(baseDir + views + '/index.scss', '')
  console.log(chalk.green('index.scss创建成功!  (＾－＾)V'))
} catch(e) {
  console.log(chalk.red('创建index.scss失败!  (┬＿┬)'))
}
