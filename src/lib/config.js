const {app} = require('electron')
const path = require('path')
const fs = require('fs')

function init(store) {
  const configDir = path.join(app.getPath('home'), process.env.CONFIG_DIR)
  if(!fs.existsSync(configDir)) make()
  const data = fs.readFileSync(path.join(configDir, process.env.CONFIG_FILE))
  const config = JSON.parse(data)
  store.mutations.setConfig('shortcut', config.shortcut)
  store.mutations.setConfig('dir', config.dir)
}

function make() {
  const configDir = path.join(app.getPath('home'), process.env.CONFIG_DIR)
  fs.mkdirSync(configDir)
  const defaultConfig = {
    shortcut: '',
    folder: configDir
  }
  fs.writeFileSync(path.join(configDir, process.env.CONFIG_FILE), JSON.stringify(defaultConfig, null, 4))
}

function write(store) {
  const config = {
    shortcut: store.state.shortcut,
    dir: store.state.dir
  }
  fs.writeFile(path.join(app.getPath('home'), process.env.CONFIG_DIR, 'config.json'), JSON.stringify(config, null, 4), () => {})
}

export default {
  init,
  write
}
