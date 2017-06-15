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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__single__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__array__ = __webpack_require__(5);
/*
  This code is meant to be run in a browser. Compatability table to come. 
*/



function DOMObject (dom) {
  if (!dom) {
    this.__domo__ = null;
  } else {
    this.__isArray__ = dom instanceof Array;
    if (this.__isArray__) {
      this.__domo__ = new __WEBPACK_IMPORTED_MODULE_1__array__["a" /* default */](dom);
    } else {
      this.__domo__ = new __WEBPACK_IMPORTED_MODULE_0__single__["a" /* default */](dom);
    }
  }
}

Object.defineProperty(DOMObject.prototype, 'id', {
  get: function() {
    if (this.__isEmpty__()) {
      return null;
    }

    return this.__domo__.id;
  }
});

Object.defineProperty(DOMObject.prototype, 'html', {
  get: function() {
    if (this.__isEmpty__()) {
      return null;
    }

    return this.__domo__.html;
  }
});

Object.defineProperty(DOMObject.prototype, 'classes', {
  get: function() {
    if (this.__isEmpty__()) {
      return null;
    }

    return this.__domo__.classes;
  }
});

Object.defineProperty(DOMObject.prototype, 'checked', {
  get: function() {
    if (this.__isEmpty__()) {
      return null;
    }

    return this.__domo__.checked;
  },
  set: function(value) {
    if (!this.__isEmpty__()) {
      this.__domo__.checked = value;
    }
  }
});

Object.defineProperty(DOMObject.prototype, 'disabled', {
  get: function() {
    if (this.__isEmpty__()) {
      return null;
    }

    return this.__domo__.disabled;
  },
  set: function(value) {
    if (!this.__isEmpty__()) {
      this.__domo__.disabled = value;
    }
  }
});

Object.defineProperty(DOMObject.prototype, 'value', {
  get: function() {
    if (this.__isEmpty__()) {
      return null;
    }

    return this.__domo__.value;
  },
  set: function(value) {
    if (!this.__isEmpty__()) {
      this.__domo__.value = value;
    }
  }
});

Object.defineProperty(DOMObject.prototype, 'isEmpty', {
  get: function() {
    return this.__isEmpty__();
  }
});

DOMObject.prototype.filter = function (fn, query, options) {
  if (this.__isEmpty__()) {
    return [];
  }

  var result = this.__domo__.filter(fn, query, options);

  if (!(result instanceof Array)) {
    result = [result];
  } else {
    result = result.filter(function (d) {
      return d;
    });
  }

  return result;
};

DOMObject.prototype.forEach = function (fn, query, options) {
  if (this.__isEmpty__()) {
    return null;
  }

  this.__domo__.forEach(fn, query, options);
};

DOMObject.prototype.map = function (fn, query, options) {
  if (this.__isEmpty__()) {
    return [];
  }

  var result = this.__domo__.map(fn, query, options);

  if (!(result instanceof Array)) {
    result = [result];
  }

  return result;
};

DOMObject.prototype.setStyle = function (styles, query, options) {
  if (this.__isEmpty__()) {
    return new DOMObject();
  }

  return new DOMObject(this.__domo__.setStyle(styles, query, options));
};

/**
  @param {String[] | String} attrs - Array of attributes to return.
*/
DOMObject.prototype.getAttr = function (attrs, query, options) {
  if (this.__isEmpty__()) {
    return new DOMObject();
  }

  return this.__domo__.getAttr(attrs, query, options);
};

/**
  @param {Object} attrs - Object of attributes to set.
*/
DOMObject.prototype.setAttr = function (attrs, query, options) {
  if (this.__isEmpty__()) {
    return new DOMObject();
  }

  return new DOMObject(this.__domo__.setAttr(attrs, query, options));
};

DOMObject.prototype.toggleClasses = function (classes, query, options) {
  if (this.__isEmpty__()) {
    return new DOMObject();
  }

  return this.toggleClass(classes, query, options);
};

DOMObject.prototype.toggleClass = function (classes, query, options) {
  if (this.__isEmpty__()) {
    return new DOMObject();
  }

  return new DOMObject(this.__domo__.toggleClass(classes, query, options));
};

DOMObject.prototype.removeClasses = function (classes, query, options) {
  if (this.__isEmpty__()) {
    return new DOMObject();
  }

  return this.removeClass(classes, query, options);
};

DOMObject.prototype.removeClass = function (classes, query, options) {
  if (this.__isEmpty__()) {
    return new DOMObject();
  }

  return new DOMObject(this.__domo__.removeClass(classes, query, options));
};

DOMObject.prototype.addClasses = function (classes, query, options) {
  if (this.__isEmpty__()) {
    return new DOMObject();
  }

  return this.addClass(classes, query, options);
};

DOMObject.prototype.addClass = function (classes, query, options) {
  if (this.__isEmpty__()) {
    return new DOMObject();
  }

  return new DOMObject(this.__domo__.addClass(classes, query, options));
};

DOMObject.prototype.insertBefore = function (child, query, options) {
  if (this.__isEmpty__()) {
    return new DOMObject();
  }

  child = this.__preprocessChild__(child);

  return new DOMObject(this.__domo__.insertBefore(child, query, options));
};

DOMObject.prototype.insertAfter = function (child, query, options) {
  if (this.__isEmpty__()) {
    return new DOMObject();
  }

  child = this.__preprocessChild__(child);

  return new DOMObject(this.__domo__.insertAfter(child, query, options));
};

