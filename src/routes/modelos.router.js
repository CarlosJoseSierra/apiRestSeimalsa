import { Router } from "express";
import {
    getModeloByIdCliente,
    getTotalModeloFiltro,
    getTotalModelo,
    getModeloByIdClienteFiltro,
} from "../controllers/modelos.controller";

const router = Router();

//router.get("/modelosy", getEquipos);
router.get("/modelos/:id/:id2/:anio", getModeloByIdCliente);
router.get("/modelos5/:id/:id2/:anio/:mes", getModeloByIdClienteFiltro);
router.get("/modelosx/:mes/:anio", getTotalModeloFiltro);
router.get("/modelosy/:anio", getTotalModelo);

export default router;
