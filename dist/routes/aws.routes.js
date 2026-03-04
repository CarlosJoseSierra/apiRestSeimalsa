"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _aws = require("../controllers/aws.controller");
var router = (0, _express.Router)();

// Esta es la ruta que llamará tu Angular: /api/aws/update-ip
router.post("/aws/update-ip", _aws.updateIpAccess);
var _default = router;
exports["default"] = _default;