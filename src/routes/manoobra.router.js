import { Router } from "express";
import {
    getAllMO,
    getMOById,
    createMO,
    updateMO,
} from "../controllers/manoobra.controller";

// Rutas CRUD para empleados
const router = Router();
// GET /api/employees - Obtener todos los empleados
router.get("obra/", getAllMO);

// GET /api/employees/:id - Obtener un empleado por ID
router.get("obra/:id", getMOById);

// POST /api/employees - Crear un nuevo empleado
router.post("obra", createMO);

// PUT /api/employees/:id - Actualizar un empleado
router.put("obra/:id", updateMO);

export default router;
