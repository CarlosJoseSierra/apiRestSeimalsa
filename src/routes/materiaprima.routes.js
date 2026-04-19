import { Router } from "express";
import {
    getAllMP,
    getMPById,
    createMP,
    updateMP,
} from "../controllers/materiaprima.controller";

const router = Router();
router.get("/materia", getAllMP);
router.get("/materia/:id", getMPById);
router.post("/materia", createMP);
router.put("/materia/:id", updateMP);

export default router;
