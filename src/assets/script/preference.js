const {remote, ipcRenderer} = require('electron')
const fs = require('fs')
const path = require('path')

function setConfig(config) {
  document.getElementById('shortcut').value = config.shortcut
  document.getElementById('dir').value = config.dir
  ipcRenderer.send('changeConfig', {name: 'shortcut', value: config.shortcut})
  ipcRenderer.send('changeConfig', {name: 'dir', value: config.dir})
}

export default function(fromFile) {
  setConfig(fromFile)

  const config = document.querySelectorAll('.config')
  if(config.length > 0) {
    config.forEach((c) => {
      c.addEventListener('input', (e) => {
        ipcRenderer.send('changeConfig', {name: e.target.id, value: e.target.value})
      })
    })
  }

  const defaultButton = document.getElementById('default')
  const defaultConfig = {
    shortcut: '',
    dir: path.join(remote.app.getPath('home'), process.env.CONFIG_DIR)
  }
  if(defaultButton) {
    defaultButton.addEventListener('click', () => {
      setConfig(defaultConfig)
    })
  }
}
