import { Router } from "express";
import {
    getAllCIF,
    getCIFById,
    createCIF,
    updateCIF,
} from "../controllers/cif.controller";

// Rutas CRUD para empleados
const router = Router();
router.get("cif/", getAllCIF);
router.get("cif/:id", getCIFById);
router.post("cif", createCIF);
router.put("cif/:id", updateCIF);

export default router;
