// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/js/glider.min.js":[function(require,module,exports) {
var define;
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* @preserve
    _____ __ _     __                _
   / ___// /(_)___/ /___  ____      (_)___
  / (_ // // // _  // -_)/ __/_    / /(_-<
  \___//_//_/ \_,_/ \__//_/  (_)__/ //___/
                              |___/

  Version: 1.7.4
  Author: Nick Piscitelli (pickykneee)
  Website: https://nickpiscitelli.com
  Documentation: http://nickpiscitelli.github.io/Glider.js
  License: MIT License
  Release Date: October 25th, 2018

*/
!function (e) {
  "function" == typeof define && define.amd ? define(e) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = e() : e();
}(function () {
  var n = "undefined" != typeof window ? window : this,
      e = n.Glider = function (e, t) {
    var i = this;
    if (e._glider) return e._glider;
    if (i.ele = e, i.ele.classList.add("glider"), (i.ele._glider = i).opt = Object.assign({}, {
      slidesToScroll: 1,
      slidesToShow: 1,
      resizeLock: !0,
      duration: .5,
      easing: function easing(e, t, i, o, r) {
        return o * (t /= r) * t + i;
      }
    }, t), i.animate_id = i.page = i.slide = 0, i.arrows = {}, i._opt = i.opt, i.opt.skipTrack) i.track = i.ele.children[0];else for (i.track = document.createElement("div"), i.ele.appendChild(i.track); 1 !== i.ele.children.length;) {
      i.track.appendChild(i.ele.children[0]);
    }
    i.track.classList.add("glider-track"), i.init(), i.resize = i.init.bind(i, !0), i.event(i.ele, "add", {
      scroll: i.updateControls.bind(i)
    }), i.event(n, "add", {
      resize: i.resize
    });
  },
      t = e.prototype;

  return t.init = function (e, t) {
    var i = this,
        o = 0,
        r = 0;
    i.slides = i.track.children, [].forEach.call(i.slides, function (e, t) {
      e.classList.add("glider-slide"), e.setAttribute("data-gslide", t);
    }), i.containerWidth = i.ele.clientWidth;
    var s = i.settingsBreakpoint();

    if (t = t || s, "auto" === i.opt.slidesToShow || void 0 !== i.opt._autoSlide) {
      var l = i.containerWidth / i.opt.itemWidth;
      i.opt._autoSlide = i.opt.slidesToShow = i.opt.exactWidth ? l : Math.max(1, Math.floor(l));
    }

    "auto" === i.opt.slidesToScroll && (i.opt.slidesToScroll = Math.floor(i.opt.slidesToShow)), i.itemWidth = i.opt.exactWidth ? i.opt.itemWidth : i.containerWidth / i.opt.slidesToShow, [].forEach.call(i.slides, function (e) {
      e.style.height = "auto", e.style.width = i.itemWidth + "px", o += i.itemWidth, r = Math.max(e.offsetHeight, r);
    }), i.track.style.width = o + "px", i.trackWidth = o, i.isDrag = !1, i.preventClick = !1, i.opt.resizeLock && i.scrollTo(i.slide * i.itemWidth, 0), (s || t) && (i.bindArrows(), i.buildDots(), i.bindDrag()), i.updateControls(), i.emit(e ? "refresh" : "loaded");
  }, t.bindDrag = function () {
    var t = this;
    t.mouse = t.mouse || t.handleMouse.bind(t);

    function e() {
      t.mouseDown = void 0, t.ele.classList.remove("drag"), t.isDrag && (t.preventClick = !0), t.isDrag = !1;
    }

    var i = {
      mouseup: e,
      mouseleave: e,
      mousedown: function mousedown(e) {
        e.preventDefault(), e.stopPropagation(), t.mouseDown = e.clientX, t.ele.classList.add("drag");
      },
      mousemove: t.mouse,
      click: function click(e) {
        t.preventClick && (e.preventDefault(), e.stopPropagation()), t.preventClick = !1;
      }
    };
    t.ele.classList.toggle("draggable", !0 === t.opt.draggable), t.event(t.ele, "remove", i), t.opt.draggable && t.event(t.ele, "add", i);
  }, t.buildDots = function () {
    var e = this;

    if (e.opt.dots) {
      if ("string" == typeof e.opt.dots ? e.dots = document.querySelector(e.opt.dots) : e.dots = e.opt.dots, e.dots) {
        e.dots.innerHTML = "", e.dots.classList.add("glider-dots");

        for (var t = 0; t < Math.ceil(e.slides.length / e.opt.slidesToShow); ++t) {
          var i = document.createElement("button");
          i.dataset.index = t, i.setAttribute("aria-label", "Page " + (t + 1)), i.setAttribute("role", "tab"), i.className = "glider-dot " + (t ? "" : "active"), e.event(i, "add", {
            click: e.scrollItem.bind(e, t, !0)
          }), e.dots.appendChild(i);
        }
      }
    } else e.dots && (e.dots.innerHTML = "");
  }, t.bindArrows = function () {
    var i = this;
    i.opt.arrows ? ["prev", "next"].forEach(function (e) {
      var t = i.opt.arrows[e];
      t && ("string" == typeof t && (t = document.querySelector(t)), t && (t._func = t._func || i.scrollItem.bind(i, e), i.event(t, "remove", {
        click: t._func
      }), i.event(t, "add", {
        click: t._func
      }), i.arrows[e] = t));
    }) : Object.keys(i.arrows).forEach(function (e) {
      var t = i.arrows[e];
      i.event(t, "remove", {
        click: t._func
      });
    });
  }, t.updateControls = function (e) {
    var d = this;
    e && !d.opt.scrollPropagate && e.stopPropagation();
    var t = d.containerWidth >= d.trackWidth;
    d.opt.rewind || (d.arrows.prev && (d.arrows.prev.classList.toggle("disabled", d.ele.scrollLeft <= 0 || t), d.arrows.prev.classList.contains("disabled") ? d.arrows.prev.setAttribute("aria-disabled", !0) : d.arrows.prev.setAttribute("aria-disabled", !1)), d.arrows.next && (d.arrows.next.classList.toggle("disabled", Math.ceil(d.ele.scrollLeft + d.containerWidth) >= Math.floor(d.trackWidth) || t), d.arrows.next.classList.contains("disabled") ? d.arrows.next.setAttribute("aria-disabled", !0) : d.arrows.next.setAttribute("aria-disabled", !1))), d.slide = Math.round(d.ele.scrollLeft / d.itemWidth), d.page = Math.round(d.ele.scrollLeft / d.containerWidth);
    var c = d.slide + Math.floor(Math.floor(d.opt.slidesToShow) / 2),
        h = Math.floor(d.opt.slidesToShow) % 2 ? 0 : c + 1;
    1 === Math.floor(d.opt.slidesToShow) && (h = 0), d.ele.scrollLeft + d.containerWidth >= Math.floor(d.trackWidth) && (d.page = d.dots ? d.dots.children.length - 1 : 0), [].forEach.call(d.slides, function (e, t) {
      var i = e.classList,
          o = i.contains("visible"),
          r = d.ele.scrollLeft,
          s = d.ele.scrollLeft + d.containerWidth,
          l = d.itemWidth * t,
          a = l + d.itemWidth;
      [].forEach.call(i, function (e) {
        /^left|right/.test(e) && i.remove(e);
      }), i.toggle("active", d.slide === t), c === t || h && h === t ? i.add("center") : (i.remove("center"), i.add([t < c ? "left" : "right", Math.abs(t - (t < c ? c : h || c))].join("-")));
      var n = Math.ceil(l) >= Math.floor(r) && Math.floor(a) <= Math.ceil(s);
      i.toggle("visible", n), n !== o && d.emit("slide-" + (n ? "visible" : "hidden"), {
        slide: t
      });
    }), d.dots && [].forEach.call(d.dots.children, function (e, t) {
      e.classList.toggle("active", d.page === t);
    }), e && d.opt.scrollLock && (clearTimeout(d.scrollLock), d.scrollLock = setTimeout(function () {
      clearTimeout(d.scrollLock), .02 < Math.abs(d.ele.scrollLeft / d.itemWidth - d.slide) && (d.mouseDown || d.trackWidth > d.containerWidth + d.ele.scrollLeft && d.scrollItem(d.getCurrentSlide()));
    }, d.opt.scrollLockDelay || 250));
  }, t.getCurrentSlide = function () {
    var e = this;
    return e.round(e.ele.scrollLeft / e.itemWidth);
  }, t.scrollItem = function (e, t, i) {
    i && i.preventDefault();
    var o = this,
        r = e;
    if (++o.animate_id, !0 === t) e *= o.containerWidth, e = Math.round(e / o.itemWidth) * o.itemWidth;else {
      if ("string" == typeof e) {
        var s = "prev" === e;

        if (e = o.opt.slidesToScroll % 1 || o.opt.slidesToShow % 1 ? o.getCurrentSlide() : o.slide, s ? e -= o.opt.slidesToScroll : e += o.opt.slidesToScroll, o.opt.rewind) {
          var l = o.ele.scrollLeft;
          e = s && !l ? o.slides.length : !s && l + o.containerWidth >= Math.floor(o.trackWidth) ? 0 : e;
        }
      }

      e = Math.max(Math.min(e, o.slides.length), 0), o.slide = e, e = o.itemWidth * e;
    }
    return o.scrollTo(e, o.opt.duration * Math.abs(o.ele.scrollLeft - e), function () {
      o.updateControls(), o.emit("animated", {
        value: r,
        type: "string" == typeof r ? "arrow" : t ? "dot" : "slide"
      });
    }), !1;
  }, t.settingsBreakpoint = function () {
    var e = this,
        t = e._opt.responsive;

    if (t) {
      t.sort(function (e, t) {
        return t.breakpoint - e.breakpoint;
      });

      for (var i = 0; i < t.length; ++i) {
        var o = t[i];
        if (n.innerWidth >= o.breakpoint) return e.breakpoint !== o.breakpoint && (e.opt = Object.assign({}, e._opt, o.settings), e.breakpoint = o.breakpoint, !0);
      }
    }

    var r = 0 !== e.breakpoint;
    return e.opt = Object.assign({}, e._opt), e.breakpoint = 0, r;
  }, t.scrollTo = function (t, i, o) {
    var r = this,
        s = new Date().getTime(),
        l = r.animate_id,
        a = function a() {
      var e = new Date().getTime() - s;
      r.ele.scrollLeft = r.ele.scrollLeft + (t - r.ele.scrollLeft) * r.opt.easing(0, e, 0, 1, i), e < i && l === r.animate_id ? n.requestAnimationFrame(a) : (r.ele.scrollLeft = t, o && o.call(r));
    };

    n.requestAnimationFrame(a);
  }, t.removeItem = function (e) {
    var t = this;
    t.slides.length && (t.track.removeChild(t.slides[e]), t.refresh(!0), t.emit("remove"));
  }, t.addItem = function (e) {
    this.track.appendChild(e), this.refresh(!0), this.emit("add");
  }, t.handleMouse = function (e) {
    var t = this;
    t.mouseDown && (t.isDrag = !0, t.ele.scrollLeft += (t.mouseDown - e.clientX) * (t.opt.dragVelocity || 3.3), t.mouseDown = e.clientX);
  }, t.round = function (e) {
    var t = 1 / (this.opt.slidesToScroll % 1 || 1);
    return Math.round(e * t) / t;
  }, t.refresh = function (e) {
    this.init(!0, e);
  }, t.setOption = function (t, e) {
    var i = this;
    i.breakpoint && !e ? i._opt.responsive.forEach(function (e) {
      e.breakpoint === i.breakpoint && (e.settings = Object.assign({}, e.settings, t));
    }) : i._opt = Object.assign({}, i._opt, t), i.breakpoint = 0, i.settingsBreakpoint();
  }, t.destroy = function () {
    function e(t) {
      t.removeAttribute("style"), [].forEach.call(t.classList, function (e) {
        /^glider/.test(e) && t.classList.remove(e);
      });
    }

    var t = this,
        i = t.ele.cloneNode(!0);
    i.children[0].outerHTML = i.children[0].innerHTML, e(i), [].forEach.call(i.getElementsByTagName("*"), e), t.ele.parentNode.replaceChild(i, t.ele), t.event(n, "remove", {
      resize: t.resize
    }), t.emit("destroy");
  }, t.emit = function (e, t) {
    var i = new n.CustomEvent("glider-" + e, {
      bubbles: !this.opt.eventPropagate,
      detail: t
    });
    this.ele.dispatchEvent(i);
  }, t.event = function (e, t, i) {
    var o = e[t + "EventListener"].bind(e);
    Object.keys(i).forEach(function (e) {
      o(e, i[e]);
    });
  }, e;
});
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57117" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/js/glider.min.js"], null)