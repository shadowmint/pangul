"use strict";

var _topic = require("./topic");

test("test create instance", function () {
  var instance = new _topic.Topic();
  expect(instance).not.toBe(null);
});