"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _modelos = require("../controllers/modelos.controller");
var router = (0, _express.Router)();

//router.get("/modelosy", getEquipos);
router.get("/modelos/:id/:id2/:anio", _modelos.getModeloByIdCliente);
router.get("/modelos5/:id/:id2/:anio/:mes", _modelos.getModeloByIdClienteFiltro);
router.get("/modelosx/:mes/:anio", _modelos.getTotalModeloFiltro);
router.get("/modelosy/:anio", _modelos.getTotalModelo);
var _default = router;
exports["default"] = _default;