DOMObject.prototype.remove = function (query, options) {
  if (this.__isEmpty__()) {
    return new DOMObject();
  }

  return new DOMObject(this.__domo__.remove(query, options));
};

DOMObject.prototype.append = function (child, query, options) {
  if (this.__isEmpty__()) {
    return new DOMObject();
  }

  child = this.__preprocessChild__(child);

  return new DOMObject(this.__domo__.append(child, query, options));
};


DOMObject.prototype.prepend = function (child, query, options) {
  if (this.__isEmpty__()) {
    return new DOMObject();
  }

  child = this.__preprocessChild__(child);

  return new DOMObject(this.__domo__.prepend(child, query, options));
};

DOMObject.prototype.get = function (query, options) {
  if (this.__isEmpty__()) {
    return new DOMObject();
  }

  return new DOMObject(this.__domo__.get(query, options));
};

DOMObject.prototype.__preprocessChild__ = function (child) {
  if (child instanceof DOMObject) {
    child = child.html;
  } else if (typeof child === 'string') {
    return new DOMObject(child).html;
  }

  return child;
};

DOMObject.prototype.__isEmpty__ = function () {
  return !this.__domo__;
};

/* Static Methods */

DOMObject.isA = function(domo) {
  return domo instanceof DOMObject;
};

DOMObject.cast = function (domo) {
  if (domo instanceof DOMObject) {
    return domo;
  }

  return new DOMObject(domo);
};

/* harmony default export */ __webpack_exports__["a"] = (DOMObject);


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_emmet_parser__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DOMObject__ = __webpack_require__(0);




function DOMOBase () {
}

DOMOBase.prototype.__filter__ = function (dom, fn, query, options) {
  var apply = function (dom, fn) {
    var domo = new __WEBPACK_IMPORTED_MODULE_1__DOMObject__["a" /* default */](dom);
    if (fn(domo)) {
      return domo;
    }
    // return fn(new DOMObject(dom));
  };

  return this.__getApply__(apply, dom, fn, query, options);
};

DOMOBase.prototype.__forEach__ = function (dom, fn, query, options) {
  var apply = function (dom, fn) {
    return fn(new __WEBPACK_IMPORTED_MODULE_1__DOMObject__["a" /* default */](dom));
  };

  return this.__getApply__(apply, dom, fn, query, options);
};

DOMOBase.prototype.__map__ = function (dom, fn, query, options) {
  var apply = function (dom, fn) {
    return fn(new __WEBPACK_IMPORTED_MODULE_1__DOMObject__["a" /* default */](dom));
  };

  return this.__getApply__(apply, dom, fn, query, options);
};

DOMOBase.prototype.__setStyle__ = function (dom, styles, query, options) {
  var apply = function (dom, styles) {
    for (var style in styles) {
      dom.style[style] = styles[style];
    }    
    
    return dom;
  };

  return this.__getApply__(apply, dom, styles, query, options);
};

DOMOBase.prototype.__getAttr__ = function (dom, attrs, query, options) {
  var apply = function (dom, attrs) {
    if (attrs instanceof Array) {
      return attrs.map(function (attr) {
        var result = dom.getAttribute(attr);
        if (!result) {
          return null;
        }

        return result;
      });
    }

    return dom.getAttribute(attrs);
  };

  return this.__getApply__(apply, dom, attrs, query, options);
};

DOMOBase.prototype.__setAttr__ = function (dom, attrs, query, options) {
  var apply = function (dom, attrs) {
    for (var attr in attrs) {
      dom.setAttribute(attr, attrs[attr]);
    }    
    
    return dom;
  };

  return this.__getApply__(apply, dom, attrs, query, options);
};

DOMOBase.prototype.__toggleClass__ = function (dom, classes, query, options) {
  var apply = function (dom, classes) {
    if (classes instanceof Array) {
      classes.forEach(function (c) {
        if (dom.classList && dom.classList.add) {
          dom.classList.toggle(c);
        }
      });
    } else {
      if (dom.classList && dom.classList.add) {
        dom.classList.toggle(classes);
      }
    }
    
    return dom;
  };

  return this.__getApply__(apply, dom, classes, query, options);
};

DOMOBase.prototype.__removeClass__ = function (dom, classes, query, options) {
  var apply = function (dom, classes) {
    if (classes instanceof Array) {
      classes.forEach(function (c) {
        if (dom.classList && dom.classList.add) {
          dom.classList.remove(c);
        }
      });
    } else {
      if (dom.classList && dom.classList.add) {
        dom.classList.remove(classes);
      }
    }
    
    return dom;
  };

  return this.__getApply__(apply, dom, classes, query, options);
};

DOMOBase.prototype.__addClass__ = function (dom, classes, query, options) {
  var apply = function (dom, classes) {
    if (classes instanceof Array) {
      classes.forEach(function (c) {
        if (dom.classList && dom.classList.add) {
          dom.classList.add(c);
        }
      });
    } else {
      if (dom.classList && dom.classList.add) {
        dom.classList.add(classes);
      }
    }
    
    return dom;
  };

  return this.__getApply__(apply, dom, classes, query, options);
};

