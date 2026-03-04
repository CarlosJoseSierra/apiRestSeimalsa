"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _productoensamble = require("../controllers/productoensamble.controller");
var router = (0, _express.Router)();
router.get("ensamble/", _productoensamble.getAllEnsambles);
router.get("ensamble/:id", _productoensamble.getEnsambleById);
router.post("empleado", _productoensamble.createEnsamble);
router.put("ensamble/:id", _productoensamble.updateEnsamble);
router.put("ensamble/x/:id", _productoensamble.deleteEnsamble);
var _default = router;
exports["default"] = _default;