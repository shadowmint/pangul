"use strict";

var _questionMeta = require("./questionMeta");

test("test create instance", function () {
  var instance = new _questionMeta.QuestionMeta();
  expect(instance).not.toBe(null);
});