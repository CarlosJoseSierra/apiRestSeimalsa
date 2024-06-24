import { Router } from "express";
import {
    EnviarCorreo,
} from "../controllers/correo.controller";

const router = Router();

router.post("/envio", EnviarCorreo);

export default router;