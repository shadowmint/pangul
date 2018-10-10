"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QuerySet = void 0;

var _model = require("react-stateful/src/model");

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

var QuerySet =
/*#__PURE__*/
function (_Model) {
  _inherits(QuerySet, _Model);

  function QuerySet() {
    _classCallCheck(this, QuerySet);

    return _possibleConstructorReturn(this, _getPrototypeOf(QuerySet).apply(this, arguments));
  }

  _createClass(QuerySet, [{
    key: "fetch",

    /** Fetch a specific page */
    value: function fetch(page) {
      var _this = this;

      return this.update(
      /*#__PURE__*/
      _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var offset, queryResult, instances, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, id;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                offset = page <= 0 ? 0 : page * _this.state.pageSize;
                _context.next = 3;
                return _this.state.fetchIds(_this.state.query, offset, _this.state.pageSize);

              case 3:
                queryResult = _context.sent;
                instances = [];
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 8;
                _iterator = queryResult.identityList[Symbol.iterator]();

              case 10:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 20;
                  break;
                }

                id = _step.value;
                _context.t0 = instances;
                _context.next = 15;
                return _this.state.fetchInstance(id);

              case 15:
                _context.t1 = _context.sent;

                _context.t0.push.call(_context.t0, _context.t1);

              case 17:
                _iteratorNormalCompletion = true;
                _context.next = 10;
                break;

              case 20:
                _context.next = 26;
                break;

              case 22:
                _context.prev = 22;
                _context.t2 = _context["catch"](8);
                _didIteratorError = true;
                _iteratorError = _context.t2;

              case 26:
                _context.prev = 26;
                _context.prev = 27;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 29:
                _context.prev = 29;

                if (!_didIteratorError) {
                  _context.next = 32;
                  break;
                }

                throw _iteratorError;

              case 32:
                return _context.finish(29);

              case 33:
                return _context.finish(26);

              case 34:
                return _context.abrupt("return", {
                  instances: instances,
                  moreResults: queryResult.moreResults,
                  page: page
                });

              case 35:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[8, 22, 26, 34], [27,, 29, 33]]);
      })));
    }
    /** Next page */

  }, {
    key: "next",
    value: function () {
      var _next2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.state.moreResults) {
                  _context2.next = 2;
                  break;
                }

                throw new Error("No more results in QuerySet");

              case 2:
                _context2.next = 4;
                return this.fetch(this.state.page + 1);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function next() {
        return _next2.apply(this, arguments);
      };
    }()
    /** Previous page */

  }, {
    key: "prev",
    value: function () {
      var _prev = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(this.state.page <= 0)) {
                  _context3.next = 2;
                  break;
                }

                throw new Error("Already on first page of QuerySet");

              case 2:
                _context3.next = 4;
                return this.fetch(this.state.page - 1);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function prev() {
        return _prev.apply(this, arguments);
      };
    }()
  }, {
    key: "blank",
    value: function blank() {
      return {
        fetchIds: function fetchIds() {
          return Promise.reject(new Error("Not implemented"));
        },
        fetchInstance: function fetchInstance() {
          return Promise.reject(new Error("Not implemented"));
        },
        instances: [],
        moreResults: false,
        page: 0,
        pageSize: 10,
        query: ""
      };
    }
  }, {
    key: "rebind",
    value: function rebind() {
      var _this2 = this;

      this.state.instances.map(function (i) {
        i.parent = _this2;
      });
    }
  }], [{
    key: "fromQuery",

    /** Create a queryset from a model, and maybe load a specific page */
    value: function () {
      var _fromQuery = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(query, page) {
        var querySet;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                querySet = new QuerySet(_objectSpread({}, query, {
                  instances: [],
                  moreResults: false,
                  page: -1
                }));

                if (!(page !== null && page !== undefined)) {
                  _context4.next = 4;
                  break;
                }

                _context4.next = 4;
                return querySet.fetch(page);

              case 4:
                return _context4.abrupt("return", querySet);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      return function fromQuery(_x, _x2) {
        return _fromQuery.apply(this, arguments);
      };
    }()
  }]);

  return QuerySet;
}(_model.Model);

exports.QuerySet = QuerySet;