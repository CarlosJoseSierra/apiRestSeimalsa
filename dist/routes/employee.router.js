"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _employee = require("../controllers/employee.controller");
// Rutas CRUD para empleados
var router = (0, _express.Router)();
// GET /api/employees - Obtener todos los empleados
router.get("empleado/", _employee.getAllEmployees);

// GET /api/employees/:id - Obtener un empleado por ID
router.get("empleado/:id", _employee.getEmployeeById);

// POST /api/employees - Crear un nuevo empleado
router.post("empleado", _employee.createEmployee);

// PUT /api/employees/:id - Actualizar un empleado
router.put("empleado/:id", _employee.updateEmployee);

// DELETE /api/employees/:id - Eliminar un empleado
router.put("empleado/x/:id", _employee.deleteEmployee);
var _default = router;
exports["default"] = _default;