DOMOBase.prototype.__remove__ = function (dom, query, options) {
  var apply = function (element) {
    if (!element.parentElement) {
      throw new Error ('Cannot remove root node.');
    }

    var removed = element.cloneNode(true);
    element.remove();
    return removed;
  };

  return this.__getApply__(apply, sibling, null, query, options);
};


DOMOBase.prototype.__insertBefore__ = function (sibling, target, query, options) {
  var apply = function (sibling, target) {
    if (!sibling.parentElement) {
      throw new Error (`Sibling requires a parent node.`);
    }

    sibling.parentElement.insertBefore(target, sibling.previousSibling);

    return target;
  };

  return this.__getApply__(apply, sibling, target, query, options);
};


DOMOBase.prototype.__insertAfter__ = function (sibling, target, query, options) {
  var apply = function (sibling, target) {
    if (!sibling.parentElement) {
      throw new Error (`Sibling requires a parent node.`);
    }

    sibling.parentElement.insertBefore(target, sibling.nextSibling);

    return target;
  };

  return this.__getApply__(apply, sibling, target, query, options);
};

DOMOBase.prototype.__append__ = function (parent, child, query, options) {
  var apply = function (parent, child) {

    parent.appendChild(child);

    return child;
  };
  
  return this.__getApply__(apply, parent, child, query, options);
};

DOMOBase.prototype.__prepend__ = function (parent, child, query, options) {
  var apply = function (parent, child) {
    parent.insertBefore(child, parent.firstChild);

    return child;
  };

  return this.__getApply__(apply, parent, child, query, options);
};

DOMOBase.prototype.__getApply__ = function (action, parent, child, query, options) {
  // if (!query) {
  //   return action(parent, child);
  // }

  var target = this.__get__(parent, query, options);

  if (!target) {
    return null;
  }

  if (target instanceof Array) {
    return target.map(function (d) {
      if (child instanceof Array) {
        return child.map(function (c) {
          if (c.hasOwnProperty('cloneNode')) {
            return action(d, c.cloneNode(true));
          }
          return action(d, c);
        });
      }

      if (child.hasOwnProperty('cloneNode')) {
        return action(d, child.cloneNode(true));
      }

      return action(d, child);
    }, this);
  }

  if (child instanceof Array) {
    return child.map(function (c) {
      return action(target, c);
    });
  }

  return action(target, child);
};

/**
  Query the DOMObject for the node.
  
  @param {String} query - The CSS Selector query string
  @param {Object} options - Optional options are as follows
    {Integer|Integer[]} index - The index(es) of the child(ren) to return when the query returns an array of children.

  @returns {DOM Node} - Found DOM Node. Null if not found.
*/
DOMOBase.prototype.__get__ = function (dom, query, options) {
  var children;

  if (!query) {
    if (!options) {
      return dom;
    }

    if (dom instanceof Array) {
      children = dom;
    } else {
      children = [dom];
    }
  } else {
    children = dom.querySelectorAll(query);
  }

  if (children.length > 1) {
    children = this.__toArray__(children);
    if (options) {
      // Array of indexes to return
      if (options.index && options.index instanceof Array) {
        return children.filter(function (c, index) {
          return options.index.includes(index);
        });
      } else if (!Number.isNaN(parseInt(options.index))) {
        // Single index to return

        return children[options.index];        
      }

      throw new Error (`Invalid options index. Expected Int[] or Int.`);
    }

    // All children
    return children;
  } else if (children.length === 1) {
    // Single Child Found
    return children[0];
  } else {
    // Nothing Found
    return null;
  }
};

DOMOBase.prototype.__build__ = function (dom) {
  if (!(dom instanceof Node)) {
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_emmet_parser__["a" /* default */])(dom);
  }

  return dom;
};

DOMOBase.prototype.__toArray__ = function (nodeList) {
  var foo = [];
  var i = 0;

  for (; i < nodeList.length; i++) {
    foo.push(nodeList[i]);
  }

  return foo;
};

/* harmony default export */ __webpack_exports__["a"] = (DOMOBase);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  GROUP_START: '(',
  GROUP_END: ')',
  TEXT_START: '{',
  TEXT_END: '}',
  MULTIPLY: '*',
  CHILD: '>',
  SIBLING: '+',
  PARENT: '^'
});


/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(2);


function DOMOArray (dom) {
  __WEBPACK_IMPORTED_MODULE_0__base__["a" /* default */].call(this);
  
  this.__dom__ = dom.map(function (d) {
    return this.__build__(d);
  }, this);

  if (true) {
    console.log('DOMO Array');
  }
}

DOMOArray.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_0__base__["a" /* default */].prototype);
DOMOArray.prototype.constructor = DOMOArray;

Object.defineProperty(DOMOArray.prototype, 'id', {
  get: function() {
    return this.html.map(function (dom) {
      return dom.id;
    });
  }
});

Object.defineProperty(DOMOArray.prototype, 'html', {
  get: function() {
    return this.__dom__;
  }
});

Object.defineProperty(DOMOArray.prototype, 'classes', {
  get: function() {
    return this.html.map(function (dom) {
      return dom.getAttribute('class');
    });
  }
});

Object.defineProperty(DOMOArray.prototype, 'checked', {
  get: function() {
    return this.html.map(function (dom) {
      return dom.checked;
    });
  },
  set: function(value) {
    if (value instanceof Array) {
      value.forEach(function (v, i) {
        this.html[i].checked = !!v;
      }, this);
    } else {
      value = !!value;

      this.html.forEach(function (dom) {
        dom.checked = value;
      });
    }
  }
});

