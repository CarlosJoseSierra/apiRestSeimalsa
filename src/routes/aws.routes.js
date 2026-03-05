import { Router } from "express";
import { updateIpAccess } from "../controllers/aws.controller";

const router = Router();

// Esta es la ruta que llamará tu Angular: /api/aws/update-ip
router.post("/aws/update-ip/:name", updateIpAccess);

export default router;