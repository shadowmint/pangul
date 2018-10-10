"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseController = void 0;

var _fetchProvider = require("../providers/fetchProvider");

var _loggerProvider = require("../providers/loggerProvider");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BaseController =
/*#__PURE__*/
function () {
  function BaseController() {
    _classCallCheck(this, BaseController);
  }

  _createClass(BaseController, [{
    key: "post",
    value: function () {
      var _post = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(url, body) {
        var response;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.fetch.post(url, body);

              case 2:
                response = _context.sent;

                if (!response.success) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return", response.data);

              case 5:
                this.logger.error(response);
                throw new Error("Internal server error");

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function post(_x, _x2) {
        return _post.apply(this, arguments);
      };
    }()
  }, {
    key: "fetch",
    get: function get() {
      return _fetchProvider.FetchProvider.get();
    }
  }, {
    key: "logger",
    get: function get() {
      return _loggerProvider.LoggerProvider.get();
    }
  }]);

  return BaseController;
}();

exports.BaseController = BaseController;