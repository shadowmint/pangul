"use strict";

var _answerMeta = require("./answerMeta");

test("test create instance", function () {
  var instance = new _answerMeta.AnswerMeta();
  expect(instance).not.toBe(null);
});