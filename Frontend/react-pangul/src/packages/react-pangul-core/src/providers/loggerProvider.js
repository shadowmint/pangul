"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoggerProvider = void 0;

var _providerFactory = _interopRequireDefault(require("../infrastructure/providers/providerFactory"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LoggerProvider = new _providerFactory.default(null);
exports.LoggerProvider = LoggerProvider;