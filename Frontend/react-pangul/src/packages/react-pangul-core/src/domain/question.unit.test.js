"use strict";

var _question = require("./question");

test("test create context", function () {
  var instance = new _question.Question();
  expect(instance).not.toBe(null);
});