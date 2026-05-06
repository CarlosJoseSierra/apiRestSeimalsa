import { Router } from "express";
import {
    getAllCIF,
    getCIFById,
    createCIF,
    updateCIF,
} from "../controllers/cif.controller";

const router = Router();
router.get("/cif/", getAllCIF);
router.get("/cif/:id", getCIFById);
router.post("/cif/new", createCIF);
router.put("/cif/x/:id", updateCIF);

export default router;
