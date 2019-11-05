const path = require('path')
const chokidar = require('chokidar')

function watch(store) {
  file = path.join(store.state.dir, nameFromToday())
}

function nameFromToday() {
  today = Date.now()
  return today.getFullYear() + mm(today.getMonth() + 1) + today.getDate() + '.eff'
}

function mm(month) {
  return ('0' + month).slice(-2)
}
