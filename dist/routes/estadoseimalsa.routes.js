"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _estadoseimalsa = require("../controllers/estadoseimalsa.controller");
var router = (0, _express.Router)();
router.get("/es/", _estadoseimalsa.getAllES);
var _default = router;
exports["default"] = _default;