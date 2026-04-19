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
router.get("/empleado", getAllEmployees);
router.get("/empleado/:id", getEmployeeById);
router.post("/empleado", createEmployee);
router.put("/empleado/:id", updateEmployee);
router.put("/empleado/x/:id", deleteEmployee);

export default router;