Object.defineProperty(DOMOArray.prototype, 'disabled', {
  get: function() {
    return this.html.map(function (dom) {
      return dom.disabled;
    });
  },
  set: function(value) {
    if (value instanceof Array) {
      value.forEach(function (v, i) {
        this.html[i].disabled = !!v;
      }, this);
    } else {
      value = !!value;

      this.html.forEach(function (dom) {
        dom.disabled = value;
      });
    }
  }
});

Object.defineProperty(DOMOArray.prototype, 'value', {
  get: function() {
    return this.html.map(function (dom) {
      return dom.value;
    });
  },
  set: function(value) {
    if (value instanceof Array) {
      value.forEach(function (v, i) {
        this.html[i].value = v;
      }, this);
    } else {
      this.html.forEach(function (dom) {
        dom.value = value;
      });
    }
  }
});

DOMOArray.prototype.filter = function (fn, query, options) {
  if (!query && options) {
    return this.__filter__(this.html, fn, query, options);
  }
  
  return this.html.map(function (d) {
    return this.__filter__(d, fn, query, options);
  }, this);
};

DOMOArray.prototype.forEach = function (fn, query, options) {
  if (!query && options) {
    return this.__forEach__(this.html, fn, query, options);
  }
  
  return this.html.map(function (d) {
    return this.__forEach__(d, fn, query, options);
  }, this);
};

DOMOArray.prototype.map = function (fn, query, options) {
  if (!query && options) {
    return this.__map__(this.html, fn, query, options);
  }
  
  return this.html.map(function (d) {
    return this.__map__(d, fn, query, options);
  }, this);
};

DOMOArray.prototype.setStyle = function (styles, query, options) {
  if (!query && options) {
    return this.__setStyle__(this.html, styles, query, options);
  }

  return this.html.map(function (d) {
    return this.__setStyle__(d, styles, query, options);
  }, this);
};

DOMOArray.prototype.getAttr = function (attrs, query, options) {
  if (!query && options) {
    return this.__getAttr__(this.html, attrs, query, options);
  }

  return this.html.map(function (d) {
    return this.__getAttr__(d, attrs, query, options);
  }, this);
};

DOMOArray.prototype.setAttr = function (attrs, query, options) {
  if (!query && options) {
    return this.__setAttr__(this.html, attrs, query, options);
  }

  return this.html.map(function (d) {
    return this.__setAttr__(d, attrs, query, options);
  }, this);
};

DOMOArray.prototype.toggleClass = function (classes, query, options) {
  if (!query && options) {
    return this.__toggleClass__(this.html, classes, query, options);
  }

  return this.html.map(function (d) {
    return this.__toggleClass__(d, classes, query, options);
  }, this);
};

DOMOArray.prototype.removeClass = function (classes, query, options) {
  if (!query && options) {
    return this.__removeClass__(this.html, classes, query, options);
  }

  return this.html.map(function (d) {
    return this.__removeClass__(d, classes, query, options);
  }, this);
};

DOMOArray.prototype.addClass = function (classes, query, options) {
  if (!query && options) {
    return this.__addClass__(this.html, classes, query, options);
  }

  return this.html.map(function (d) {
    return this.__addClass__(d, classes, query, options);
  }, this);
};

DOMOArray.prototype.insertBefore = function (target, query, options) {
  if (!query && options) {
    return this.__insertBefore__(this.html, target, query, options);
  }

  return this.html.map(function (d) {
    return this.__insertBefore__(d, target.cloneNode(true), query, options);
  }, this);
};

DOMOArray.prototype.insertAfter = function (target, query, options) {
  if (!query && options) {
    return this.__insertAfter__(this.html, target, query, options);
  }

  return this.html.map(function (d) {
    return this.__insertAfter__(d, target.cloneNode(true), query, options);
  }, this);
};

DOMOArray.prototype.append = function (child, query, options) {
  if (!query && options) {
    return this.__append__(this.html, child, query, options);
  }

  return this.html.map(function (d) {
    return this.__append__(d, child.cloneNode(true), query, options);
  }, this);
};

DOMOArray.prototype.prepend = function (child, query, options) {
  if (!query && options) {
    return this.__prepend__(this.html, child, query, options);
  }

  return this.html.map(function (d) {
    return this.__prepend__(d, child.cloneNode(true), query, options);
  }, this);
};

DOMOArray.prototype.get = function (query, options) {
  if (!query && options) {
    return this.__get__(this.html, query, options);
  }

  return this.html.map(function (d) {
    return this.__get__(d, query, options);
  }, this);
};

/* harmony default export */ __webpack_exports__["a"] = (DOMOArray);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base__ = __webpack_require__(2);


function DOMOSingle (dom) {
  __WEBPACK_IMPORTED_MODULE_0__base__["a" /* default */].call(this);
  this.__dom__ = this.__build__(dom);

  if (true) {
    console.log('DOMO Single');
  }
}

DOMOSingle.prototype = Object.create(__WEBPACK_IMPORTED_MODULE_0__base__["a" /* default */].prototype);
DOMOSingle.prototype.constructor = DOMOSingle;

Object.defineProperty(DOMOSingle.prototype, 'id', {
  get: function() {
    return this.html.id;
  }
});

Object.defineProperty(DOMOSingle.prototype, 'html', {
  get: function() {
    return this.__dom__;
  }
});

