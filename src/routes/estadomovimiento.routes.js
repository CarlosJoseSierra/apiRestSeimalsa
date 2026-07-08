import { Router } from "express";
import {
    getAllEM,
} from "../controllers/estadomovimiento.controller";

const router = Router();
router.get("/em/", getAllEM);

export default router;
