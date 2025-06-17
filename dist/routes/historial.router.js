"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _historial = require("../controllers/historial.controller");
var router = (0, _express.Router)();
router.get("/historial1/:id/:id2/:anio", _historial.getHistReparados); ///
router.get("/historial2/:id/:id2/:anio", _historial.getHistDisponibles); ///
router.get("/historial3/:id/:id2/:anio", _historial.getHistEntregados); ///
router.get("/historial/:id/:id2/:anio", _historial.getTopFiveItems);
router.get("/historialtr/:id/:id2/:anio/:mes", _historial.getTopFiveItemsFiltro);
router.get("/historials/:anio", _historial.getTotalItemsServ);
router.get("/historialc/:anio/:mes", _historial.getTotalItemsServFiltro);
router.get("/historial4/:id/:id2/:anio", _historial.getHistorialEquipoEntregado);
router.get("/historial41/:id/:id2/:anio:/mes", _historial.getHistorialEquipoEntregadoFiltro);
router.get("/historial5/:id/:id2/:anio", _historial.getHistorialEquipoReparado);
router.get("/historial51/:id/:id2/:anio:/mes", _historial.getHistorialEquipoReparadoFiltro);
router.get("/historial6/:id/:id2/:anio", _historial.getHistorialEquipoDisponible);
router.get("/historial61/:id/:id2/:anio:/mes", _historial.getHistorialEquipoDisponibleFiltro);

//totales de la grafica del area delDashboard
router.get("/historialx/:anio", _historial.getHistorialTotalEquipoReparado); ///
router.get("/historialy/:anio", _historial.getHistorialTotalEquipoDisponible); ///
router.get("/historialz/:anio", _historial.getHistorialTotalEquipoEntregado); ///
//La parte de abajo del dashboard
router.get("/historial4z/:anio", _historial.getHistTotalEntregado); ///
router.get("/historial4z1/:anio/:mes", _historial.getHistTotalEntregadoFiltro);
router.get("/historial5x/:anio", _historial.getHistTotalReparado); ///
router.get("/historial5x1/:anio/:mes", _historial.getHistTotalReparadoFiltro);
router.get("/historial6y/:anio", _historial.getHistTotalDisponible); ///
router.get("/historial6y1/:anio/:mes", _historial.getHistTotalDisponibleFiltro);
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