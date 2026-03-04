"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _manoobra = require("../controllers/manoobra.controller");
// Rutas CRUD para empleados
var router = (0, _express.Router)();
// GET /api/employees - Obtener todos los empleados
router.get("obra/", _manoobra.getAllMO);

// GET /api/employees/:id - Obtener un empleado por ID
router.get("obra/:id", _manoobra.getMOById);

// POST /api/employees - Crear un nuevo empleado
router.post("obra", _manoobra.createMO);

// PUT /api/employees/:id - Actualizar un empleado
router.put("obra/:id", _manoobra.updateMO);
var _default = router;
exports["default"] = _default;