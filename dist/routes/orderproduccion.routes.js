"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _orderproduccion = require("../controllers/orderproduccion.controller");
var router = (0, _express.Router)();
router.get("/ordprod/", _orderproduccion.getAllOrdenP);
router.get("/ordprod/:id", _orderproduccion.getOrdenPById);
router.post("/ordprod/new", _orderproduccion.createOrdenP);
router.put("/ordprod/x/:id", _orderproduccion.updateOrdenP);
var _default = router;
exports["default"] = _default;