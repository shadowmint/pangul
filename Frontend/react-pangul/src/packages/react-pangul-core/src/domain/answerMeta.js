"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnswerMeta = void 0;

var _model = require("react-stateful/src/model");

var _answersController = require("../controllers/answersController");

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

var AnswerMeta =
/*#__PURE__*/
function (_Model) {
  _inherits(AnswerMeta, _Model);

  function AnswerMeta() {
    _classCallCheck(this, AnswerMeta);

    return _possibleConstructorReturn(this, _getPrototypeOf(AnswerMeta).apply(this, arguments));
  }

  _createClass(AnswerMeta, [{
    key: "blank",
    value: function blank() {
      return {
        global: {
          votes: 0
        },
        answerId: "",
        answerMetaId: "",
        rowVersion: "",
        votes: 0
      };
    }
  }, {
    key: "voteUp",
    value: function () {
      var _voteUp = _asyncToGenerator(
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
                  var controller;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          controller = new _answersController.AnswersController();
                          _context.next = 3;
                          return controller.updateMetadata(_objectSpread({}, _this.state, {
                            votes: 1
                          }));

                        case 3:
                          _context.next = 5;
                          return controller.getMetadata(_this.state.answerId);

                        case 5:
                          return _context.abrupt("return", _context.sent);

                        case 6:
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

      return function voteUp() {
        return _voteUp.apply(this, arguments);
      };
    }()
  }, {
    key: "voteNeutral",
    value: function () {
      var _voteNeutral = _asyncToGenerator(
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
                  var controller;
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          controller = new _answersController.AnswersController();
                          _context3.next = 3;
                          return controller.updateMetadata(_objectSpread({}, _this2.state, {
                            votes: 0
                          }));

                        case 3:
                          _context3.next = 5;
                          return controller.getMetadata(_this2.state.answerId);

                        case 5:
                          return _context3.abrupt("return", _context3.sent);

                        case 6:
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

      return function voteNeutral() {
        return _voteNeutral.apply(this, arguments);
      };
    }()
  }, {
    key: "voteDown",
    value: function () {
      var _voteDown = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6() {
        var _this3 = this;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.update(
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee5() {
                  var controller;
                  return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                      switch (_context5.prev = _context5.next) {
                        case 0:
                          controller = new _answersController.AnswersController();
                          _context5.next = 3;
                          return controller.updateMetadata(_objectSpread({}, _this3.state, {
                            votes: -1
                          }));

                        case 3:
                          _context5.next = 5;
                          return controller.getMetadata(_this3.state.answerId);

                        case 5:
                          return _context5.abrupt("return", _context5.sent);

                        case 6:
                        case "end":
                          return _context5.stop();
                      }
                    }
                  }, _callee5, this);
                })));

              case 2:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      return function voteDown() {
        return _voteDown.apply(this, arguments);
      };
    }()
  }, {
    key: "rebind",
    value: function rebind() {// No child objects
    }
  }]);

  return AnswerMeta;
}(_model.Model);

exports.AnswerMeta = AnswerMeta;