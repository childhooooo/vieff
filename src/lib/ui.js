const path = require('path')
const {Tray, Menu, BrowserWindow, Notification} = require('electron')
import {dirname} from './dirname.js'
import Task from './task.js'

function createMain(store, width, height) {
  openMain(store, width, height)
  store.state.main.hide()
}

function openMain(store, width, height) {
  if(store.state.main) {
    store.state.main.show()
    return
  }

  store.mutations.setUi('main', new BrowserWindow({
    width: width,
    height: height,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true
    }
  }))

  store.state.main.loadFile(path.join(dirname, 'index.html'))

  if (process.env['NODE_ENV'] !== 'production') {
    store.state.main.webContents.openDevTools({ mode: 'detach' })
  }

  store.state.main.on('closed', function() {
    store.mutations.setUi('main', null)
  });

  store.state.main.on('focus', function() {
    store.state.main.webContents.send('focus')
  });
}

function openPreference(store, width, height) {
  if(store.state.window) {
    store.state.window.show()
    return
  }

  store.mutations.setUi('window', new BrowserWindow({
    width: width,
    height: height,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true,
    }
  }))

  store.state.window.loadFile(path.join(dirname, 'preference.html'))

  store.state.window.on('closed', function() {
    store.mutations.setUi('window', null)
  });

  if (process.env['NODE_ENV'] !== 'production') {
    store.state.window.webContents.openDevTools({ mode: 'detach' });
  }
}

function createTray(store) {
  store.mutations.setUi('tray', new Tray(path.join(dirname, 'assets/img/vieff.png')))
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Complete', accelerator: 'CmdOrCtrl+S', click() { store.mutations.pushEvent('complete') } },
    { label: 'Pause', accelerator: 'CmdOrCtrl+W', click() { store.mutations.pushEvent('pause') }},
    { label: 'Unpause', accelerator: 'CmdOrCtrl+Q', click() { store.mutations.pushEvent('unpause') }},
    { label: 'Extend', accelerator: 'CmdOrCtrl+A', click() { store.mutations.pushEvent('extend')} },
    { type: 'separator' },
    { label: 'Editor', accelerator: 'CmdOrCtrl+E', click() { openMain(store, 400, 600) } },
    { label: 'Preference', accelerator: 'CmdOrCtrl+,', click() { openPreference(store, 300, 120) } },
    { role: 'quit', label: 'Quit' }
  ])
  store.state.tray.setContextMenu(contextMenu)
}

function createNotification(store) {
  store.mutations.setUi('notification', new Notification({
    title: 'Vieff',
    body: "Time's up!\nClick here to complete."
  }))
  store.state.notification.on('click', () => {
    store.mutations.pushEvent('complete')
  })
}

export default {
  openPreference,
  createMain,
  openMain,
  createTray,
  createNotification
}
