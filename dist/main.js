/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/dotenv/lib/main.js":
/*!*****************************************!*\
  !*** ./node_modules/dotenv/lib/main.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* @flow */\n/*::\n\ntype DotenvParseOptions = {\n  debug?: boolean\n}\n\n// keys and values from src\ntype DotenvParseOutput = { [string]: string }\n\ntype DotenvConfigOptions = {\n  path?: string, // path to .env file\n  encoding?: string, // encoding of .env file\n  debug?: string // turn on logging for debugging purposes\n}\n\ntype DotenvConfigOutput = {\n  parsed?: DotenvParseOutput,\n  error?: Error\n}\n\n*/\n\nconst fs = __webpack_require__(/*! fs */ \"fs\")\nconst path = __webpack_require__(/*! path */ \"path\")\n\nfunction log (message /*: string */) {\n  console.log(`[dotenv][DEBUG] ${message}`)\n}\n\nconst NEWLINE = '\\n'\nconst RE_INI_KEY_VAL = /^\\s*([\\w.-]+)\\s*=\\s*(.*)?\\s*$/\nconst RE_NEWLINES = /\\\\n/g\nconst NEWLINES_MATCH = /\\n|\\r|\\r\\n/\n\n// Parses src into an Object\nfunction parse (src /*: string | Buffer */, options /*: ?DotenvParseOptions */) /*: DotenvParseOutput */ {\n  const debug = Boolean(options && options.debug)\n  const obj = {}\n\n  // convert Buffers before splitting into lines and processing\n  src.toString().split(NEWLINES_MATCH).forEach(function (line, idx) {\n    // matching \"KEY' and 'VAL' in 'KEY=VAL'\n    const keyValueArr = line.match(RE_INI_KEY_VAL)\n    // matched?\n    if (keyValueArr != null) {\n      const key = keyValueArr[1]\n      // default undefined or missing values to empty string\n      let val = (keyValueArr[2] || '')\n      const end = val.length - 1\n      const isDoubleQuoted = val[0] === '\"' && val[end] === '\"'\n      const isSingleQuoted = val[0] === \"'\" && val[end] === \"'\"\n\n      // if single or double quoted, remove quotes\n      if (isSingleQuoted || isDoubleQuoted) {\n        val = val.substring(1, end)\n\n        // if double quoted, expand newlines\n        if (isDoubleQuoted) {\n          val = val.replace(RE_NEWLINES, NEWLINE)\n        }\n      } else {\n        // remove surrounding whitespace\n        val = val.trim()\n      }\n\n      obj[key] = val\n    } else if (debug) {\n      log(`did not match key and value when parsing line ${idx + 1}: ${line}`)\n    }\n  })\n\n  return obj\n}\n\n// Populates process.env from .env file\nfunction config (options /*: ?DotenvConfigOptions */) /*: DotenvConfigOutput */ {\n  let dotenvPath = path.resolve(process.cwd(), '.env')\n  let encoding /*: string */ = 'utf8'\n  let debug = false\n\n  if (options) {\n    if (options.path != null) {\n      dotenvPath = options.path\n    }\n    if (options.encoding != null) {\n      encoding = options.encoding\n    }\n    if (options.debug != null) {\n      debug = true\n    }\n  }\n\n  try {\n    // specifying an encoding returns a string instead of a buffer\n    const parsed = parse(fs.readFileSync(dotenvPath, { encoding }), { debug })\n\n    Object.keys(parsed).forEach(function (key) {\n      if (!Object.prototype.hasOwnProperty.call(process.env, key)) {\n        process.env[key] = parsed[key]\n      } else if (debug) {\n        log(`\"${key}\" is already defined in \\`process.env\\` and will not be overwritten`)\n      }\n    })\n\n    return { parsed }\n  } catch (e) {\n    return { error: e }\n  }\n}\n\nmodule.exports.config = config\nmodule.exports.parse = parse\n\n\n//# sourceURL=webpack:///./node_modules/dotenv/lib/main.js?");

/***/ }),

