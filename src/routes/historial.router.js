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
  //GLOBAL REFRIGERACION
  getTotalEquiposMapa,
  getTopFiveTecnicos,
  
} from "../controllers/historial.controller";

const router = Router();

router.get("/historial1/:id/:id2", getHistReparados);
router.get("/historial2/:id/:id2", getHistDisponibles);
router.get("/historial3/:id/:id2", getHistEntregados);
router.get("/historial/:id/:id2", getTopFiveItems);
router.get("/historials", getTotalItemsServ);
router.get("/historial4/:id/:id2", getHistorialEquipoEntregado);
router.get("/historial5/:id/:id2", getHistorialEquipoReparado);
router.get("/historial6/:id/:id2", getHistorialEquipoDisponible);

//totales de la grafica del area delDashboard
router.get("/historialx", getHistorialTotalEquipoReparado);
router.get("/historialy", getHistorialTotalEquipoDisponible);
router.get("/historialz", getHistorialTotalEquipoEntregado);
//La parte de abajo del dashboard
router.get("/historial4z", getHistTotalEntregado);
router.get("/historial5x", getHistTotalReparado);
router.get("/historial6y", getHistTotalDisponible);
router.get("/historialxyz/:serie/:idCli1/:idCli2", getHistTotalPorSerie);
router.get("/historialxyz/:serie", getHistTotalPorSerieInterno);
router.get("/historialxxx/:placa", getHistTotalPorPlaca);
router.get("/historialxyzw/:serie", getEntregadosPorSerie);

//GLOBAL REFRIGERACION
router.get("/historialxy", getTotalEquiposMapa);
router.get("/historialT", getTopFiveTecnicos);


export default router;