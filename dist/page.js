webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _appEntry = __webpack_require__(43);

var _appEntry2 = _interopRequireDefault(_appEntry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: {
    AppEntry: _appEntry2.default
  }
}; //
//
//
//
//
//

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  methods: {
    back: function back() {
      history.back();
    }
  }
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  methods: {
    back: function back() {
      history.back();
    }
  }
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  methods: {
    back: function back() {
      history.back();
    }
  }
};

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(3);

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = __webpack_require__(5);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _App = __webpack_require__(17);

var _App2 = _interopRequireDefault(_App);

var _router = __webpack_require__(22);

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);

var app = new _vue2.default({
  el: '#app',
  router: _router2.default,
  render: function render(h) {
    return h(_App2.default);
  }
});

exports.default = app;

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3a78ca7c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__ = __webpack_require__(21);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(18)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3a78ca7c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "page\\App.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3a78ca7c", Component.options)
  } else {
    hotAPI.reload("data-v-3a78ca7c", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(19);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3a78ca7c\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./App.vue", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3a78ca7c\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./App.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n}\nbody {\n  font-family: -apple-system-font,sans-serif;\n}\nli {\n  list-style: none;\n}\nimg {\n  max-width: 100%;\n}\n.pull-left {\n  float: left;\n}\n.pull-right {\n  float: right;\n}\n.clear {\n  clear: both;\n}\n.clearfix:after {\n  content: '';\n  display: table;\n  clear: both;\n}\n.a-header {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 38px;\n  line-height: 38px;\n  border-bottom: 1px solid #ddd;\n  text-align: center;\n  color: #fff;\n  background: #ffa22c;\n}\n.a-header .text {\n  position: absolute;\n  top: 0; left: 40px; right: 40px; bottom: 0;\n  text-align: center;\n}\n.a-header a {\n  display: inline-block;\n  padding: 0 5px;\n  color: #fff;\n  text-decoration: none;\n}\n.a-header .back {\n  float: left;\n  font-family: cursive, \"\\5FAE\\8F6F\\96C5\\9ED1\";\n}\n.a-content {\n  margin-top: 40px;\n}\n", ""]);

// exports


/***/ }),
/* 20 */,
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "app" }, [_c("router-view")], 1)
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3a78ca7c", esExports)
  }
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(3);

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = __webpack_require__(5);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _pageA = __webpack_require__(23);

var _pageA2 = _interopRequireDefault(_pageA);

var _pageB = __webpack_require__(27);

var _pageB2 = _interopRequireDefault(_pageB);

var _home = __webpack_require__(31);

var _home2 = _interopRequireDefault(_home);

var _appEntry = __webpack_require__(43);

var _appEntry2 = _interopRequireDefault(_appEntry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);
var router = new _vueRouter2.default({
  routes: [{
    path: '',
    component: _appEntry2.default,
    children: [{
      path: '/',
      component: _home2.default
    }, {
      path: '/pageA',
      component: _pageA2.default
    }, {
      path: '/pageB',
      component: _pageB2.default
    }]
  }]
});

exports.default = router;

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_pageA_vue__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_pageA_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_pageA_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_pageA_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_pageA_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3d435cda_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_pageA_vue__ = __webpack_require__(26);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(24)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_pageA_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3d435cda_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_pageA_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "page\\pageA.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3d435cda", Component.options)
  } else {
    hotAPI.reload("data-v-3d435cda", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(25);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3d435cda\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./pageA.vue", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3d435cda\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./pageA.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.page-a-header {\r\n  background: #ff7b2c;\n}\n.page-a-content {\r\n  padding: 5px;\n}\n.page-a-content p {\r\n  margin: 10px 0;\n}\r\n", ""]);

