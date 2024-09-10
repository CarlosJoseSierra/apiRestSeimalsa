import { Router } from "express";
import {
  getReporteSabana,
  getReporteCTsinOT,
  getReporteOT,
} from "../controllers/reportes.controller";

const router = Router();

router.get("/reporte", getReporteSabana);
router.get("/reportex", getReporteCTsinOT);
router.get("/reportey", getReporteOT);

export default router;
