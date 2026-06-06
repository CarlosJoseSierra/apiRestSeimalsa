"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _calificacion = require("../controllers/calificacion.controller");
var router = (0, _express.Router)();
router.get("/calificacion/", _calificacion.getAllCalificaciones);
router.post("/calificacion/new", _calificacion.createCalificacion);
var _default = router;
exports["default"] = _default;