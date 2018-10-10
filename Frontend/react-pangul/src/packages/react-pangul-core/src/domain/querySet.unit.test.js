"use strict";

var _asyncTimeout = _interopRequireDefault(require("react-stateful/src/infrastructure/asyncTimeout"));

var _model = require("react-stateful/src/model");

var _querySet = require("./querySet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Dummy =
/*#__PURE__*/
function (_Model) {
  _inherits(Dummy, _Model);

  function Dummy() {
    _classCallCheck(this, Dummy);

    return _possibleConstructorReturn(this, _getPrototypeOf(Dummy).apply(this, arguments));
  }

  _createClass(Dummy, [{
    key: "blank",
    value: function blank() {
      return {
        dummyId: "",
        key: "key",
        value: "value"
      };
    }
  }, {
    key: "rebind",
    value: function rebind() {// No child objects
    }
  }]);

  return Dummy;
}(_model.Model);

function dummyIdFetcher(_x, _x2, _x3) {
  return _dummyIdFetcher.apply(this, arguments);
}

function _dummyIdFetcher() {
  _dummyIdFetcher = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee5(query, offset, limit) {
    var ids, i;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _asyncTimeout.default)(100);

          case 2:
            ids = [];

            for (i = 0; i < limit; i++) {
              ids.push(Math.random().toString());
            }

            return _context5.abrupt("return", {
              identityList: ids,
              moreResults: true
            });

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));
  return _dummyIdFetcher.apply(this, arguments);
}

function dummyInstanceFetcher(_x4) {
  return _dummyInstanceFetcher.apply(this, arguments);
}

function _dummyInstanceFetcher() {
  _dummyInstanceFetcher = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee6(identity) {
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _asyncTimeout.default)(10);

          case 2:
            return _context6.abrupt("return", new Dummy({
              dummyId: identity,
              key: identity,
              value: "page"
            }));

          case 3:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));
  return _dummyInstanceFetcher.apply(this, arguments);
}

test("test create query set",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  var instance;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return _querySet.QuerySet.fromQuery({
            fetchIds: dummyIdFetcher,
            fetchInstance: dummyInstanceFetcher,
            pageSize: 10,
            query: "Hello"
          });

        case 2:
          instance = _context.sent;
          expect(instance).not.toBeNull();

        case 4:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
})));
test("test fetch next prev on query set",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee2() {
  var instance;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _querySet.QuerySet.fromQuery({
            fetchIds: dummyIdFetcher,
            fetchInstance: dummyInstanceFetcher,
            pageSize: 10,
            query: "Hello"
          });

        case 2:
          instance = _context2.sent;
          _context2.next = 5;
          return instance.fetch(0);

        case 5:
          _context2.next = 7;
          return instance.next();

        case 7:
          _context2.next = 9;
          return instance.next();

        case 9:
          _context2.next = 11;
          return instance.prev();

        case 11:
          expect(instance.state.instances.length).toBe(10);
          expect(instance.state.page).toBe(1);

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this);
})));
test("test change detection",
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee4() {
  var instance, updatingTrigger, updatedTrigger;
  return regeneratorRuntime.wrap(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _querySet.QuerySet.fromQuery({
            fetchIds: dummyIdFetcher,
            fetchInstance: dummyInstanceFetcher,
            pageSize: 10,
            query: "Hello"
          });

        case 2:
          instance = _context4.sent;
          _context4.next = 5;
          return instance.fetch(5);

        case 5:
          updatingTrigger = false;
          updatedTrigger = false;
          instance.subscribe(function () {
            if (instance.updating) {
              updatingTrigger = true;
            } else if (updatingTrigger) {
              updatedTrigger = true;
            }
          });
          _context4.next = 10;
          return instance.state.instances[3].update(
          /*#__PURE__*/
          _asyncToGenerator(
          /*#__PURE__*/
          regeneratorRuntime.mark(function _callee3() {
            return regeneratorRuntime.wrap(function _callee3$(_context3) {
              while (1) {
                switch (_context3.prev = _context3.next) {
                  case 0:
                    _context3.next = 2;
                    return (0, _asyncTimeout.default)(100);

                  case 2:
                    return _context3.abrupt("return", {
                      value: "100"
                    });

                  case 3:
                  case "end":
                    return _context3.stop();
                }
              }
            }, _callee3, this);
          })));

        case 10:
          expect(updatingTrigger).toBe(true);
          expect(updatedTrigger).toBe(true);

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, _callee4, this);
})));