import { Router } from "express";
import {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
} from "../controllers/employee.controller";

// Rutas CRUD para empleados
const router = Router();
// GET /api/employees - Obtener todos los empleados
router.get("empleado/", getAllEmployees);

// GET /api/employees/:id - Obtener un empleado por ID
router.get("empleado/:id", getEmployeeById);

// POST /api/employees - Crear un nuevo empleado
router.post("empleado", createEmployee);

// PUT /api/employees/:id - Actualizar un empleado
router.put("empleado/:id", updateEmployee);

// DELETE /api/employees/:id - Eliminar un empleado
router.put("empleado/x/:id", deleteEmployee);

export default router;