/***/ "./src/lib/config.js":
/*!***************************!*\
  !*** ./src/lib/config.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar _require = __webpack_require__(/*! electron */ \"electron\"),\n    app = _require.app;\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nfunction init(store) {\n  var configDir = path.join(app.getPath('home'), process.env.CONFIG_DIR);\n  if (!fs.existsSync(configDir)) make();\n  var data = fs.readFileSync(path.join(configDir, process.env.CONFIG_FILE));\n  var config = JSON.parse(data);\n  store.mutations.setConfig('shortcut', config.shortcut);\n  store.mutations.setConfig('dir', config.dir);\n}\n\nfunction make() {\n  var configDir = path.join(app.getPath('home'), process.env.CONFIG_DIR);\n  fs.mkdirSync(configDir);\n  var defaultConfig = {\n    shortcut: '',\n    folder: configDir\n  };\n  fs.writeFileSync(path.join(configDir, process.env.CONFIG_FILE), JSON.stringify(defaultConfig, null, 4));\n}\n\nfunction write(store) {\n  var config = {\n    shortcut: store.state.shortcut,\n    dir: store.state.dir\n  };\n  fs.writeFile(path.join(app.getPath('home'), process.env.CONFIG_DIR, 'config.json'), JSON.stringify(config, null, 4), function () {});\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  init: init,\n  write: write\n});\n\n//# sourceURL=webpack:///./src/lib/config.js?");

/***/ }),

/***/ "./src/lib/event.js":
/*!**************************!*\
  !*** ./src/lib/event.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _status_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./status.js */ \"./src/lib/status.js\");\n\n\nfunction update(store) {\n  var event = store.state.events[0] ? store.state.events[0] : '';\n  store.mutations.shiftEvent();\n\n  switch (event) {\n    case 'set':\n      store.mutations.setCount(event.time);\n      store.mutations.setStatus(_status_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ACTIVE);\n      break;\n\n    case 'pause':\n      store.mutations.setStatus(_status_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].PAUSE);\n      break;\n\n    case 'unpause':\n      if (!store.state.status === _status_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ACTIVE) store.mutations.stepCount();\n      store.mutations.setStatus(_status_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ACTIVE);\n      break;\n\n    case 'extend':\n      store.mutations.extendCount();\n      break;\n\n    default:\n      if (store.state.status !== _status_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ACTIVE) break;\n      if (store.state.count == 0) store.mutations.setStatus(_status_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].FINISH);\n      store.mutations.stepCount();\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  update: update\n});\n\n//# sourceURL=webpack:///./src/lib/event.js?");

/***/ }),

/***/ "./src/lib/render.js":
/*!***************************!*\
  !*** ./src/lib/render.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _timer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer.js */ \"./src/lib/timer.js\");\n/* harmony import */ var _status_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./status.js */ \"./src/lib/status.js\");\n\n\n\nfunction update(store) {\n  store.state.tray.setTitle(store.state.task.name + ' ' + _timer_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].display(store.state.count));\n\n  if (store.state.status === _status_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].FINISH) {\n    store.state.notification.show();\n    store.mutations.setStatus(_status_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].STANDBY);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  update: update\n});\n\n//# sourceURL=webpack:///./src/lib/render.js?");

/***/ }),

/***/ "./src/lib/shortcut.js":
/*!*****************************!*\
  !*** ./src/lib/shortcut.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar _require = __webpack_require__(/*! electron */ \"electron\"),\n    globalShortcut = _require.globalShortcut;\n\nvar MODIFIERS = ['Command', 'Cmd', 'Control', 'Ctrl', 'CommandOrControl', 'CmdOrCtrl', 'Alt', 'Option', 'AltGr', 'Shift', 'Super'];\n\nfunction registerOpenMenu(tray, value) {\n  globalShortcut.unregisterAll();\n\n  if (isAccelerator(value)) {\n    try {\n      globalShortcut.register(value, function () {\n        tray.popUpContextMenu();\n      });\n    } catch (_unused) {\n      console.log('invalid shortcut');\n    }\n  }\n}\n\nfunction isAccelerator(value) {\n  var keys = value.split('+');\n  return isModifier(keys.slice(0, -1));\n}\n\nfunction isModifier(keys) {\n  if (keys.length < 1) return false;\n  if (keys.length == 1) return MODIFIERS.some(function (m) {\n    return m === keys[0];\n  });\n  if (!MODIFIERS.some(function (m) {\n    return m === keys[0];\n  })) return false;\n  return isModifier(keys.slice(1));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  registerOpenMenu: registerOpenMenu\n});\n\n//# sourceURL=webpack:///./src/lib/shortcut.js?");

