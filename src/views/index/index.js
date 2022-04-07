import '@/assets/fonts/iconfont.css'
import './index.css'
import './index.less'

console.log('index.js')

const fn = () => {
  console.log('箭头函数')
}

fn()

console.log({...{name: 'Archer'}})

console.log({...{name: 'Archer'}})

class Parent {
  constructor(value) {
    this.val = value
  }
  getValue() {
    console.log(this.val)
  }
}

class Child extends Parent {
  constructor(value) {
    super(value)
    this.val = value
  }
}

const child = new Child(1)
child.getValue()

console.log(child instanceof Parent)