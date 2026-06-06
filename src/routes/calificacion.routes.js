import { Router } from "express";
import {
    getAllCalificaciones,
    createCalificacion,
} from "../controllers/calificacion.controller";

const router = Router();
router.get("/calificacion/", getAllCalificaciones);
router.post("/calificacion/new", createCalificacion);

export default router;