/***/ }),

/***/ "./src/lib/status.js":
/*!***************************!*\
  !*** ./src/lib/status.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  STADNBY: 'standby',\n  ACTIVE: 'active',\n  PAUSE: 'pause',\n  FINISH: 'finish'\n});\n\n//# sourceURL=webpack:///./src/lib/status.js?");

/***/ }),

/***/ "./src/lib/store.js":
/*!**************************!*\
  !*** ./src/lib/store.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _status_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./status.js */ \"./src/lib/status.js\");\nvar _require = __webpack_require__(/*! electron */ \"electron\"),\n    app = _require.app;\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\n\n\nvar store = function store() {\n  var state = {\n    window: null,\n    tray: null,\n    notification: null,\n    timer: null,\n    dir: '',\n    shortcut: '',\n    status: _status_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ACTIVE,\n    count: 10000,\n    task: {\n      name: 'コーディング',\n      time: 0\n    },\n    events: [],\n    unit: 1000\n  };\n  var mutations = {\n    setConfig: function setConfig(name, value) {\n      state[name] = value;\n    },\n    setUi: function setUi(name, value) {\n      state[name] = value;\n    },\n    setTimer: function setTimer(timer) {\n      state.timer = timer;\n    },\n    setStatus: function setStatus(status) {\n      state.status = status;\n    },\n    setCount: function setCount(count) {\n      state.count = count;\n    },\n    stepCount: function stepCount() {\n      if (state.count > 0) {\n        state.count -= state.unit;\n      }\n    },\n    extendCount: function extendCount() {\n      state.count += state.unit * 60 * 5;\n    },\n    setName: function setName(name) {\n      state.name = name;\n    },\n    shiftEvent: function shiftEvent() {\n      state.events = state.events.slice(1);\n    },\n    pushEvent: function pushEvent(eventName) {\n      state.events.push(eventName);\n    }\n  };\n  return {\n    state: state,\n    mutations: mutations\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (store());\n\n//# sourceURL=webpack:///./src/lib/store.js?");

/***/ }),

/***/ "./src/lib/timer.js":
/*!**************************!*\
  !*** ./src/lib/timer.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction down(store) {\n  clearInterval(store.state.timerId);\n}\n\nfunction up(store, updaters) {\n  var timer = setInterval(function () {\n    return updaters.map(function (u) {\n      return u(store);\n    });\n  }, store.state.unit);\n  store.mutations.setTimer(timer);\n}\n\nfunction display(ms) {\n  var ofSeconds = Math.floor(ms / 1000);\n  var minutes = Math.floor(ofSeconds / 60);\n  var seconds = ofSeconds - minutes * 60;\n  return minutes + ':' + ss(seconds);\n}\n\nfunction ss(s) {\n  return ('0' + s).slice(-2);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  up: up,\n  down: down,\n  display: display\n});\n\n//# sourceURL=webpack:///./src/lib/timer.js?");

/***/ }),

