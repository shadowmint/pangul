"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Answer = void 0;

var _model = require("react-stateful/src/model");

var _answersController = require("../controllers/answersController");

var _querySet = require("./querySet");

var _answerMeta = require("./answerMeta");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Answer =
/*#__PURE__*/
function (_Model) {
  _inherits(Answer, _Model);

  function Answer() {
    _classCallCheck(this, Answer);

    return _possibleConstructorReturn(this, _getPrototypeOf(Answer).apply(this, arguments));
  }

  _createClass(Answer, [{
    key: "refresh",

    /** Refresh a answer instance */
    value: function () {
      var _refresh = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var _this = this;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.update(
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee() {
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          _context.next = 2;
                          return _this.fetchAnswerData(_this.state.answerId);

                        case 2:
                          return _context.abrupt("return", _context.sent);

                        case 3:
                        case "end":
                          return _context.stop();
                      }
                    }
                  }, _callee, this);
                })));

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function refresh() {
        return _refresh.apply(this, arguments);
      };
    }()
    /** Reset to the default state */

  }, {
    key: "reset",
    value: function () {
      var _reset = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4() {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.update(
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee3() {
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          return _context3.abrupt("return", _this2.blank());

                        case 1:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3, this);
                })));

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function reset() {
        return _reset.apply(this, arguments);
      };
    }()
    /** Save a answer */

  }, {
    key: "save",
    value: function () {
      var _save = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6() {
        var _this3 = this;

        var controller;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                controller = new _answersController.AnswersController();
                _context6.next = 3;
                return this.update(
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee5() {
                  var simpleState, identity;
                  return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          simpleState = _objectSpread({}, _this3.state);
                          delete simpleState.meta;

                          if (_this3.state.answerId) {
                            _context5.next = 9;
                            break;
                          }

                          _context5.next = 5;
                          return controller.add(simpleState);

                        case 5:
                          identity = _context5.sent;
                          _context5.next = 8;
                          return _this3.fetchAnswerData(identity.answerId);

                        case 8:
                          return _context5.abrupt("return", _context5.sent);

                        case 9:
                          _context5.next = 11;
                          return controller.update(simpleState);

                        case 11:
                          _context5.next = 13;
                          return _this3.fetchAnswerData(_this3.state.answerId);

                        case 13:
                          return _context5.abrupt("return", _context5.sent);

                        case 14:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee5, this);
                })));

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function save() {
        return _save.apply(this, arguments);
      };
    }()
  }, {
    key: "blank",
    value: function blank() {
      return {
        answerId: "",
        body: "...",
        meta: new _answerMeta.AnswerMeta(),
        questionId: "",
        rowVersion: ""
      };
    }
  }, {
    key: "fetchAnswerData",
    value: function () {
      var _fetchAnswerData = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(answerId) {
        var controller, answerData, meta;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                controller = new _answersController.AnswersController();
                _context7.next = 3;
                return controller.get(answerId);

              case 3:
                answerData = _context7.sent;
                _context7.t0 = _answerMeta.AnswerMeta;
                _context7.next = 7;
                return controller.getMetadata(answerId);

              case 7:
                _context7.t1 = _context7.sent;
                meta = new _context7.t0(_context7.t1);
                return _context7.abrupt("return", _objectSpread({}, answerData, {
                  meta: meta
                }));

              case 10:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      return function fetchAnswerData(_x) {
        return _fetchAnswerData.apply(this, arguments);
      };
    }()
  }, {
    key: "rebind",
    value: function rebind() {
      this.state.meta.parent = this;
    }
  }], [{
    key: "get",

    /** Return a answer instance */
    value: function () {
      var _get = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee8(answerId) {
        var answer;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                answer = new Answer();
                answer.state.answerId = answerId;
                _context8.next = 4;
                return answer.refresh();

              case 4:
                return _context8.abrupt("return", answer);

              case 5:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      return function get(_x2) {
        return _get.apply(this, arguments);
      };
    }()
    /** Search for answers */

  }, {
    key: "search",
    value: function search(questionId) {
      var pageSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
      var page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      return _querySet.QuerySet.fromQuery({
        fetchIds: Answer.searchForIds,
        fetchInstance: Answer.get,
        pageSize: pageSize,
        query: questionId
      }, page);
    }
  }, {
    key: "searchForIds",
    value: function () {
      var _searchForIds = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9(questionId, offset, limit) {
        var controller;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                controller = new _answersController.AnswersController();
                _context9.next = 3;
                return controller.search(questionId, offset, limit);

              case 3:
                return _context9.abrupt("return", _context9.sent);

              case 4:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      return function searchForIds(_x3, _x4, _x5) {
        return _searchForIds.apply(this, arguments);
      };
    }()
  }]);

  return Answer;
}(_model.Model);

exports.Answer = Answer;