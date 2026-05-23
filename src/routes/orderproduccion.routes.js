import { Router } from "express";
import {
    getAllOrdenP,
    getOrdenPById,
    createOrdenP,
    updateOrdenP,
} from "../controllers/orderproduccion.controller";

const router = Router();
router.get("/ordprod/", getAllOrdenP);
router.get("/ordprod/:id", getOrdenPById);
router.post("/ordprod/new", createOrdenP);
router.put("/ordprod/x/:id", updateOrdenP);

export default router;