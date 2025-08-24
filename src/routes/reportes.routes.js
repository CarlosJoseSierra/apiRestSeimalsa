import { Router } from "express";
import {
  getReporteSabana,
  getReporteCTsinOT,
  getReporteOT,
  getReporteMentenimiento,
  getReporteMantenimientoPorSerie,
} from "../controllers/reportes.controller";

const router = Router();

router.get("/reporte", getReporteSabana);
router.get("/reportex", getReporteCTsinOT);
router.get("/reportey", getReporteOT);
router.get("/reporte/a", getReporteMentenimiento);
router.get("/reporte/z/:serie", getReporteMantenimientoPorSerie);

export default router;
