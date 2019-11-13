const {Tray, Menu, BrowserWindow, Notification} = require('electron')
//const path = require('path')

function createMain(store, width, height) {
  store.mutations.setUi('main', new BrowserWindow({
    width: width,
    height: height,
    useContentSize: true,
    webPreferences: {
      blinkFeatures: 'KeyboardEventKey,Accelerated2dCanvas,Canvas2dFixedRenderingMode',
      nodeIntegration: true
    }
  }))

  store.state.main.loadFile('dist/index.html');
  //store.state.main.loadURL('file://' + path.join(__dirname, 'index.html'));

  store.state.main.on('closed', function() {
    store.mutations.setUi('main', null)
  });

  if (process.env['NODE_ENV'] !== 'production') {
    store.state.main.webContents.openDevTools({ mode: 'detach' });
  }
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

  store.state.window.loadFile('dist/preference.html');

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
    { label: 'Preference', accelerator: 'CmdOrCtrl+,', click() { openPreference(store, 300, 120) } },
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
  createMain,
  createNotification
}
