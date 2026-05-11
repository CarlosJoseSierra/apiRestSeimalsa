"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _employee = require("../controllers/employee.controller");
// Rutas CRUD para empleados
var router = (0, _express.Router)();
router.get("/empleado", _employee.getAllEmployees);
router.get("/empleado/:id", _employee.getEmployeeById);
router.post("/empleado/new", _employee.createEmployee);
router.put("/empleado/x/:id", _employee.updateEmployee);
var _default = router;
exports["default"] = _default;