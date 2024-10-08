"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _reportes = require("../controllers/reportes.controller");
var router = (0, _express.Router)();
router.get("/reporte", _reportes.getReporteSabana);
router.get("/reportex", _reportes.getReporteCTsinOT);
router.get("/reportey", _reportes.getReporteOT);
var _default = router;
exports["default"] = _default;