webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(22);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
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

var _vuePageAnimation = __webpack_require__(25);

var _vuePageAnimation2 = _interopRequireDefault(_vuePageAnimation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  components: {
    VuePageAnimation: _vuePageAnimation2.default
  }
}; //
//
//
//
//
//
//
//
//
//

/***/ }),
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = __webpack_require__(11);

var _positionFixer = __webpack_require__(28);

var _positionFixer2 = _interopRequireDefault(_positionFixer);

var _stateHelper = __webpack_require__(29);

var _stateHelper2 = _interopRequireDefault(_stateHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
  forceTransitionName: 如果是 空值，则只能判定，使用到底是 slide 还是 fade 的动画，否则，就强制使用某种动画
  transitionName: 是决定左、右、透明 动画
*/
exports.default = {
  props: ['forceTransitionName'],

  data: function data() {
    return { transitionName: 'vue-page-animation-fade' };
  },
  created: function created() {
    this.positionFixer = new _positionFixer2.default({});
    this.stateHelper = new _stateHelper2.default({ clsLock: 'vue-page-animation-lock' });
    this.watchRouter();
  },
  beforeDestroy: function beforeDestroy() {
    this.unwatchRouter();
  },
  activated: function activated() {
    this.watchRouter();
  },
  deactivated: function deactivated() {
    this.unwatchRouter();
  },


  methods: {
    watchRouter: function watchRouter() {
      var _this = this;

      if (!this._calculateScroll) {
        // @notice 如果有记录 X 轴的同学，改写这行
        this._calculateScroll = function (to, fr, next) {
          _this._lastScrollY = window.scrollY || window.pageYOffset || document.body.scrollTop;
          next();
        };
        // @notice vue-router 不知道会在什么时候，把 beforeHooks 这个钩子关掉
        // 最保险的，还是在 router 文件内，调用 beforeEach，然后给 from，添加一个 scrollY 之类的字段
        // 然后通过 $watch('$route') 中的 from 参数，重新读取出来
        this.$router.beforeHooks.push(this._calculateScroll);
      }

      if (!this._unwatchRouter) {
        this._unwatchRouter = this.$watch('$route', function (to, from) {
          // 触发这个函数时，history.state 的值，已经更变了，浏览器的高度，也被重置了
          // 唯一的困难，就是把变化前的浏览器高度，给弄回来~~~
          var lastScrollY = _this._lastScrollY || 0;
          var stateHelper = _this.stateHelper;
          var positionFixer = _this.positionFixer;
          stateHelper.update();
          stateHelper.saveLastPosition(lastScrollY);

          var transitionName = _this.forceTransitionName || '';

          if (!transitionName) {
            if (stateHelper.isPageBack()) {
              transitionName = 'vue-page-animation-right';
            } else if (stateHelper.isPageForward()) {
              transitionName = 'vue-page-animation-left';
            } else {
              transitionName = 'vue-page-animation-fade';
            }
          }

          _this.transitionName = transitionName;
        });
      }
    },
    unwatchRouter: function unwatchRouter() {
      // @notcie 如果通过 beforeEach 添加的钩子，则可以把这个 if 判断删除
      if (this._calculateScroll) {
        var hooks = this.$router.beforeHooks;
        var fn = this._calculateScroll;
        if (hooks.indexOf(fn) >= 0) {
          this.$router.beforeHooks.splice(hooks.indexOf(fn), 1);
        }
        this._calculateScroll = null;
      }

      this._unwatchRouter && this._unwatchRouter();
    },
    beforeLeave: function beforeLeave(el) {
      var positionFixer = this.positionFixer;
      var stateHelper = this.stateHelper;

      positionFixer.lockScroll();
      this._leaveFixer = positionFixer.fixElementPos(el, stateHelper.getLastPosition() || 0);
    },
    beforeEnter: function beforeEnter(el) {
      var positionFixer = this.positionFixer;
      var stateHelper = this.stateHelper;

      // @notice 如果强制指定切换后的滚动位置，则按指定的来修复
      var scrollY = null;
      if (stateHelper.isPageBack()) {
        scrollY = el.getAttribute('data-vue-paga-animation-back');
      } else if (stateHelper.isPageForward()) {
        scrollY = el.getAttribute('data-vue-paga-animation-forward');
      }
      scrollY = scrollY || stateHelper.getCurrentPosition();

      positionFixer.lockScroll();
      this._enterFixer = positionFixer.fixElementPos(el, scrollY);
    },
    afterLeave: function afterLeave() {
      var positionFixer = this.positionFixer;
      positionFixer.unlockScroll();

      this._leaveFixer && this._leaveFixer.clear();
      this._leaveFixer = null;
    },
    afterEnter: function afterEnter(el) {
      var positionFixer = this.positionFixer;
      positionFixer.unlockScroll();

      var isFixWindowScroll = true;
      this._enterFixer && this._enterFixer.clear(isFixWindowScroll);
      this._enterFixer = null;
    },
    cancelAnimation: function cancelAnimation() {
      this.afterLeave();
      this.afterEnter();
    }
  }
}; //
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

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var isSupportHistoryApi = exports.isSupportHistoryApi = 'state' in history && 'replaceState' in history;

/***/ }),
/* 12 */
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
/* 13 */
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
/* 14 */
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
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(3);

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = __webpack_require__(5);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _App = __webpack_require__(19);

