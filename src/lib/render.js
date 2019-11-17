const fs = require('fs')
const path = require('path')
const chalk = require('chalk')

import Timer from './timer.js'
import Status from './status.js'
import Task from './task.js'
import Parser from './parser.js'

function update(store) {
  const title = store.state.task ? store.state.task.name + ' ' + Timer.display(store.state.count) : ''
  store.state.tray.setTitle(chalk.reset(title))

  if(store.state.status === Status.FINISH) {
    store.state.notification.show()
    store.mutations.setStatus(Status.HOLD)
  }

  if(store.state.status === Status.DONE) {
    const lineNumber = Parser.search(store.state.task, store.state.rawTasks)
    if(lineNumber >= 0) {
      store.state.main.webContents.send('done', lineNumber)
    }
    store.mutations.setStatus(Status.STANDBY)
  }
}

function writeFile(store, value) {
  const target = path.join(store.state.dir, filename())
  fs.writeFile(target, value, () => {})
}

function filename() {
  const today = new Date()
  const year = today.getFullYear()
  const month = ('0' + (today.getMonth() + 1)).slice(-2)
  const date = ('0' + today.getDate()).slice(-2)
  return [year, month, date].join('_') + '.txt'
}

export default {
  update,
  writeFile
}
