import '../stylus/app.styl'

const neovim_element = document.getElementById('neovim');
const editor = neovim_element.editor;
const electron = require('electron');
const remote = electron.remote;
const shell = electron.shell;
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
