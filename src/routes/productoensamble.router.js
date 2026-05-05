import { Router } from "express";
import {
    getAllEnsambles,
    getEnsambleById,
    createEnsamble,
    updateEnsamble,
    deleteEnsamble,
} from "../controllers/productoensamble.controller";

const router = Router();
router.get("/ensamble", getAllEnsambles);
router.get("/ensamble/:id", getEnsambleById);
router.post("ensamble", createEnsamble);
router.put("/ensamble/:id", updateEnsamble);
router.put("/ensamble/x/:id", deleteEnsamble);

export default router;
