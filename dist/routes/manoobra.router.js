"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _manoobra = require("../controllers/manoobra.controller");
var router = (0, _express.Router)();
router.get("/obra", _manoobra.getAllMO);
router.get("/obra/:id", _manoobra.getMOById);
router.post("/obra/new", _manoobra.createMO);
router.put("/obra/x/:id", _manoobra.updateMO);
var _default = router;
exports["default"] = _default;