"use strict";

var _userContext = require("./userContext");

test("test create context", function () {
  var instance = new _userContext.UserContext();
  expect(instance).not.toBe(null);
});