var _App2 = _interopRequireDefault(_App);

var _router = __webpack_require__(32);

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);

_vue2.default.config.errorHandler = function (err, vm, info) {
  alert(err);
  alert(info);
};

var app = new _vue2.default({
  el: '#app',
  router: _router2.default,
  render: function render(h) {
    return h(_App2.default);
  }
});

exports.default = app;

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3a78ca7c_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__ = __webpack_require__(31);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(20)
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(21);
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n* {\n  padding: 0;\n  margin: 0;\n  box-sizing: border-box;\n}\nbody {\n  font-family: -apple-system-font,sans-serif;\n}\nli {\n  list-style: none;\n}\nimg {\n  max-width: 100%;\n}\n.pull-left {\n  float: left;\n}\n.pull-right {\n  float: right;\n}\n.clear {\n  clear: both;\n}\n.clearfix:after {\n  content: '';\n  display: table;\n  clear: both;\n}\n.a-header {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 38px;\n  line-height: 38px;\n  border-bottom: 1px solid #ddd;\n  text-align: center;\n  color: #fff;\n  background: #ffa22c;\n}\n.a-header .text {\n  position: absolute;\n  top: 0; left: 40px; right: 40px; bottom: 0;\n  text-align: center;\n}\n.a-header a {\n  display: inline-block;\n  padding: 0 5px;\n  color: #fff;\n  text-decoration: none;\n}\n.a-header .back {\n  float: left;\n  font-family: cursive, \"\\5FAE\\8F6F\\96C5\\9ED1\";\n}\n.a-content {\n  margin-top: 40px;\n}\n", ""]);

// exports


/***/ }),
/* 22 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 23 */,
/* 24 */,
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_vue_page_animation_vue__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_vue_page_animation_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_vue_page_animation_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_vue_page_animation_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_vue_page_animation_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_007bee73_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_vue_page_animation_vue__ = __webpack_require__(30);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(26)
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_vue_page_animation_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_007bee73_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_vue_page_animation_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\vue-page-animation.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-007bee73", Component.options)
  } else {
    hotAPI.reload("data-v-007bee73", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(27);
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
		module.hot.accept("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-007bee73\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./vue-page-animation.vue", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-007bee73\",\"scoped\":false,\"hasInlineConfig\":false}!../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./vue-page-animation.vue");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.vue-page-animation-lock {\n  position: fixed;\n  width: 100%;\n  overflow-y: scroll;\n  overflow-x: hidden;\n}\n\n/* @notice 因为 position: fixed 与 transform 配合使用，会导致 position: fixed 失效的，所以只能用 left 动画代替 */\n/* 如果没有 position:fixed 的元素，请果断使用 transform 动画~ */\n.vue-page-animation-router-view {\n  width: 100%;\n  position: absolute;\n  left: 0;\n  will-change: left, opacity;\n  -webkit-transition-duration: .3s;\n  transition-duration: .3s;\n  -webkit-transition-property: left, opacity;\n  transition-property: left, opacity;\n  -webkit-transition-timing-function: cubic-bezier(.55,0,.1,1);\n          transition-timing-function: cubic-bezier(.55,0,.1,1);\n}\n.vue-page-animation-left-enter, .vue-page-animation-right-leave-active {\n  opacity: 0;\n  left: 20px;\n}\n.vue-page-animation-left-leave-active, .vue-page-animation-right-enter {\n  opacity: 0;\n  left: -20px;\n}\n.vue-page-animation-fade-enter, .vue-page-animation-fade-leave-active {\n  opacity: 0;\n}\n", ""]);

// exports


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PositionFixer = function () {
  function PositionFixer(_ref) {
    var _ref$clsLock = _ref.clsLock,
        clsLock = _ref$clsLock === undefined ? 'vue-page-animation-lock' : _ref$clsLock;

    _classCallCheck(this, PositionFixer);

    this.clsLock = clsLock;
    this.elBody = document.body || document.getElementsByTagName('body')[0];
  }

  // 锁定滚动


  _createClass(PositionFixer, [{
    key: 'lockScroll',
    value: function lockScroll() {
      this.elBody.classList.add(this.clsLock);
    }

    // 解锁滚动

  }, {
    key: 'unlockScroll',
    value: function unlockScroll() {
      this.elBody.classList.remove(this.clsLock);
    }

    // 修正元素的位置

  }, {
    key: 'fixElementPos',
    value: function fixElementPos($el, pos) {
      $el.org_top = $el.style.top;
      $el.style.top = 0 - pos + 'px';
      return {
        clear: function clear(isFixWindowScroll, scrollY) {
          var top = $el.org_top;
          $el.style.top = top;
          $el.org_top = null;
          if (isFixWindowScroll) {
            window.scrollTo(0, scrollY != null ? scrollY : pos || 0);
          }
        }
      };
    }
  }]);

  return PositionFixer;
}();

exports.default = PositionFixer;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

'use stirct';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = __webpack_require__(11);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function merge(a, b) {
  for (var k in b) {
    if (b.hasOwnProperty(k)) {
      a[k] = b[k];
    }
  }
  return a;
}

var StateHelper = function () {
  function StateHelper() {
    _classCallCheck(this, StateHelper);

    this.posMap = {};

    this.lastState = null;
    this.state = null;

    this.lastUri = '';
    this.uri = '';

    this.update();
  }

  _createClass(StateHelper, [{
    key: 'update',
    value: function update() {
      // const state = Object.assign({}, history.state || {}); // es6 手机支持不够友好呢
      var state = merge({}, history.state || {});

      if (!state.rid) {
        state.rid = new Date() / 1;
        history.replaceState(state, null);
      }

      this.lastState = this.state;
      this.state = state;

      this.lastUri = this.uri;
      this.uri = location.href;

      if (this.lastState == null) {
        this.lastState = state;
      }
      if (this.lastUri == '') {
        this.lastUri = this.uri;
      }
    }
  }, {
    key: 'isPageBack',
    value: function isPageBack() {
      return _config.isSupportHistoryApi ? this.state.rid < this.lastState.rid : false;
    }
  }, {
    key: 'isPageForward',
    value: function isPageForward() {
      return _config.isSupportHistoryApi ? this.state.rid > this.lastState.rid : false;
    }
  }, {
    key: 'getCurrentPosition',
    value: function getCurrentPosition() {
      var key = _config.isSupportHistoryApi ? this.state.rid : this.uri;
      return this.posMap[key];
    }
  }, {
    key: 'getLastPosition',
    value: function getLastPosition() {
      var key = _config.isSupportHistoryApi ? this.lastState.rid : this.lastUri;
      return this.posMap[key];
    }
  }, {
    key: 'saveLastPosition',
    value: function saveLastPosition(pos) {
      var key = _config.isSupportHistoryApi ? this.lastState.rid : this.lastUri;
      this.posMap[key] = pos || 0;
    }
  }]);

  return StateHelper;
}();

exports.default = StateHelper;

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "vue-page-animation" },
    [
      _c(
        "transition",
        {
          attrs: { name: _vm.transitionName },
          on: {
            "before-leave": _vm.beforeLeave,
            "before-enter": _vm.beforeEnter,
            "after-leave": _vm.afterLeave,
            "after-enter": _vm.afterEnter,
            "enter-cancelled": _vm.cancelAnimation,
            "leave-cancelled": _vm.cancelAnimation
          }
        },
        [_vm._t("default")],
        2
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-007bee73", esExports)
  }
}

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "app" },
    [
      _c(
        "VuePageAnimation",
        [
          _c(
            "keep-alive",
            [
              _c("router-view", {
                staticClass: "vue-page-animation-router-view"
              })
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(3);

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = __webpack_require__(5);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _pageA = __webpack_require__(33);

var _pageA2 = _interopRequireDefault(_pageA);

var _pageB = __webpack_require__(37);

var _pageB2 = _interopRequireDefault(_pageB);

var _home = __webpack_require__(41);

var _home2 = _interopRequireDefault(_home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);
var router = new _vueRouter2.default({
  routes: [{
    path: '/',
    component: _home2.default
  }, {
    path: '/pageA',
    component: _pageA2.default
  }, {
    path: '/pageB',
    component: _pageB2.default
  }]
  // // @notice 如果不要动画效果，其实用 scrollBehavior 已经足够啦
  // scrollBehavior (to, from, savedPosition) {
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return { x: 0, y: 0 }
  //   }
  // }
});

exports.default = router;

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_pageA_vue__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_pageA_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_pageA_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_pageA_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_pageA_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3d435cda_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_pageA_vue__ = __webpack_require__(36);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(34)
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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(35);
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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.page-a-header {\r\n  background: #ff7b2c;\n}\n.page-a-content {\r\n  padding: 5px;\n}\n.page-a-content p {\r\n  margin: 10px 0;\n}\r\n", ""]);

// exports


/***/ }),
/* 36 */
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
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_pageB_vue__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_pageB_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_pageB_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_pageB_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_pageB_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3d272dd8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_pageB_vue__ = __webpack_require__(40);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(38)
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
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(39);
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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.page-b-header {\r\n  background: #2c7fff;\n}\n.page-b-content img {\r\n  display: block;\r\n  width: 100%;\n}\n.page-b-content p, .page-b-content h1, .page-b-content h2 {\r\n  margin: 10px 0;\n}\r\n", ""]);

// exports


/***/ }),
/* 40 */
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
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_home_vue__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_home_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_home_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_home_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_home_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_11df266e_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_home_vue__ = __webpack_require__(44);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(42)
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
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(43);
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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(false);
// imports


// module
exports.push([module.i, "\n.home-content { padding: 5px;\n}\n.home-content li { border-bottom: 1px solid #eee;\n}\n.home-content a { display: block; padding: 10px; text-align: center; text-decoration: none; background: #0396ef; color: #ff8f00;\n}\r\n", ""]);

// exports


/***/ }),
/* 44 */
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

/***/ })
],[18]);