const {Tray, Menu, BrowserWindow, Notification} = require('electron')

function openPreference(store) {
  if(store.state.window) {
    store.state.window.show()
    return
  }

  store.mutations.setUi('window', new BrowserWindow({
    width: 300,
    height: 120,
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true,
    },
  }))

  store.state.window.loadFile('dist/index.html');

  store.state.window.on('closed', function() {
    store.mutations.setUi('window', null)
  });

  if (process.env['NODE_ENV'] !== 'production') {
    store.state.window.webContents.openDevTools({ mode: 'detach' });
  }
}

function createTray(store) {
  store.mutations.setUi('tray', new Tray(__dirname + '/assets/img/icon.png'))
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Done', accelerator: 'CmdOrCtrl+D', click() {} },
    { label: 'Pause', accelerator: 'CmdOrCtrl+P', click() { store.mutations.pushEvent('pause') }},
    { label: 'Unpause', accelerator: 'CmdOrCtrl+U', click() { store.mutations.pushEvent('unpause') }},
    { label: 'Extend', accelerator: 'CmdOrCtrl+E', click() { store.mutations.pushEvent('extend')} },
    { type: 'separator' },
    { label: 'Preference', accelerator: 'CmdOrCtrl+,', click() { openPreference(store) } },
    { role: 'quit', accelerator: 'CmdOrCtrl+Q', label: 'Quit' }
  ])
  store.state.tray.setContextMenu(contextMenu)
}

function createNotification(store) {
  store.mutations.setUi('notification', new Notification({
    title: 'Vim Effortless',
    body: "Time's up!"
  }))
}

export default {
  openPreference,
  createTray,
  createNotification
}
