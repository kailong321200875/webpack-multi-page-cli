module.exports = {
  '*.{js}': ['eslint --fix', 'prettier --write'],
  '{!(package)*.json,*.code-snippets,.!(browserslist)*rc}': ['prettier --write--parser json'],
  'package.json': ['prettier --write'],
  '*.{scss,less,styl,css,html}': ['stylelint --fix', 'prettier --write'],
  '*.md': ['prettier --write'],
  '*.hbs': ['prettier --write']
}
