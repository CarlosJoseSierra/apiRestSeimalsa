"use strict";

require("dotenv/config");
var _app = _interopRequireDefault(require("./app.js"));
var _config2 = require("./config.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
_app["default"].listen(_config2.PORT);
console.log("Server on port", _config2.PORT);