Object.defineProperty(DOMOSingle.prototype, 'classes', {
  get: function() {
    return this.html.getAttribute('class');
  }
});

Object.defineProperty(DOMOSingle.prototype, 'checked', {
  get: function() {
    return this.html.checked;
  },
  set: function(value) {
    this.html.checked = !!value;
  }
});

Object.defineProperty(DOMOSingle.prototype, 'disabled', {
  get: function() {
    return this.html.disabled;
  },
  set: function(value) {
    this.html.disabled = !!value;
  }
});

Object.defineProperty(DOMOSingle.prototype, 'value', {
  get: function() {
    return this.html.value;
  },
  set: function(value) {
    this.html.value = value;
  }
});

DOMOSingle.prototype.filter = function (fn, query, options) {
  return this.__filter__(this.html, fn, query, options);
};

DOMOSingle.prototype.forEach = function (fn, query, options) {
  return this.__forEach__(this.html, fn, query, options);
};

DOMOSingle.prototype.map = function (fn, query, options) {
  return this.__map__(this.html, fn, query, options);
};

DOMOSingle.prototype.setStyle = function (styles, query, options) {
  return this.__setStyle__(this.html, styles, query, options);
};

DOMOSingle.prototype.getAttr = function (attrs, query, options) {
  return this.__getAttr__(this.html, attrs, query, options);
};

DOMOSingle.prototype.setAttr = function (attrs, query, options) {
  return this.__setAttr__(this.html, attrs, query, options);
};

DOMOSingle.prototype.toggleClass = function (classes, query, options) {
  return this.__toggleClass__(this.html, classes, query, options);
};

DOMOSingle.prototype.removeClass = function (classes, query, options) {
  return this.__removeClass__(this.html, classes, query, options);
};

DOMOSingle.prototype.addClass = function (classes, query, options) {
  return this.__addClass__(this.html, classes, query, options);
};

DOMOSingle.prototype.insertBefore = function (target, query, options) {
  return this.__insertBefore__(this.html, target, query, options);
};

DOMOSingle.prototype.insertAfter = function (target, query, options) {
  return this.__insertAfter__(this.html, target, query, options);
};

DOMOSingle.prototype.remove = function (query, options) {
  return this.__remove__(this.html, query, options);
};

DOMOSingle.prototype.append = function (child, query, options) {
  return this.__append__(this.html, child, query, options);
};

DOMOSingle.prototype.prepend = function (child, query, options) {
  return this.__prepend__(this.html, child, query, options);
};

DOMOSingle.prototype.get = function (query, options) {
  return this.__get__(this.html, query, options);
};

/* harmony default export */ __webpack_exports__["a"] = (DOMOSingle);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__tokenize__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ops__ = __webpack_require__(3);



var doc;

function parser(str, htmlDocument) {
  doc = htmlDocument || document;
  var tokens = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__tokenize__["a" /* default */])(str);

  if (tokens.length === 0) {
    throw new Error(`No tokens from String: ${str}`);
  }

  return makeNode(tokens);
}

