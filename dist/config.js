"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.PORT = exports.CORREO = exports.AWS_SG_ID = exports.AWS_SECRET_ACCESS_KEY = exports.AWS_REGION = exports.AWS_ACCESS_KEY_ID = void 0;
var _dotenv = require("dotenv");
// src/config.js

//if (process.env.RAILWAY_ENVIRONMENT === undefined) {
(0, _dotenv.config)();
//}
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
  dbDatabasePort: process.env.DB_DATABASEPORT || ""
}; // Exportación para AWS
exports["default"] = _default;
var AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || "";
exports.AWS_ACCESS_KEY_ID = AWS_ACCESS_KEY_ID;
var AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || "";
exports.AWS_SECRET_ACCESS_KEY = AWS_SECRET_ACCESS_KEY;
var AWS_REGION = process.env.AWS_REGION || "us-east-1";
exports.AWS_REGION = AWS_REGION;
var AWS_SG_ID = process.env.AWS_SG_ID || "";
exports.AWS_SG_ID = AWS_SG_ID;