"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _productoensamble = require("../controllers/productoensamble.controller");
var storage = require('../libs/multer');
var router = (0, _express.Router)();
router.get("/ensamble", _productoensamble.getAllEnsambles);
router.get("/ensamble/:id", _productoensamble.getEnsambleById);
//router.post("ensamble/new", createEnsamble);
router.post("/ensamble/new", storage.single('image'), _productoensamble.createEnsamble);
router.put("/ensamble/x/:id", _productoensamble.updateEnsamble);
var _default = router;
exports["default"] = _default;