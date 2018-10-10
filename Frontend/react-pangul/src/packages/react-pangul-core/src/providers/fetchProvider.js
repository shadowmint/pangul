"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FetchProvider = void 0;

var _providerSingleton = _interopRequireDefault(require("../infrastructure/providers/providerSingleton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FetchProvider = new _providerSingleton.default(null);
exports.FetchProvider = FetchProvider;