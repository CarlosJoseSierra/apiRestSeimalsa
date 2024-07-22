import { Router } from "express";
import {
  getClienteKardex,
  getClienteKardexP,
  getClienteKardexA,
  getClienteKardexU,

} from "../controllers/kardex.controller";

const router = Router();

router.get("/kardex", getClienteKardex);
router.get("/kardexP", getClienteKardexP);
router.get("/kardexA", getClienteKardexA);
router.get("/kardexU", getClienteKardexU);

export default router;