// exports


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "page-a" }, [
    _c("div", { staticClass: "a-header page-a-header clearfix" }, [
      _c(
        "a",
        {
          staticClass: "back",
          attrs: { href: "javascript:;" },
          on: { click: _vm.back }
        },
        [_vm._v("<")]
      ),
      _vm._v(" "),
      _c("div", { staticClass: "text" }, [_vm._v("Page A")])
    ]),
    _vm._v(" "),
    _vm._m(0)
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "a-content page-a-content" }, [
      _c("h1", [_vm._v("网站快速成型工具")]),
      _vm._v(" "),
      _c("p", [
        _vm._v(
          "\n      Element，一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库\n      "
        ),
        _c("br"),
        _vm._v(" "),
        _c("img", {
          attrs: {
            src:
              "http://cc.fp.ps.netease.com/file/5a0d8af2a7f2527e5e8be335M4mXBfY8?fop=imageView/3/w/320/h/180"
          }
        })
      ]),
      _vm._v(" "),
      _c("h2", [_vm._v("一致性 Consistency")]),
      _vm._v(" "),
      _c("p", [
        _vm._v(
          "与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；"
        )
      ]),
      _vm._v(" "),
      _c("p", [
        _vm._v(
          "在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。"
        )
      ]),
      _vm._v(" "),
      _c("h2", [_vm._v("反馈 Feedback")]),
      _vm._v(" "),
      _c("p", [
        _vm._v(
          "控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；"
        )
      ]),
      _vm._v(" "),
      _c("p", [
        _vm._v("页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。")
      ]),
      _vm._v(" "),
      _c("h2", [_vm._v("效率 Efficiency")]),
      _vm._v(" "),
      _c("p", [_vm._v("简化流程：设计简洁直观的操作流程；")]),
      _vm._v(" "),
      _c("p", [
        _vm._v("清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；")
      ]),
      _vm._v(" "),
      _c("p", [
        _vm._v(
          "帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。"
        )
      ]),
      _vm._v(" "),
      _c("h2", [_vm._v("可控 Controllability")]),
      _vm._v(" "),
      _c("p", [
        _vm._v(
          "用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；"
        )
      ]),
      _vm._v(" "),
      _c("p", [
        _vm._v(
          "结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。"
        )
      ]),
      _vm._v(" "),
      _c("img", {
        attrs: {
          src:
            "http://cc.fp.ps.netease.com/file/5a6065957f9d2a0b77bf7de0z3v87UmN?fop=imageView/3/w/320/h/180"
        }
      })
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3d435cda", esExports)
  }
}

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_pageB_vue__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_pageB_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_pageB_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_pageB_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_pageB_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3d272dd8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_pageB_vue__ = __webpack_require__(30);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(28)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_pageB_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3d272dd8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_pageB_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "page\\pageB.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3d272dd8", Component.options)
  } else {
    hotAPI.reload("data-v-3d272dd8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(29);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3d272dd8\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./pageB.vue", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3d272dd8\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./pageB.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.page-b-header {\r\n  background: #2c7fff;\n}\n.page-b-content img {\r\n  display: block;\r\n  width: 100%;\n}\n.page-b-content p, .page-b-content h1, .page-b-content h2 {\r\n  margin: 10px 0;\n}\r\n", ""]);

// exports


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "page-b" }, [
    _c("div", { staticClass: "a-header page-b-header clearfix" }, [
      _c(
        "a",
        {
          staticClass: "back",
          attrs: { href: "javascript:;" },
          on: { click: _vm.back }
        },
        [_vm._v("<")]
      ),
      _vm._v(" "),
      _c("div", { staticClass: "text" }, [_vm._v("Page B")])
    ]),
    _vm._v(" "),
    _vm._m(0)
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "a-content page-b-content" }, [
      _c("img", {
        attrs: {
          src:
            "https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=635c6e65888ba61edfeecf29790ff037/b3fb43166d224f4af2cd1bbc03f790529922d1cd.jpg"
        }
      }),
      _vm._v(" "),
      _c("h1", [_vm._v("罐头鱼")]),
      _vm._v(" "),
      _c("p", [
        _vm._v(
          "\n      罐头鱼是指将加工处理后的鱼装入马口铁罐、玻璃罐、复合薄膜蒸煮袋或其他包装材料容器经排气、密封、加热杀菌、冷却等工序，达到商业无菌的食品。\n    "
        )
      ]),
      _vm._v(" "),
      _c("p", [
        _vm._v(
          "\n      鱼类肌肉及其他可食部分富含蛋白质、低脂肪和多不饱和脂肪酸多种维生素和无机质，它可以调节和改善人类的食物结构，供应人类健康所必需的营养素，而罐头鱼因其携带方便、清洁卫生更是受到多数国家尤其是发达国家的青睐。\n    "
        )
      ]),
      _vm._v(" "),
      _c("h1", [_vm._v("原辅材料")]),
      _vm._v(" "),
      _c("p", [
        _vm._v(
          "1、原料鱼：用于加工罐头的海水鱼、淡水鱼质量应符合NY/T 842的规定。"
        )
      ]),
      _vm._v(" "),
      _c("p", [
        _vm._v(
          "2、辅料：食用油和食用盐分别符合NY/T 751和NY/T 1040的规定，其他辅料应符合相应标的规定。"
        )
      ]),
      _vm._v(" "),
      _c("p", [
        _vm._v("3、食品添加剂：食品添加剂品种及其使用量应符合GB2760规定。")
      ]),
      _vm._v(" "),
      _c("img", {
        attrs: {
          src:
            "https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D250/sign=a18162c9014f78f0840b9df649300a83/03087bf40ad162d9a8bf9e8113dfa9ec8b13cdde.jpg"
        }
      }),
      _vm._v(" "),
      _c("h1", [_vm._v("生产工艺")]),
      _vm._v(" "),
      _c("p", [
        _vm._v(
          "1、原料处理选用鱼体完整，气味正常，肌肉有弹性的新鲜小鱼，挤净内脏，充分漂洗，尽量洗去小鳞片。"
        )
      ]),
      _vm._v(" "),
      _c("p", [
        _vm._v(
          "2、盐渍晾晒每100公斤小鱼加食盐1公斤、料酒0.5公斤，翻拌均匀后放置10分钟左右，翻动1～2次。盐渍后立即取出，沥去盐水，用清水淘洗1次，放阳光下晾晒至八成干。"
        )
      ]),
      _vm._v(" "),
      _c("p", [
        _vm._v(
          "3、油炸将晒好的小鱼投入油锅炸，油温180～200℃，时间2～5分钟，投入量约为锅内油量的1/12。轻轻翻动，当小鱼呈浅黄色时捞出。"
        )
      ]),
      _vm._v(" "),
      _c("p", [
        _vm._v(
          "4、汤液配制调味液配方：砂糖150克、味精45克、精盐3公斤、花椒75克、大料50克、胡椒粉60克、明胶粉450克、辣椒油50毫升、生姜180克、蒜瓣180克、葱180克、酱油5公斤、醋精10毫升、水80公斤。将生姜、葱、蒜瓣洗净捶烂，装入纱布袋中，与花椒、大料一起投入水锅中。水煮沸后分别投入精盐、砂糖、胡椒粉、酱油，搅拌后保持微沸25分钟，再加入明胶粉化开。然后停止加热，滤去渣。过滤后加入味精、辣椒油、醋精，拌匀备用。"
        )
      ]),
      _vm._v(" "),
      _c("p", [
        _vm._v(
          "5、装罐排气将小鱼用筷子夹入罐头瓶中，每罐装小鱼350克，加汤汁150克。将装好的罐头放入排气箱中，排气时要求罐中心温度75～80℃，时间10分钟。如采用真空压盖机，可免去排气工序，直接抽空压盖。"
        )
      ]),
      _vm._v(" "),
      _c("p", [
        _vm._v(
          "6、密封杀菌采用普通封口机或真空压盖机进行密封，然后放入高压锅内杀菌。要求15分钟内将高压锅温度升至118℃，维持这个温度65分钟进行杀菌。然后经20分钟降温冷却至40℃以下，擦净罐身，罐盖涂防锈油，贴标签入库贮藏。"
        )
      ]),
      _vm._v(" "),
      _c("img", {
        attrs: {
          src:
            "https://gss3.bdstatic.com/7Po3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=7cfab5748f1001e94a3c130d880f7b06/9d82d158ccbf6c815f3cd075be3eb13533fa4020.jpg"
        }
      }),
      _vm._v(" "),
      _c("img", {
        attrs: {
          src:
            "https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/s%3D220/sign=79d65abeb27eca8016053ee5a1229712/8d5494eef01f3a29e63229539b25bc315d607cb1.jpg"
        }
      })
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3d272dd8", esExports)
  }
}

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_home_vue__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_home_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_home_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_home_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_home_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_11df266e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_home_vue__ = __webpack_require__(34);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(32)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_home_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_11df266e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_home_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "page\\home.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-11df266e", Component.options)
  } else {
    hotAPI.reload("data-v-11df266e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(33);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-11df266e\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./home.vue", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-11df266e\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./home.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.home-content { padding: 5px;\n}\n.home-content li { border-bottom: 1px solid #eee;\n}\n.home-content a { display: block; padding: 10px; text-align: center; text-decoration: none; background: #0396ef; color: #ff8f00;\n}\r\n", ""]);

// exports


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "page-home" }, [
    _vm._m(0),
    _vm._v(" "),
    _c("div", { staticClass: "a-content home-content" }, [
      _c("ul", [
        _c(
          "li",
          [_c("router-link", { attrs: { to: "/pageA" } }, [_vm._v("Page A")])],
          1
        ),
        _vm._v(" "),
        _c(
          "li",
          [_c("router-link", { attrs: { to: "/pageB" } }, [_vm._v("Page B")])],
          1
        )
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "a-header clearfix" }, [
      _c("div", { staticClass: "text" }, [_vm._v("Home")])
    ])
  }
]
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-11df266e", esExports)
  }
}

/***/ }),
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_app_entry_vue__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_app_entry_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_app_entry_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_app_entry_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_app_entry_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(45)
}
var normalizeComponent = __webpack_require__(2)
/* script */


/* template */
var __vue_template__ = null
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_app_entry_vue___default.a,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "page\\app-entry.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-29ca8547", Component.options)
  } else {
    hotAPI.reload("data-v-29ca8547", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vuePageAnimation = __webpack_require__(39);

var _vuePageAnimation2 = _interopRequireDefault(_vuePageAnimation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  extends: _vuePageAnimation2.default
};
/*
  判断左右切换:
  1. 通过 history api，来保存上一页、下一页的信息，如果不支持，就不开放左右切换的动画
  2. history.state.rtime 记录此页面的请求时间，通过时间来判定切换动画

  修复动画前后的滚动轴位置:
  1.
*/

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(46);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(1)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-29ca8547\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./app-entry.vue", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-29ca8547\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./app-entry.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", ""]);

// exports


/***/ })
],[16]);