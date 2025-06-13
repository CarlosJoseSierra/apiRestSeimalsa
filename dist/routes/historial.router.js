"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _historial = require("../controllers/historial.controller");
var router = (0, _express.Router)();
router.get("/historial1/:id/:id2/:anio", _historial.getHistReparados);
router.get("/historial2/:id/:id2/:anio", _historial.getHistDisponibles);
router.get("/historial3/:id/:id2/:anio", _historial.getHistEntregados);
router.get("/historial/:id/:id2", _historial.getTopFiveItems);
router.get("/historials/:anio", _historial.getTotalItemsServ);
router.get("/historial4/:id/:id2", _historial.getHistorialEquipoEntregado);
router.get("/historial5/:id/:id2", _historial.getHistorialEquipoReparado);
router.get("/historial6/:id/:id2", _historial.getHistorialEquipoDisponible);

//totales de la grafica del area delDashboard
router.get("/historialx/:anio", _historial.getHistorialTotalEquipoReparado);
router.get("/historialy/:anio", _historial.getHistorialTotalEquipoDisponible);
router.get("/historialz/:anio", _historial.getHistorialTotalEquipoEntregado);
//La parte de abajo del dashboard
router.get("/historial4z", _historial.getHistTotalEntregado);
router.get("/historial5x", _historial.getHistTotalReparado);
router.get("/historial6y", _historial.getHistTotalDisponible);
router.get("/historialxyz/:serie/:idCli1/:idCli2", _historial.getHistTotalPorSerie);
router.get("/historialxyz/:serie", _historial.getHistTotalPorSerieInterno);
router.get("/historialxxx/:placa", _historial.getHistTotalPorPlaca);
router.get("/historialxyzw/:serie", _historial.getEntregadosPorSerie);
router.get("/historialzzz/:codigo/:idCli1/:idCli2", _historial.getHistTotalCodSubCliente);
//GLOBAL REFRIGERACION
router.get("/historialxy", _historial.getTotalEquiposMapa);
router.get("/historialT", _historial.getTopFiveTecnicos);
var _default = router;
exports["default"] = _default;