/**
  Takes a queue of tokens and returns a node
*/
function makeNode(tokens) {
  var nodeStack = [];
  var token = null;
  var parent = null;
  var child = null;

  if (true) {
    console.log('');
    console.log('Consuming Tokens');
  }

  if (true) {
    console.log('Tokens: ', tokens);
  }

  token = tokens.shift();
  // Evaluate the first node.
  if (isOp(token)) {
    if (token[0] === __WEBPACK_IMPORTED_MODULE_1__ops__["a" /* default */].TEXT_START) {
      nodeStack.push(evaluateText(token));
    } else if(token[0] === __WEBPACK_IMPORTED_MODULE_1__ops__["a" /* default */].GROUP_START) {
      tokens.unshift(token);
      nodeStack.push(evaluateGrouping(tokens));
    } else {
      throw new Error (`Invalid Syntax. Expected valid node. Cannot start with opperator ${token}.`);
    }
  } else {
    nodeStack.push(evaluateNode(token));
  }


  while (tokens.length > 0) {
    token = tokens.shift();

    if (true) {
      console.log('Stack', nodeStack);
      console.log('Tokens', tokens);
      console.log(`Token: ${token}`);
    }

    if (isOp(token)) {
      if (token[0] === __WEBPACK_IMPORTED_MODULE_1__ops__["a" /* default */].GROUP_START) {
        tokens.unshift(token);
        nodeStack.push(evaluateGrouping(tokens));
      } else if (token[0] === __WEBPACK_IMPORTED_MODULE_1__ops__["a" /* default */].TEXT_START) {
        parent = nodeStack.pop();

        if (!parent) {
          throw new Error (`Invalid Syntax. Text requires a parent.`);
        }

        nodeStack.push(evaluateChild(parent, evaluateText(token)));
      } else if (token[0] === __WEBPACK_IMPORTED_MODULE_1__ops__["a" /* default */].MULTIPLY) {
        if (nodeStack.length === 0) {
          if (true) {
            console.log('Error in makeNode() isOp * branch. Node stack is empty.');
          }

          throw new Error (`Invalid Syntax. ${__WEBPACK_IMPORTED_MODULE_1__ops__["a" /* default */].MULTIPLY} expects a valid node before it.`);
        }

        nodeStack.push(evaluateMultiply(nodeStack.pop(), token, tokens));
      } else if (token === __WEBPACK_IMPORTED_MODULE_1__ops__["a" /* default */].PARENT) {
        if (nodeStack.length === 0) {
          throw new Error (`Invalid Syntax. ${__WEBPACK_IMPORTED_MODULE_1__ops__["a" /* default */].PARENT} expects a valid node before it.`);
        }

        nodeStack.push(evaluateParent(tokens, nodeStack));
      } else if (token === __WEBPACK_IMPORTED_MODULE_1__ops__["a" /* default */].SIBLING) {
        if (nodeStack.length === 0) {
          throw new Error (`Invalid Syntax. ${__WEBPACK_IMPORTED_MODULE_1__ops__["a" /* default */].SIBLING} expects a valid node before it.`);
        }

        var first = nodeStack.pop();
        var second = tokens.shift();

        if (isOp(second)) {
          if (second !== __WEBPACK_IMPORTED_MODULE_1__ops__["a" /* default */].GROUP_START) {
            throw new Error (`Invalid Syntax. ${__WEBPACK_IMPORTED_MODULE_1__ops__["a" /* default */].SIBLING} expects a valid node after it. Found opperator: ${second}.`);
          }

          tokens.unshift(second);
          second = evaluateGrouping(tokens);
        } else {
          second = evaluateNode(second);
        }
        nodeStack.push(evaluateSibling(first, second));
      } else if (token === __WEBPACK_IMPORTED_MODULE_1__ops__["a" /* default */].CHILD) {
        child = tokens.shift();

        if (isOp(child)) {
          if (child !== __WEBPACK_IMPORTED_MODULE_1__ops__["a" /* default */].GROUP_START) {
            throw new Error (`Invalid Syntax. ${__WEBPACK_IMPORTED_MODULE_1__ops__["a" /* default */].CHILD} expects a valid node after it. Found opperator: ${child}.`);
          }
          tokens.unshift(child);
          nodeStack.push(evaluateGrouping(tokens));
        } else {
          nodeStack.push(evaluateNode(child));
        }
      } else {
        throw new Error (`Unhandled Opperator: ${token}.`);
      }
    } else {
      // probably shouldn't ever get here on valid strings
      if (true) {
        console.log(`I don't think this should happen. Token: ${token}`);
      }

      throw new Error(`Expected Opperator but found ${token}.`);
    }
  }

  if (true) {
    console.log('Finished Tokens');
  }

  if (true) {
    console.log('Node Stack: ', nodeStack);
  }

  evaluateStack(nodeStack);

  if (true) {
    console.log('Evaluated Node Stack', nodeStack[0]);
    console.log('');
  }

  return nodeStack.pop();
}

/**
  Mutates stack.
*/
function evaluateStack (stack) {
  var parent = null;
  var child = null;

  if (true) {
    console.log('Evaluating Stack');
  }

  if (true) {
    console.log('Stack: ', stack);
  }

  while (stack.length > 1) {
    child = stack.pop();
    parent = stack.pop();
    stack.push(evaluateChild(parent, child));
  }
}

/**
  @param {String} node - The string of the element to create.

  @return {DOM Node} - DOM Node representation of the string.
*/
function evaluateNode (node) {
  // Supported SVG Tags
  var svgTags = [
    'circle',
    'defs',
    'ellipse',
    'g',
    'line',
    'linearGradient',
    'mask',
    'path',
    'pattern',
    'polygon',
    'polyline',
    'rect',
    'svg',
    'text'
  ];

  if (true) {
    console.log(`Evaluating node: ${node}`);
  }
  var attrs = node.split('#');
  var id = null;
  var classes = [];

  if (attrs.length > 1) {
    // There is an ID
    classes = attrs[1].split('.');
    id = classes.shift();
    node = attrs[0];
  } else {
    classes = attrs[0].split('.');
    node = classes.shift();
  }

  if (svgTags.includes(node)) {
    node = doc.createElementNS("http://www.w3.org/2000/svg", node);
  } else {
    node = doc.createElement(node);
  }

  if (id) {
    node.setAttribute('id', id);
  }

  classes.forEach(function (c) {
    node.classList.add(c);
  });

  return node;
}

function evaluateParent (tokens, nodeStack) {
  if (true) {
    console.log('Evaluating Parent Op');
  }

  var depth = 1;

  while (tokens[0] === __WEBPACK_IMPORTED_MODULE_1__ops__["a" /* default */].PARENT) {
    depth++;
    tokens.shift();
  }

  // Get a pointer to the first child.
  var children = nodeStack[nodeStack.length - 1];
  evaluateStack(nodeStack);
  var parent = nodeStack.pop();
  var target = children;

  if (true) {
    console.log('Parent:', parent);
    console.log('Child: ', children);
  }

  for (var i = 0; i <= depth; i++) {
    target = target.parentElement;
    if (!target) {
      if (true) {
        console.log(`Target: ${target}`);
        console.log(`Depth: ${depth}, Iteration: ${i}`);
      }

      throw new Error (`Invalid Syntax. Too many ${__WEBPACK_IMPORTED_MODULE_1__ops__["a" /* default */].PARENT}.`);
    }
  }

  // Works because target is a pointer.
  evaluateChild(target, makeNode(tokens));
  return parent;
}

