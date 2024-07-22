import { Router } from "express";
import {
  getClienteKardex,
  getClienteKardexP,
  getClienteKardexA,
  getClienteKardexU,
  getClienteKardexT,
  getClienteKardexR,

} from "../controllers/kardex.controller";

const router = Router();

router.get("/kardex", getClienteKardex);
router.get("/kardexP", getClienteKardexP);
router.get("/kardexA", getClienteKardexA);
router.get("/kardexU", getClienteKardexU);
router.get("/kardexT", getClienteKardexT);
router.get("/kardexR", getClienteKardexR);

export default router;
