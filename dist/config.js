"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PORT = exports.DB_USER = exports.DB_SERVER = exports.DB_PASSWORD = exports.DB_DATABASE = exports.AWS_SG_ID = exports.AWS_SECRET_ACCESS_KEY = exports.AWS_REGION = exports.AWS_ACCESS_KEY_ID = void 0;
var _dotenv = require("dotenv");
// src/config.js

if (process.env.RAILWAY_ENVIRONMENT === undefined) {
  (0, _dotenv.config)();
}
var DB_USER = process.env.DB_USER || "";
exports.DB_USER = DB_USER;
var DB_PASSWORD = process.env.DB_PASSWORD || "";
exports.DB_PASSWORD = DB_PASSWORD;
var DB_SERVER = process.env.DB_SERVER || "";
exports.DB_SERVER = DB_SERVER;
var DB_DATABASE = process.env.DB_DATABASE || "";
exports.DB_DATABASE = DB_DATABASE;
var PORT = process.env.PORT || 3000;

// Exportación para AWS
exports.PORT = PORT;
var AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || "";
exports.AWS_ACCESS_KEY_ID = AWS_ACCESS_KEY_ID;
var AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || "";
exports.AWS_SECRET_ACCESS_KEY = AWS_SECRET_ACCESS_KEY;
var AWS_REGION = process.env.AWS_REGION || "us-east-1";
exports.AWS_REGION = AWS_REGION;
var AWS_SG_ID = process.env.AWS_SG_ID || "";
exports.AWS_SG_ID = AWS_SG_ID;