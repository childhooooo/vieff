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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _stylus_app_styl__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../stylus/app.styl */ \"./src/assets/stylus/app.styl\");\n/* harmony import */ var _stylus_app_styl__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_stylus_app_styl__WEBPACK_IMPORTED_MODULE_0__);\n\nvar neovim_element = document.getElementById('neovim');\nvar editor = neovim_element.editor;\n\nvar electron = __webpack_require__(/*! electron */ \"electron\");\n\nvar remote = electron.remote;\nvar shell = electron.shell;\neditor.on('error', function (err) {\n  alert(err.message);\n});\neditor.on('process-attached', function () {\n  if (remote.process.argv.length > 2) {\n    // It is better to use 'argv' property of <neovim-editor>.\n    editor.setArgv(remote.process.argv.slice(2));\n  }\n\n  neovim_element.addEventListener('drop', function (e) {\n    e.preventDefault();\n    var f = e.dataTransfer.files[0];\n\n    if (f) {\n      editor.getClient().command('e! ' + f.path); // 'path' member is Electron extension\n    }\n  });\n});\neditor.on('quit', function () {\n  return remote.app.quit();\n});\neditor.store.on('beep', function () {\n  return shell.beep();\n});\neditor.store.on('title-changed', function () {\n  document.title = editor.store.title;\n});\neditor.store.on('icon-changed', function () {\n  var icon = editor.store.icon_path;\n\n  if (icon === '') {\n    return;\n  }\n\n  if (process.platform === 'darwin') {\n    remote.getCurrentWindow().setRepresentedFilename(icon);\n  }\n});\nneovim_element.addEventListener('dragover', function (e) {\n  return e.preventDefault();\n});\n\n//# sourceURL=webpack:///./src/assets/script/main.js?");

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

/***/ })

/******/ });