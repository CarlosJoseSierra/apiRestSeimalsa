"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.PORT = exports.DB_USER = exports.DB_SERVER = exports.DB_PASSWORD = exports.DB_DATABASE = void 0;
var _dotenv = require("dotenv");
// config.js

// 1. Se ejecuta la configuración inmediatamente
(0, _dotenv.config)();

// 2. Se capturan los valores del entorno ya cargados
var DB_USER = process.env.DB_USER;
exports.DB_USER = DB_USER;
var DB_PASSWORD = process.env.DB_PASSWORD;
exports.DB_PASSWORD = DB_PASSWORD;
var DB_SERVER = process.env.DB_SERVER;
exports.DB_SERVER = DB_SERVER;
var DB_DATABASE = process.env.DB_DATABASE;
exports.DB_DATABASE = DB_DATABASE;
var PORT = process.env.PORT || 3000;

// 3. Verificación de depuración para Railway
exports.PORT = PORT;
if (!DB_SERVER) {
  console.error("❌ CRÍTICO: DB_SERVER no se cargó. Revisa las variables en Railway.");
}

// 4. Se exportan los valores ya procesados
var _default = {
  DB_USER: DB_USER,
  DB_PASSWORD: DB_PASSWORD,
  DB_SERVER: DB_SERVER,
  DB_DATABASE: DB_DATABASE,
  PORT: PORT
};
exports["default"] = _default;