/***/ "./src/lib/ui.js":
/*!***********************!*\
  !*** ./src/lib/ui.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar _require = __webpack_require__(/*! electron */ \"electron\"),\n    Tray = _require.Tray,\n    Menu = _require.Menu,\n    BrowserWindow = _require.BrowserWindow,\n    Notification = _require.Notification;\n\nfunction openPreference(store) {\n  if (store.state.window) {\n    store.state.window.show();\n    return;\n  }\n\n  store.mutations.setUi('window', new BrowserWindow({\n    width: 300,\n    height: 120,\n    useContentSize: true,\n    webPreferences: {\n      nodeIntegration: true\n    }\n  }));\n  store.state.window.loadFile('dist/index.html');\n  store.state.window.on('closed', function () {\n    store.mutations.setUi('window', null);\n  });\n\n  if (true) {\n    store.state.window.webContents.openDevTools({\n      mode: 'detach'\n    });\n  }\n}\n\nfunction createTray(store) {\n  store.mutations.setUi('tray', new Tray(__dirname + '/assets/img/icon.png'));\n  var contextMenu = Menu.buildFromTemplate([{\n    label: 'Done',\n    accelerator: 'CmdOrCtrl+D',\n    click: function click() {}\n  }, {\n    label: 'Pause',\n    accelerator: 'CmdOrCtrl+P',\n    click: function click() {\n      store.mutations.pushEvent('pause');\n    }\n  }, {\n    label: 'Unpause',\n    accelerator: 'CmdOrCtrl+U',\n    click: function click() {\n      store.mutations.pushEvent('unpause');\n    }\n  }, {\n    label: 'Extend',\n    accelerator: 'CmdOrCtrl+E',\n    click: function click() {\n      store.mutations.pushEvent('extend');\n    }\n  }, {\n    type: 'separator'\n  }, {\n    label: 'Preference',\n    accelerator: 'CmdOrCtrl+,',\n    click: function click() {\n      openPreference(store);\n    }\n  }, {\n    role: 'quit',\n    accelerator: 'CmdOrCtrl+Q',\n    label: 'Quit'\n  }]);\n  store.state.tray.setContextMenu(contextMenu);\n}\n\nfunction createNotification(store) {\n  store.mutations.setUi('notification', new Notification({\n    title: 'Vim Effortless',\n    body: \"Time's up!\"\n  }));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  openPreference: openPreference,\n  createTray: createTray,\n  createNotification: createNotification\n});\n\n//# sourceURL=webpack:///./src/lib/ui.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_store_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/store.js */ \"./src/lib/store.js\");\n/* harmony import */ var _lib_timer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/timer.js */ \"./src/lib/timer.js\");\n/* harmony import */ var _lib_event_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/event.js */ \"./src/lib/event.js\");\n/* harmony import */ var _lib_render_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/render.js */ \"./src/lib/render.js\");\n/* harmony import */ var _lib_config_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/config.js */ \"./src/lib/config.js\");\n/* harmony import */ var _lib_shortcut_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./lib/shortcut.js */ \"./src/lib/shortcut.js\");\n/* harmony import */ var _lib_ui_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./lib/ui.js */ \"./src/lib/ui.js\");\n\n\n\n\n\n\n\n\n__webpack_require__(/*! dotenv */ \"./node_modules/dotenv/lib/main.js\").config({\n  path: __dirname + '/../.env'\n});\n\nvar _require = __webpack_require__(/*! electron */ \"electron\"),\n    app = _require.app,\n    Tray = _require.Tray,\n    Menu = _require.Menu,\n    BrowserWindow = _require.BrowserWindow,\n    ipcMain = _require.ipcMain,\n    globalShortcut = _require.globalShortcut;\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\n_lib_config_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"].init(_lib_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\napp.on('ready', function () {\n  _lib_ui_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"].createTray(_lib_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n  _lib_ui_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"].createNotification(_lib_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n  _lib_shortcut_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].registerOpenMenu(_lib_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].state.tray, _lib_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].state.shortcut);\n  _lib_timer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"].up(_lib_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"], [_lib_event_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].update, _lib_render_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"].update]);\n});\napp.on('window-all-closed', function () {\n  if (process.platform !== 'darwin') app.quit();\n});\napp.on('quit', function () {\n  _lib_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].state.tray.destroy();\n});\nipcMain.on('changeConfig', function (event, arg) {\n  if (arg.name === 'shortcut') _lib_shortcut_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"].registerOpenMenu(_lib_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].state.tray, arg.value);\n  _lib_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"].mutations.setConfig(arg.name, arg.value);\n  _lib_config_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"].write(_lib_store_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n});\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nfs.appendFile('./test.txt', 'test', function (err, date) {\n  console.log(err);\n});\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"electron\");\n\n//# sourceURL=webpack:///external_%22electron%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ })

/******/ });