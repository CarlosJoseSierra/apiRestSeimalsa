import { Router } from "express";
import {
  getReporteSabana,
  getReporteCTsinOT,
  getReporteOT,
  getReporteMentenimiento,
} from "../controllers/reportes.controller";

const router = Router();

router.get("/reporte", getReporteSabana);
router.get("/reportex", getReporteCTsinOT);
router.get("/reportey", getReporteOT);
router.get("/reporteurg", getReporteMentenimiento);

export default router;
