import { Router } from "express";
import {
    getModeloByIdCliente,
    getTotalModeloFiltro,
    getTotalModelo,
} from "../controllers/modelos.controller";

const router = Router();

//router.get("/modelosy", getEquipos);
router.get("/modelos/:id/:id2", getModeloByIdCliente);
router.get("/modelosx/:mes/:anio", getTotalModeloFiltro);
router.get("/modelosy/:anio", getTotalModelo);

export default router;
