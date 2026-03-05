"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.PORT = exports.CORREO = void 0;
var _dotenv = require("dotenv");
(0, _dotenv.config)();
var PORT = process.env.PORT || 3000;
exports.PORT = PORT;
var CORREO = process.env.CORREO || "";
exports.CORREO = CORREO;
var _default = {
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER || "",
  dbPassword: process.env.DB_PASSWORD || "",
  dbServer: process.env.DB_SERVER || "",
  dbDatabase: process.env.DB_DATABASE || "",
  dbDatabasePort: process.env.DB_DATABASEPORT || "",
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || "",
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || "",
  AWS_REGION: process.env.AWS_REGION || "",
  AWS_SG_ID: process.env.AWS_SG_ID || ""
};
exports["default"] = _default;