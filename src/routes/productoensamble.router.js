import { Router } from "express";
import {
    getAllEnsambles,
    getEnsambleById,
    createEnsamble,
    updateEnsamble,
} from "../controllers/productoensamble.controller";

const router = Router();
router.get("/ensamble", getAllEnsambles);
router.get("/ensamble/:id", getEnsambleById);
router.post("ensamble/new", createEnsamble);
//router.put("/ensamble/:id", updateEnsamble);
router.put("/ensamble/x/:id", updateEnsamble);

export default router;
