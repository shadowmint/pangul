"use strict";

var _answer = require("./answer");

test("test create answer", function () {
  var instance = new _answer.Answer();
  expect(instance).not.toBe(null);
});