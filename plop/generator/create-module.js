// 首字母转大写
const toUpperCase = (str) => str.charAt(0).toUpperCase() + str.slice(1)

module.exports = function (plop) {
  plop.setGenerator('createModule', {
    // 提示
    description: '创建一个模块',
    // 选项步骤
    prompts: [
      {
        type: 'input',
        name: 'moduleName',
        message: '请输入模块名称'
      }
    ],
    actions: function (data) {
      // data 可以拿到所有 prompts 中的 name 字段，也就是所有步骤所输入或选择的参数
      const { moduleName } = data

      // 首字母大写
      const upperFirstName = toUpperCase(moduleName)

      const actions = []

      if (moduleName) {
        actions.push(
          {
            // 类型新增
            type: 'add',
            // 存放路径
            path: `../../src/views/${moduleName}/${moduleName}.html`,
            // 使用哪个模版
            templateFile: '../template/create-module-html.hbs',
            // 可以传递参数
            data: {
              moduleName,
              upperFirstName
            }
          },
          {
            // 类型新增
            type: 'add',
            // 存放路径
            path: `../../src/views/${moduleName}/${moduleName}.js`,
            // 使用哪个模版
            templateFile: '../template/create-module-js.hbs',
            // 可以传递参数
            data: {
              moduleName
            }
          },
          {
            // 类型新增
            type: 'add',
            // 存放路径
            path: `../../src/views/${moduleName}/${moduleName}.less`,
            // 使用哪个模版
            templateFile: '../template/create-module-less.hbs'
          }
        )
      }
      return actions
    }
  })
}
