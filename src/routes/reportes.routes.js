import { Router } from "express";
import {
  getReporteSabana,
} from "../controllers/reportes.controller";

const router = Router();

router.get("/reporte", getReporteSabana);

export default router;
