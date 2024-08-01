import { Router } from "express";
import {
  getReporteSabana,
  getReporteCTsinOT,
} from "../controllers/reportes.controller";

const router = Router();

router.get("/reporte", getReporteSabana);
router.get("/reportex", getReporteCTsinOT);

export default router;
