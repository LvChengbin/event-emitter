(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.EventEmitter = factory());
}(this, (function () { 'use strict';

var strong = require('./_collection-strong');

var validate = require('./_validate-collection');

var MAP = 'Map'; // 23.1 Map Objects

module.exports = require('./_collection')(MAP, function (get) {
  return function Map() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var isString = (function (str) {
  return typeof str === 'string' || str instanceof String;
});

var isAsyncFunction = (function (fn) {
  return {}.toString.call(fn) === '[object AsyncFunction]';
});

var isFunction = (function (fn) {
  return {}.toString.call(fn) === '[object Function]' || isAsyncFunction(fn);
});

var isRegExp = (function (reg) {
  return {}.toString.call(reg) === '[object RegExp]';
});

var EventEmitter =
/*#__PURE__*/
function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this.__listeners = new Map();
  }

  _createClass(EventEmitter, [{
    key: "alias",
    value: function alias(name, to) {
      this[name] = this[to].bind(this);
    }
  }, {
    key: "on",
    value: function on(evt, handler) {
      var listeners = this.__listeners;
      var handlers = listeners.get(evt);

      if (handlers) {
        handlers.push(handler);
      } else {
        handlers = [handler];
        listeners.set(evt, handlers);
      }

      return this;
    }
  }, {
    key: "once",
    value: function once(evt, handler) {
      var _this = this;

      var _handler = function _handler() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        handler.apply(_this, args);

        _this.removeListener(evt, _handler);
      };

      return this.on(evt, _handler);
    }
  }, {
    key: "removeListener",
    value: function removeListener(evt, handler) {
      var listeners = this.__listeners;
      var handlers = listeners.get(evt);

      if (!handlers || !handlers.length) {
        return this;
      }

      for (var i = 0; i < handlers.length; i += 1) {
        handlers[i] === handler && (handlers[i] = null);
      }

      setTimeout(function () {
        for (var _i = 0; _i < handlers.length; _i += 1) {
          handlers[_i] || handlers.splice(_i--, 1);
        }
      }, 0);
      return this;
    }
  }, {
    key: "emit",
    value: function emit(evt) {
      var handlers = this.__listeners.get(evt);

      if (handlers) {
        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        for (var i = 0, l = handlers.length; i < l; i += 1) {
          var _handlers$i;

          handlers[i] && (_handlers$i = handlers[i]).call.apply(_handlers$i, [this].concat(args));
        }

        return true;
      }

      return false;
    }
  }, {
    key: "removeAllListeners",
    value: function removeAllListeners(rule) {
      var checker;

      if (isString(rule)) {
        checker = function checker(name) {
          return rule === name;
        };
      } else if (isFunction(rule)) {
        checker = rule;
      } else if (isRegExp(rule)) {
        checker = function checker(name) {
          rule.lastIndex = 0;
          return rule.test(name);
        };
      }

      var listeners = this.__listeners;
      listeners.forEach(function (value, key) {
        if (checker(key)) {
          listeners.delete(key);
        }
      });
      return this;
    }
  }]);

  return EventEmitter;
}();

return EventEmitter;

})));
