import './index.scss'

console.log('我进来了。' + 'dddd')

console.log($('span').click(() => {
  window.location.href = 'home.html'
  window.open('home.html')
}))
