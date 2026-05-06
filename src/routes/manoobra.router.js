import { Router } from "express";
import {
    getAllMO,
    getMOById,
    createMO,
    updateMO,
} from "../controllers/manoobra.controller";

const router = Router();
router.get("/obra", getAllMO);
router.get("/obra/:id", getMOById);
router.post("/obra/new", createMO);
router.put("/obra/x/:id", updateMO);

export default router;
