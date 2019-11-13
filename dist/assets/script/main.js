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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/assets/script/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/assets/script/main.js":
/*!***********************************!*\
  !*** ./src/assets/script/main.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _stylus_app_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../stylus/app.styl */ \"./src/assets/stylus/app.styl\");\n/* harmony import */ var _stylus_app_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_app_styl__WEBPACK_IMPORTED_MODULE_0__);\n\n\nvar _require = __webpack_require__(/*! electron */ \"electron\"),\n    remote = _require.remote,\n    shell = _require.shell,\n    ipcRenderer = _require.ipcRenderer;\n\nvar fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar path = __webpack_require__(/*! path */ \"path\");\n\nvar configFile = path.join(remote.app.getPath('home'), process.env.CONFIG_DIR, process.env.CONFIG_FILE);\nfs.readFile(configFile, function (error, data) {\n  setConfig(JSON.parse(data));\n});\nvar config = document.querySelectorAll('.config');\n\nif (config.length > 0) {\n  config.forEach(function (c) {\n    c.addEventListener('input', function (e) {\n      ipcRenderer.send('changeConfig', {\n        name: e.target.id,\n        value: e.target.value\n      });\n    });\n  });\n}\n\nvar defaultButton = document.getElementById('default');\nvar defaultConfig = {\n  shortcut: '',\n  dir: path.join(remote.app.getPath('home'), process.env.CONFIG_DIR)\n};\n\nif (defaultButton) {\n  defaultButton.addEventListener('click', function () {\n    setConfig(defaultConfig);\n  });\n}\n\nfunction setConfig(config) {\n  document.getElementById('shortcut').value = config.shortcut;\n  document.getElementById('dir').value = config.dir;\n  ipcRenderer.send('changeConfig', {\n    name: 'shortcut',\n    value: config.shortcut\n  });\n  ipcRenderer.send('changeConfig', {\n    name: 'dir',\n    value: config.dir\n  });\n}\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  console.log('loaded');\n  var neovim_element = document.getElementById('neovim');\n  if (neovim_element) initNeovim(neovim_element);\n});\n\nfunction initNeovim(neovim_element) {\n  var editor = neovim_element.editor;\n  editor.on('error', function (err) {\n    alert(err.message);\n  });\n  editor.on('process-attached', function () {\n    if (remote.process.argv.length > 2) {\n      // It is better to use 'argv' property of <neovim-editor>.\n      editor.setArgv(remote.process.argv.slice(2));\n    }\n\n    neovim_element.addEventListener('drop', function (e) {\n      e.preventDefault();\n      var f = e.dataTransfer.files[0];\n\n      if (f) {\n        editor.getClient().command('e! ' + f.path); // 'path' member is Electron extension\n      }\n    });\n  });\n  editor.on('quit', function () {\n    return remote.app.quit();\n  });\n  editor.store.on('beep', function () {\n    return shell.beep();\n  });\n  editor.store.on('title-changed', function () {\n    document.title = editor.store.title;\n  });\n  editor.store.on('icon-changed', function () {\n    var icon = editor.store.icon_path;\n\n    if (icon === '') {\n      return;\n    }\n\n    if (process.platform === 'darwin') {\n      remote.getCurrentWindow().setRepresentedFilename(icon);\n    }\n  });\n  neovim_element.addEventListener('dragover', function (e) {\n    return e.preventDefault();\n  });\n}\n\n//# sourceURL=webpack:///./src/assets/script/main.js?");

/***/ }),

/***/ "./src/assets/stylus/app.styl":
/*!************************************!*\
  !*** ./src/assets/stylus/app.styl ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/assets/stylus/app.styl?");

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