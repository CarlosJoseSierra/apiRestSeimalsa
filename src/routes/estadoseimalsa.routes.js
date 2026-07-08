import { Router } from "express";
import {
    getAllES,
} from "../controllers/estadoseimalsa.controller";

const router = Router();
router.get("/es/", getAllES);

export default router;
