const fs = require('fs')
const path = require('path')
const {ipcRenderer} = require('electron')
const CodeMirror = require('codemirror/lib/codemirror')
require('codemirror/keymap/vim.js')
require('codemirror/addon/dialog/dialog.js')
require('codemirror/addon/search/search.js')
require('codemirror/addon/edit/matchbrackets.js')

export default function(fromFile) {
  const textarea = document.getElementById('editor')
  if(textarea) {
    const editor = CodeMirror.fromTextArea(textarea, {
      keyMap: 'vim',
      theme: 'zenburn',
      showCursorWhenSelecting: true,
      inputStyle: 'contenteditable'
    })

    CodeMirror.commands.save = () => {
      ipcRenderer.send('write', editor.getValue())
    }

    ipcRenderer.on('done', (event, lineNumber) => {
      editor.getDoc().replaceRange('# ', {line: lineNumber, ch: 0})
      ipcRenderer.send('write', editor.getValue())
    })

    ipcRenderer.on('focus', (event) => {
      editor.focus()
    })

    editor.getDoc().setValue(fromFile)
    editor.focus()
  }
}
