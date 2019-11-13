import store from './lib/store.js'
import Timer from './lib/timer.js'
import Event from './lib/event.js'
import Render from './lib/render.js'
import Config from './lib/config.js'
import Shortcut from './lib/shortcut.js'
import Ui from './lib/ui.js'

require('dotenv').config({ path: __dirname + '/../.env' })
const {app, Tray, Menu, BrowserWindow, ipcMain, globalShortcut} = require('electron')
const path = require('path')

Config.init(store)

app.on('ready', () => {
  Ui.createTray(store)
  Ui.createNotification(store)
  Ui.createMain(store, 400, 600)
  Shortcut.registerOpenMenu(store.state.tray, store.state.shortcut)
  Timer.up(store, [Event.update, Render.update])
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('quit', () => {
  store.state.tray.destroy()
})

ipcMain.on('changeConfig', (event, arg) => {
  if(arg.name === 'shortcut') Shortcut.registerOpenMenu(store.state.tray, arg.value)
  store.mutations.setConfig(arg.name, arg.value)
  Config.write(store)
})
