const {globalShortcut} = require('electron')

const MODIFIERS = [
  'Command',
  'Cmd',
  'Control',
  'Ctrl',
  'CommandOrControl',
  'CmdOrCtrl',
  'Alt',
  'Option',
  'AltGr',
  'Shift',
  'Super'
]

function registerOpenMenu(tray, value) {
  globalShortcut.unregisterAll()
  if(isAccelerator(value)) {
    try {
      globalShortcut.register(value, () => {
        tray.popUpContextMenu()
      })
    } catch {
      console.log('invalid shortcut')
    }
  }
}

function isAccelerator(value) {
  const keys = value.split('+')
  return isModifier(keys.slice(0, -1))
}

function isModifier(keys) {
  if(keys.length < 1) return false
  if(keys.length == 1) return MODIFIERS.some(m => m === keys[0])
  if(!MODIFIERS.some(m => m === keys[0])) return false
  return isModifier(keys.slice(1))
}

export default {
  registerOpenMenu
}
