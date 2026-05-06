"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _materiaprima = require("../controllers/materiaprima.controller");
var router = (0, _express.Router)();
router.get("/materia", _materiaprima.getAllMP);
router.get("/materia/:id", _materiaprima.getMPById);
router.post("/materia/new", _materiaprima.createMP);
router.put("/materia/x/:id", _materiaprima.updateMP);
var _default = router;
exports["default"] = _default;