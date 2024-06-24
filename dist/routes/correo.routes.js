"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _correo = require("../controllers/correo.controller");
var router = (0, _express.Router)();
router.post("/envio", _correo.EnviarCorreo);
var _default = router;
exports["default"] = _default;