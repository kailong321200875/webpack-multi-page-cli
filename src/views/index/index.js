import './index.less'

console.log(process.env)

const addNumber = (a, b) => {
  return a + b
}
const test = undefined

console.log(test ?? '222')
const object = {
  name: 'zhangsan'
}
console.log(object?.name)
console.log(addNumber(1, 2))
