"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _materiaprima = require("../controllers/materiaprima.controller");
// Rutas CRUD para empleados
var router = (0, _express.Router)();
// GET /api/employees - Obtener todos los empleados
router.get("materia/", _materiaprima.getAllMP);

// GET /api/employees/:id - Obtener un empleado por ID
router.get("materia/:id", _materiaprima.getMPById);

// POST /api/employees - Crear un nuevo empleado
router.post("materia", _materiaprima.createMP);

// PUT /api/employees/:id - Actualizar un empleado
router.put("materia/:id", _materiaprima.updateMP);
var _default = router;
exports["default"] = _default;