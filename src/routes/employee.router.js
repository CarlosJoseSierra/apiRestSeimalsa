import { Router } from "express";
import {
    getAllEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
} from "../controllers/employee.controller";

// Rutas CRUD para empleados
const router = Router();
router.get("/empleado", getAllEmployees);
router.get("/empleado/:id", getEmployeeById);
router.post("/empleado/new", createEmployee);
router.put("/empleado/x/:id", updateEmployee);

export default router;
