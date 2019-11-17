import '../stylus/app.styl'

const {remote, ipcRenderer} = require('electron')
const fs = require('fs')
const path = require('path')
import initEditor from './editor.js'
import initPreference from './preference.js'

const loaded = load()
ipcRenderer.send('changeConfig', {name: 'shortcut', value: loaded.shortcut})
ipcRenderer.send('changeConfig', {name: 'dir', value: loaded.dir})
ipcRenderer.send('write', loaded.saved)

if(document.getElementById('index')) initEditor(loaded.saved)
if(document.getElementById('preference')) initPreference(loaded)

function load() {
  const configDir = path.join(remote.app.getPath('home'), process.env.CONFIG_DIR)
  const configFile = path.join(configDir, process.env.CONFIG_FILE)
  let data

  try {
    data = fs.readFileSync(configFile)
  } catch {
    data = {}
  }
  const config = JSON.parse(data)
  const shortcut = config.shortcut ? config.shortcut : ''
  const dir = config.dir ? config.dir : configDir

  const saveFile = path.join(dir, filename())
  try {
    data = fs.readFileSync(saveFile, 'utf-8')
  } catch {
    data = ''
  }
  return {
    dir,
    shortcut,
    saved: data
  }
}

function filename() {
  const today = new Date()
  const year = today.getFullYear()
  const month = ('0' + (today.getMonth() + 1)).slice(-2)
  const date = ('0' + today.getDate()).slice(-2)
  return [year, month, date].join('_') + '.txt'
}
