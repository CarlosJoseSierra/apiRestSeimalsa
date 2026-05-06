"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _cif = require("../controllers/cif.controller");
var router = (0, _express.Router)();
router.get("/cif/", _cif.getAllCIF);
router.get("/cif/:id", _cif.getCIFById);
router.post("/cif/new", _cif.createCIF);
router.put("/cif/x/:id", _cif.updateCIF);
var _default = router;
exports["default"] = _default;