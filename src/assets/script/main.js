import '../stylus/app.styl'

const {remote, shell, ipcRenderer} = require('electron')
const fs = require('fs')
const path = require('path')

const configFile = path.join(remote.app.getPath('home'), process.env.CONFIG_DIR, process.env.CONFIG_FILE)
fs.readFile(configFile, (error, data) => {
  setConfig(JSON.parse(data))
})

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

function setConfig(config) {
  document.getElementById('shortcut').value = config.shortcut
  document.getElementById('dir').value = config.dir
  ipcRenderer.send('changeConfig', {name: 'shortcut', value: config.shortcut})
  ipcRenderer.send('changeConfig', {name: 'dir', value: config.dir})
}

document.addEventListener('DOMContentLoaded', () => {
console.log('loaded')
  const neovim_element = document.getElementById('neovim');
  if(neovim_element) initNeovim(neovim_element)
})

function initNeovim(neovim_element) {
  const editor = neovim_element.editor;
  editor.on('error', function(err){ alert(err.message); });
  editor.on('process-attached', function() {
    if (remote.process.argv.length > 2) {
      // It is better to use 'argv' property of <neovim-editor>.
      editor.setArgv(remote.process.argv.slice(2));
    }
    neovim_element.addEventListener('drop', function(e) {
      e.preventDefault();
      const f = e.dataTransfer.files[0];
      if (f) {
        editor.getClient().command('e! ' + f.path);  // 'path' member is Electron extension
      }
    });
  });
  editor.on('quit', () => remote.app.quit());
  editor.store.on('beep', () => shell.beep());
  editor.store.on('title-changed', () => {
    document.title = editor.store.title;
  });
  editor.store.on('icon-changed', () => {
    var icon = editor.store.icon_path;
    if (icon === '') {
      return;
    }
    if (process.platform === 'darwin') {
      remote.getCurrentWindow().setRepresentedFilename(icon);
    }
  });
  neovim_element.addEventListener('dragover', e => e.preventDefault());
}
