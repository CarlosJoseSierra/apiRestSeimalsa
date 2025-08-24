import { Router } from "express";
import {
  getHistReparados,
  getHistDisponibles,
  getHistEntregados,
  getTopFiveItems,
  getHistorialEquipoEntregado,
  getHistorialEquipoReparado,
  getHistorialEquipoDisponible,
  getHistorialTotalEquipoReparado,
  getHistorialTotalEquipoDisponible,
  getHistorialTotalEquipoEntregado,
  getTotalItemsServ,
  getHistTotalEntregado,
  getHistTotalReparado,
  getHistTotalDisponible,
  getHistTotalPorSerie,
  getHistTotalPorPlaca,
  getEntregadosPorSerie,
  getHistTotalPorSerieInterno,
  getHistTotalCodSubCliente,
  getTotalItemsServFiltro,
  getHistTotalEntregadoFiltro,
  getHistTotalReparadoFiltro,
  getHistTotalDisponibleFiltro,
  getHistorialEquipoEntregadoFiltro,
  getHistorialEquipoReparadoFiltro,
  getHistorialEquipoDisponibleFiltro,
  getTopFiveItemsFiltro,
  getReporteMentenimiento,
  //GLOBAL REFRIGERACION
  getTotalEquiposMapa,
  getTopFiveTecnicos,
  
} from "../controllers/historial.controller";

const router = Router();

router.get("/historial1/:id/:id2/:anio", getHistReparados);///
router.get("/historial2/:id/:id2/:anio", getHistDisponibles);///
router.get("/historial3/:id/:id2/:anio", getHistEntregados);///
router.get("/historial/:id/:id2/:anio", getTopFiveItems);
router.get("/historialtr/:id/:id2/:anio/:mes", getTopFiveItemsFiltro);
router.get("/historials/:anio", getTotalItemsServ);
router.get("/historialc/:anio/:mes", getTotalItemsServFiltro);
router.get("/historial4/:id/:id2/:anio", getHistorialEquipoEntregado);
router.get("/historial41/:id/:id2/:anio/:mes", getHistorialEquipoEntregadoFiltro);
router.get("/historial5/:id/:id2/:anio", getHistorialEquipoReparado);
router.get("/historial51/:id/:id2/:anio/:mes", getHistorialEquipoReparadoFiltro);
router.get("/historial6/:id/:id2/:anio", getHistorialEquipoDisponible);
router.get("/historial61/:id/:id2/:anio/:mes", getHistorialEquipoDisponibleFiltro);

//totales de la grafica del area delDashboard
router.get("/historialx/:anio", getHistorialTotalEquipoReparado);///
router.get("/historialy/:anio", getHistorialTotalEquipoDisponible);///
router.get("/historialz/:anio", getHistorialTotalEquipoEntregado);///
//La parte de abajo del dashboard
router.get("/historial4z/:anio", getHistTotalEntregado);///
router.get("/historial4z1/:anio/:mes", getHistTotalEntregadoFiltro);
router.get("/historial5x/:anio", getHistTotalReparado);///
router.get("/historial5x1/:anio/:mes", getHistTotalReparadoFiltro);
router.get("/historial6y/:anio", getHistTotalDisponible);///
router.get("/historial6y1/:anio/:mes", getHistTotalDisponibleFiltro);
router.get("/historialxyz/:serie/:idCli1/:idCli2", getHistTotalPorSerie);
router.get("/historialxyz/:serie", getHistTotalPorSerieInterno);
router.get("/historialxxx/:placa", getHistTotalPorPlaca);
router.get("/historialxyzw/:serie", getEntregadosPorSerie);
router.get("/historialzzz/:codigo/:idCli1/:idCli2", getHistTotalCodSubCliente);
router.get("/historial/a", getReporteMentenimiento);
//GLOBAL REFRIGERACION
router.get("/historialxy", getTotalEquiposMapa);
router.get("/historialT", getTopFiveTecnicos);


export default router;