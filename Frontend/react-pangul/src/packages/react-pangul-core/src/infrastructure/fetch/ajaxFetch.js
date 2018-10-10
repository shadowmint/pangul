"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("whatwg-fetch");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AjaxFetch =
/*#__PURE__*/
function () {
  function AjaxFetch(rootUrl) {
    _classCallCheck(this, AjaxFetch);

    this.rootUrl = rootUrl;
  }

  _createClass(AjaxFetch, [{
    key: "post",
    value: function () {
      var _post = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(url, body) {
        var apiHeaders, response, asData;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                apiHeaders = new Headers({
                  'X-Requested-With': 'PANGUL',
                  'Content-Type': 'application/json',
                  Accept: '*/*'
                });
                _context.prev = 1;
                _context.next = 4;
                return fetch("".concat(this.rootUrl).concat(url), {
                  method: 'POST',
                  mode: 'cors',
                  cache: 'no-cache',
                  redirect: 'follow',
                  credentials: 'include',
                  headers: apiHeaders,
                  body: JSON.stringify(body)
                });

              case 4:
                response = _context.sent;

                if (response.ok) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", {
                  error: new Error("Request failed: ".concat(response.status, ": ").concat(response.statusText)),
                  success: false
                });

              case 7:
                _context.next = 9;
                return response.json();

              case 9:
                asData = _context.sent;
                return _context.abrupt("return", {
                  data: asData,
                  success: true
                });

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](1);
                return _context.abrupt("return", {
                  error: _context.t0,
                  success: false
                });

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 13]]);
      }));

      return function post(_x, _x2) {
        return _post.apply(this, arguments);
      };
    }()
  }]);

  return AjaxFetch;
}();

exports.default = AjaxFetch;