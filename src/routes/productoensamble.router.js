import { Router } from "express";
const storage = require('../libs/multer');
import {
    getAllEnsambles,
    getEnsambleById,
    createEnsamble,
    updateEnsamble,
} from "../controllers/productoensamble.controller";

const router = Router();
router.get("/ensamble", getAllEnsambles);
router.get("/ensamble/:id", getEnsambleById);
//router.post("ensamble/new", createEnsamble);
router.post("/ensamble/new",storage.array('image',1), createEnsamble);
router.put("/ensamble/x/:id", updateEnsamble);

export default router;
