"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var request = _interopRequireWildcard(require("request"));

var _loggerProvider = require("../../providers/loggerProvider");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DEBUG = true;
var cookieEnabledRequests = request.defaults({
  jar: true
});

var RestFetch =
/*#__PURE__*/
function () {
  function RestFetch(rootUrl) {
    _classCallCheck(this, RestFetch);

    this.rootUrl = rootUrl;
  }

  _createClass(RestFetch, [{
    key: "post",
    value: function () {
      var _post = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(url, body) {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", new Promise(function (resolve) {
                  try {
                    var messageBody = body ? JSON.stringify(body) : "";
                    var externalUrl = "".concat(_this.rootUrl).concat(url);
                    cookieEnabledRequests.post(externalUrl, {
                      body: messageBody,
                      headers: {
                        "Origin": "http://localhost:8080",
                        "Referer": "http://localhost:8080",
                        "X-Requested-With": "PANGUL",
                        "content-type": "application/json"
                      }
                    }, function (error, response, responseBody) {
                      if (error) {
                        _this.logger.error("[ERROR] POST ".concat(externalUrl, " ").concat(messageBody, " -> ").concat(error));

                        resolve({
                          data: {},
                          error: error,
                          success: false
                        });
                        return;
                      } else {
                        if (DEBUG) {
                          var code = response.statusCode;

                          if (code === 200) {
                            _this.logger.info("POST ".concat(externalUrl, " ").concat(messageBody, " -> ").concat(code, " ").concat(responseBody));
                          } else {
                            _this.logger.error("POST ".concat(externalUrl, " ").concat(messageBody, " -> ").concat(code, " ").concat(responseBody));
                          }
                        }

                        try {
                          resolve(JSON.parse(responseBody));
                          return;
                        } catch (error) {
                          resolve({
                            data: {},
                            error: error,
                            success: false
                          });
                          return;
                        }
                      }
                    });
                  } catch (error) {
                    resolve({
                      data: {},
                      error: error,
                      success: false
                    });
                  }
                }));

              case 1:
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
    key: "logger",
    get: function get() {
      return _loggerProvider.LoggerProvider.get();
    }
  }]);

  return RestFetch;
}();

exports.default = RestFetch;