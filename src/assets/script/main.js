import '../stylus/app.styl'

const {remote, ipcRenderer} = require('electron')
const fs = require('fs')
const path = require('path')

const configFile = path.join(remote.app.getPath('home'), process.env.CONFIG_DIR, process.env.CONFIG_FILE)
fs.readFile(configFile, (error, data) => {
  setConfig(JSON.parse(data))
})

const config = document.querySelectorAll('.config')
config.forEach((c) => {
  c.addEventListener('input', (e) => {
    ipcRenderer.send('changeConfig', {name: e.target.id, value: e.target.value})
  })
})

const defaultButton = document.getElementById('default')
const defaultConfig = {
  shortcut: '',
  dir: path.join(remote.app.getPath('home'), process.env.CONFIG_DIR)
}
defaultButton.addEventListener('click', () => {
  setConfig(defaultConfig)
})

function setConfig(config) {
  document.getElementById('shortcut').value = config.shortcut
  document.getElementById('dir').value = config.dir
  ipcRenderer.send('changeConfig', {name: 'shortcut', value: config.shortcut})
  ipcRenderer.send('changeConfig', {name: 'dir', value: config.dir})
}