/**
  @param {DOM Node | DOM Node[]} parent - Soon to be parent(s).
  @param {DOM Node | DOM Node[]} child - Soon to be child(ren).

  @return {DOM Node | DOM Node[]} - The parent(s) with the child(ren). 
*/
function evaluateChild (parent, child) {
  if (true) {
    console.log('Evaluating Child');
    console.log('Parent: ', parent);
    console.log('Child: ', child);
  }

  var p = parent;

  if (parent instanceof Array) {
    p = parent[parent.length - 1];
  }


  if (child instanceof Array) {
    child.forEach(function (c) {
      p.appendChild(c);
    });
  } else {
    p.appendChild(child);
  }

  if (true) {
    console.log('Parent: ', parent);
  }

  // This works because p is a pointer.
  return parent;
}

/**
  @param {DOM Node | DOM Node []} first - The first child.
  @param {DOM Node | DOM Node []} second - The second child.

  @param {DOM Node[]} - Array of the combined children.
*/
function evaluateSibling (first, second) {
  if (true) {
    console.log('Evaluating Silbings');
    console.log('First', first);
    console.log('Second', second);
  }

  var result = [];

  if (first instanceof Array) {
    result = first;
  } else {
    result.push(first);
  }

  if (second instanceof Array) {
    second.forEach(function (node) {
      result.push(node);
    });
  } else {
    result.push(second);
  }

  return result;
}

/**  
  @param {DOM Node} target - The target DOM Node that will be multiplied.
  @param {String} token - The token with the GROUP_START symbol.
  @param {String[]} tokens - The rest of the tokens.

  @return {DOM Node} - The DOM Node structure that this grouping creates.
*/
function evaluateMultiply (target, token, tokens) {
  if (true) {
    console.log('Evaluating Multiply');
  }

  if (true) {
    console.log('Tokens: ', tokens);
  }

  // Always an Int. Type checked during tokenizing.  
  var times = parseInt(token.split(' ')[1]);
  var result = [];
  var depth = 1;
  var grouping = [];
  var child = null;

  if (tokens[0] === __WEBPACK_IMPORTED_MODULE_1__ops__["a" /* default */].CHILD) {
    var t = tokens.shift();

    while (tokens.length > 0 && !child) {
      t = tokens.shift();
      if (isOp(t)) {
        if (t === __WEBPACK_IMPORTED_MODULE_1__ops__["a" /* default */].CHILD) {
          depth++;
        } else if (t === __WEBPACK_IMPORTED_MODULE_1__ops__["a" /* default */].PARENT) {
          depth--;
          if (depth < 1) {
            // End and process the group. Put the ^ back in the tokens.
            // tokens.unshift(t);
            if (true) {
              console.log('Grouping: ', grouping);
            }
            // grouping.shift();
            child = makeNode(grouping);
          }
        }
      }

      if (!child) {
        grouping.push(t);
      }
    }
  }

  if (!child && grouping.length > 0) {
    child = makeNode(grouping);
  }

  if (child) {
    target.appendChild(child);
  }

  for (var i = 0; i < times; i++) {
    result.push(target.cloneNode(true));
  }

  return result;
}

/**
  @param {String} token - Token representing the text to create.

  @return {DOM Node} - DOM Text node for this string.
*/
function evaluateText (token) {
  if (true) {
    console.log('Evaluating Text.');
  }

  if (true) {
    console.log(`Text: ${token}`);
  }

  return doc.createTextNode(token.substr(1, token.length - 2).trim());
}

/**
  @param {String} token - The token with the GROUP_START symbol.
  @param {String[]} tokens - The rest of the tokens.

  @return {DOM Node} - The DOM Node structure that this grouping creates.
*/
function evaluateGrouping (tokens) {
  if (true) {
    console.log('Starting new grouping.');
  }

  var token = tokens.shift();
  var endIndex = tokens.findIndex(function (t) {
    return t.length > 0 && t[t.length - 1] === __WEBPACK_IMPORTED_MODULE_1__ops__["a" /* default */].GROUP_END;
  });

  if (endIndex >= 0) {
    var groupedTokens = tokens.slice(0, endIndex);
    
    // Mutate the tokens to remove the grouping. 
    for (var i = 0; i <= endIndex; i++) {
      tokens.shift();
    }

    return makeNode(groupedTokens);
  }

  if (token[token.length - 1] === __WEBPACK_IMPORTED_MODULE_1__ops__["a" /* default */].GROUP_END) {
    return makeNode([token.substr(1, token.length - 2)]);
  }

  if (true) {
    console.log(`No closing ) found.`, tokens);
  }

  throw new Error(`Invalid String. No closing ${__WEBPACK_IMPORTED_MODULE_1__ops__["a" /* default */].GROUP_END}`);
}

/**
  @param {String} token - Token to check.

  @return {Boolean} - True: Token is an opperator.
*/
function isOp(token) {
  for (var op in __WEBPACK_IMPORTED_MODULE_1__ops__["a" /* default */]) {
    if (token === __WEBPACK_IMPORTED_MODULE_1__ops__["a" /* default */][op] ||
        token.includes(__WEBPACK_IMPORTED_MODULE_1__ops__["a" /* default */].MULTIPLY) ||
        token.includes(__WEBPACK_IMPORTED_MODULE_1__ops__["a" /* default */].GROUP_START) ||
        token.includes(__WEBPACK_IMPORTED_MODULE_1__ops__["a" /* default */].GROUP_END) ||
        token.includes(__WEBPACK_IMPORTED_MODULE_1__ops__["a" /* default */].TEXT_START) ||
        token.includes(__WEBPACK_IMPORTED_MODULE_1__ops__["a" /* default */].TEXT_END)) {

      return true;
    }
  }

  return false;
}

