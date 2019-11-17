import store from './lib/store.js'
import Timer from './lib/timer.js'
import Task from './lib/task.js'
import Event from './lib/event.js'
import Render from './lib/render.js'
import Config from './lib/config.js'
import Shortcut from './lib/shortcut.js'
import Ui from './lib/ui.js'
import Parser from './lib/parser.js'
import {dirname} from './lib/dirname.js'

const path = require('path')
const {app, Tray, Menu, BrowserWindow, ipcMain, globalShortcut} = require('electron')
require('dotenv').config({ path: path.join(dirname, '.env') })

Config.init(store)

app.dock.hide()

app.on('ready', () => {
  Ui.createMain(store, 400, 600)
  Ui.createTray(store)
  Ui.createNotification(store)
  Shortcut.registerOpenMenu(store.state.tray, store.state.shortcut)
  Timer.up(store, [Event.update, Task.update, Render.update])
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('changeConfig', (event, arg) => {
  if(arg.name === 'shortcut') Shortcut.registerOpenMenu(store.state.tray, arg.value)
  store.mutations.setConfig(arg.name, arg.value)
  Config.write(store)
})

ipcMain.on('write', (event, arg) => {
  const tasks = Parser.parse(arg)
  store.mutations.setTasks(arg, tasks)
  Render.writeFile(store, arg)
  Task.update(store)
})
