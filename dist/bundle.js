/*! For license information please see bundle.js.LICENSE.txt */
(()=>{"use strict";var __webpack_modules__={"./js/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../style.css */ "./style.css");\n/* harmony import */ var _pages_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/index */ "./js/pages/index.js");\n// CSS\n\n\n// JS\n\n(function () {\n  window.addEventListener("load", function () {\n    (0,_pages_index__WEBPACK_IMPORTED_MODULE_1__["default"])();\n  });\n})();\n\n//# sourceURL=webpack:///./js/index.js?')},"./js/pages/home.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   homeInicio: () => (/* binding */ homeInicio)\n/* harmony export */ });\nvar homeInicio = function homeInicio() {};\n\n\n//# sourceURL=webpack:///./js/pages/home.js?")},"./js/pages/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _inicio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./inicio */ "./js/pages/inicio.js");\n/* harmony import */ var _home__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home */ "./js/pages/home.js");\n\n\n\nvar init = function init() {\n  (0,_inicio__WEBPACK_IMPORTED_MODULE_0__.politicas_privacidad)();\n  (0,_inicio__WEBPACK_IMPORTED_MODULE_0__.cambioPanel)();\n  (0,_home__WEBPACK_IMPORTED_MODULE_1__.homeInicio)();\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (init);\n\n//# sourceURL=webpack:///./js/pages/index.js?')},"./js/pages/inicio.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   cambioPanel: () => (/* binding */ cambioPanel),\n/* harmony export */   politicas_privacidad: () => (/* binding */ politicas_privacidad)\n/* harmony export */ });\nvar selectedPersonaje = '';\nvar selectedGenero = '';\nvar politicas_privacidad = function politicas_privacidad() {\n  if (document.querySelector('#politicas_privacidad')) {\n    var _politicas_privacidad = document.getElementById('politicas_privacidad');\n    var botonPoliticas = document.getElementById('botonPoliticas');\n    var valorAlmacenado = localStorage.getItem('estado');\n    console.log(valorAlmacenado);\n    if (valorAlmacenado && valorAlmacenado == 1) {\n      _politicas_privacidad.classList.remove('hidden');\n    } else {\n      window.location.href = 'home.html';\n    }\n    botonPoliticas.addEventListener('click', function () {\n      _politicas_privacidad.classList.add('hidden');\n    });\n  }\n};\nvar cambioPanel = function cambioPanel() {\n  if (document.querySelector('.item')) {\n    var showItem = function showItem(index) {\n      items.forEach(function (item) {\n        item.classList.add('hidden');\n        item.classList.remove('opacity-100');\n      });\n      items[index].classList.remove('hidden');\n      items[index].classList.add('opacity-100');\n      zen.classList.add('hidden');\n      loui.classList.add('hidden');\n      if (index === 0) {\n        nextBtn.classList.remove('hidden');\n        pers.classList.remove('hidden');\n        prevBtn.classList.add('hidden');\n      } else if (index >= 6) {\n        pers.classList.add('hidden');\n        nextBtn.classList.add('hidden');\n        if (index == 8) {\n          if (selectedPersonaje == 'Zen') {\n            zen.classList.remove('hidden');\n            loui.classList.add('hidden');\n          } else {\n            loui.classList.remove('hidden');\n            zen.classList.add('hidden');\n          }\n        }\n      } else {\n        nextBtn.classList.remove('hidden');\n        pers.classList.remove('hidden');\n        prevBtn.classList.remove('hidden');\n      }\n      if (index === items.length - 1) {\n        nextBtn.classList.add('hidden');\n      }\n    };\n    var items = document.querySelectorAll('.item');\n    var pers = document.getElementById('personajesFront');\n    var loui = document.getElementById('Loui');\n    var zen = document.getElementById('Zen');\n    var prevBtn = document.getElementById('prevBtn');\n    var nextBtn = document.getElementById('nextBtn');\n    var nexthome = document.getElementById('nexthome');\n    var currentIndex = 0;\n    document.getElementById('nextBtn').addEventListener('click', function () {\n      currentIndex = Math.min(currentIndex + 1, items.length - 1);\n      console.log(currentIndex);\n      showItem(currentIndex);\n    });\n    document.getElementById('prevBtn').addEventListener('click', function () {\n      currentIndex = Math.max(currentIndex - 1, 0);\n      showItem(currentIndex);\n    });\n    showItem(currentIndex);\n    var avatarButtons = document.querySelectorAll('.avatarSelect');\n    avatarButtons.forEach(function (button) {\n      button.addEventListener('click', function () {\n        var personaje = button.getAttribute('data-personaje');\n        selectedPersonaje = personaje;\n        localStorage.setItem('selectedPersonaje', personaje);\n        currentIndex = Math.min(currentIndex + 1, items.length - 1);\n        showItem(currentIndex);\n      });\n    });\n    var genderButtons = document.querySelectorAll('.genderSelect');\n    genderButtons.forEach(function (button) {\n      button.addEventListener('click', function () {\n        var genero = button.getAttribute('data-genero');\n        selectedGenero = genero;\n        localStorage.setItem('selectedGenero', genero);\n        currentIndex = Math.min(currentIndex + 1, items.length - 1);\n        showItem(currentIndex);\n      });\n    });\n    var inputField = document.getElementById('nombreAvatar');\n    var cursor = document.getElementById('cursor');\n    inputField.addEventListener('input', function () {\n      if (inputField.value.trim() === '') {\n        cursor.style.display = 'block';\n        nexthome.classList.add('hidden');\n      } else {\n        cursor.style.display = 'none';\n        nexthome.classList.remove('hidden');\n      }\n    });\n    nexthome.addEventListener('click', function () {\n      localStorage.setItem('NombrePersonaje', inputField.value);\n      // ================\n      // AQUI VA LA API\n      // se estan guardando los datos en localstorage solo para registro\n      // NombrePersonaje, selectedGenero, selectedPersonaje\n      // ================\n      window.location.href = 'home.html';\n    });\n  }\n};\n\n\n//# sourceURL=webpack:///./js/pages/inicio.js?")},"./style.css":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack:///./style.css?")}},__webpack_module_cache__={};function __webpack_require__(e){var n=__webpack_module_cache__[e];if(void 0!==n)return n.exports;var _=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](_,_.exports,__webpack_require__),_.exports}__webpack_require__.d=(e,n)=>{for(var _ in n)__webpack_require__.o(n,_)&&!__webpack_require__.o(e,_)&&Object.defineProperty(e,_,{enumerable:!0,get:n[_]})},__webpack_require__.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),__webpack_require__.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var __webpack_exports__=__webpack_require__("./js/index.js")})();