/* harmony default export */ __webpack_exports__["a"] = (parser);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ops__ = __webpack_require__(3);


/**
  @param {String} str - The string to tokenize.

  @return {String[]} - Array of string tokens.
*/
function tokenize(str) {
  if (typeof str !== 'string') {
    throw new Error(`Expected a String but found: ${str}`);
  }

  var tokens = str.split(' ');

  if (true) {
    console.log(`Tokenizing: ${str}`);
  }

  if (true) {
    console.log('Tokens: ', tokens);
  }

  for (var i = 0; i < tokens.length; i++) {
    if (tokens[i].includes(__WEBPACK_IMPORTED_MODULE_0__ops__["a" /* default */].TEXT_START)) {
      condenseTextToken(tokens, i);
    } else if (tokens[i][0] === __WEBPACK_IMPORTED_MODULE_0__ops__["a" /* default */].GROUP_START && tokens[i].length > 1) {
      tokens = tokens.slice(0,i).concat(tokens[i][0], tokens[i].substr(1), tokens.slice(i+1));
      // i++;
    } else if (tokens[i][tokens[i].length - 1] === __WEBPACK_IMPORTED_MODULE_0__ops__["a" /* default */].GROUP_END && tokens[i].length > 1) {
      tokens = tokens.slice(0,i).concat(tokens[i].substr(0, tokens[i].length - 1), tokens[i][tokens[i].length - 1], tokens.slice(i+1));
      // i++;      
    } else if (tokens[i] === __WEBPACK_IMPORTED_MODULE_0__ops__["a" /* default */].MULTIPLY) {
      condenseMultiplyToken(tokens, i);
    } else {
      tokens[i] = tokens[i].toLowerCase().trim();
    }
  }

  tokens = tokens.filter(function (token) {
    return token !== '';
  });

  return tokens;
}

/**
  @param {String[]} tokens - Array of tokens
  @param {Integer} start - Starting index of the text.
  @param {Integer} end - Ending index of the text.

  @return {String[]} - A mutated array of tokens with the text condensed into 
    the start index. All other tokens to the end are set to ''.
*/
function condenseTextToken(tokens, start) {
  if (true) {
    console.log('Condensing Text Token');
  }

  var endIndex = tokens.slice(start).findIndex(function (token) {
    return token.includes(__WEBPACK_IMPORTED_MODULE_0__ops__["a" /* default */].TEXT_END);
  });

  if (endIndex >= 0) {
    endIndex += start;
    tokens[start] = tokens.slice(start, endIndex + 1).join(' ').trim();

    if (true) {
      console.log(`Tokens ${start} - ${endIndex}: ${tokens[start]}`);
    }

    for (var i = start + 1; i <= endIndex; i++) {
      tokens[i] = '';
    }

    return;
  } 

  if (true) {
    console.log(`No closing }.`, tokens);
  }

  throw new Error(`Invalid String. No closing ${__WEBPACK_IMPORTED_MODULE_0__ops__["a" /* default */].TEXT_END}`);
}

/**
  @param {String[]} tokens - Array of tokens
  @param {Integer} index - Index of the Multiply opperator.

  @return {String[]} - A mutated array of tokens with the multiply opperator
     condensed into the index. The integer token set to ''.
*/
function condenseMultiplyToken(tokens, index) {
  if (true) {
    console.log('Condensing Multiply Token');
  }

  var num = parseInt(tokens[index + 1]);

  if (!Number.isNaN(num)) {
    tokens[index] = `${tokens[index]} ${num}`;
    // possible index error here.
    tokens[index + 1] = '';

    return;
  }

  if (true) {
    console.log(`Expected Integer after ${__WEBPACK_IMPORTED_MODULE_0__ops__["a" /* default */].MULTIPLY} but found ${tokens[index + 1]}.`);
  }

  throw new Error(`Invalid String. Expected Integer after ${__WEBPACK_IMPORTED_MODULE_0__ops__["a" /* default */].MULTIPLY} but found ${tokens[index + 1]}.`);
}

/* harmony default export */ __webpack_exports__["a"] = (tokenize);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_dom_object__ = __webpack_require__(0);
/*
 * Author: Matt Thomson <red.cataclysm@gmail.com>
 *
 * This work is licensed under the Creative Commons Attribution 4.0 
 * International License. To view a copy of this license, 
 * visit http://creativecommons.org/licenses/by/4.0/ or send a letter 
 * to Creative Commons, PO Box 1866, Mountain View, CA 94042, USA.
*/



let posts = new __WEBPACK_IMPORTED_MODULE_0_dom_object__["a" /* default */](document.getElementById('feed')).get('section.post');
console.log(posts);

posts.forEach((domo) => {
  if (!domo.classes.includes('unsubmitted')) {
    domo.get('header').html.addEventListener('click', toggleVisible);
  }
});

function toggleVisible (e) {
  console.log(e.currentTarget);
  new __WEBPACK_IMPORTED_MODULE_0_dom_object__["a" /* default */](e.currentTarget.parentElement).toggleClass('hide').toggleClass('show');
}


/***/ })
/******/ ]);