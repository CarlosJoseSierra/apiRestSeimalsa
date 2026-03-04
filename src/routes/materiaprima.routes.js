import { Router } from "express";
import {
    getAllMP,
    getMPById,
    createMP,
    updateMP,
} from "../controllers/materiaprima.controller";

// Rutas CRUD para empleados
const router = Router();
// GET /api/employees - Obtener todos los empleados
router.get("materia/", getAllMP);

// GET /api/employees/:id - Obtener un empleado por ID
router.get("materia/:id", getMPById);

// POST /api/employees - Crear un nuevo empleado
router.post("materia", createMP);

// PUT /api/employees/:id - Actualizar un empleado
router.put("materia/:id", updateMP);

export default router;
