"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _activosRouter = _interopRequireDefault(require("./routes/activos.router.js"));
var _clientesRouter = _interopRequireDefault(require("./routes/clientes.router.js"));
var _equiposRouter = _interopRequireDefault(require("./routes/equipos.router.js"));
var _productsRoutes = _interopRequireDefault(require("./routes/products.routes.js"));
var _usuariosRouter = _interopRequireDefault(require("./routes/usuarios.router.js"));
var _historialRouter = _interopRequireDefault(require("./routes/historial.router.js"));
var _modelosRouter = _interopRequireDefault(require("./routes/modelos.router.js"));
var _logosRouter = _interopRequireDefault(require("./routes/logos.router.js"));
var _solicitudExternaRouter = _interopRequireDefault(require("./routes/solicitudExterna.router.js"));
var _areaservicioRoutes = _interopRequireDefault(require("./routes/areaservicio.routes.js"));
var _localizacionRoutes = _interopRequireDefault(require("./routes/localizacion.routes.js"));
var _personareportaRouter = _interopRequireDefault(require("./routes/personareporta.router.js"));
var _tiposerviciopersRouter = _interopRequireDefault(require("./routes/tiposerviciopers.router.js"));
var _subclienteRouter = _interopRequireDefault(require("./routes/subcliente.router.js"));
var _prefacturaRoutes = _interopRequireDefault(require("./routes/prefactura.routes.js"));
var _resumenRoutes = _interopRequireDefault(require("./routes/resumen.routes.js"));
var _kardexRoutes = _interopRequireDefault(require("./routes/kardex.routes.js"));
var _corteinventarioRoutes = _interopRequireDefault(require("./routes/corteinventario.routes.js"));
var _reportesRoutes = _interopRequireDefault(require("./routes/reportes.routes.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//const cors = require("cors");

//import morgan from "morgan";
//import config from "./config.js";

var app = (0, _express["default"])();

// Middlewares
app.use((0, _cors["default"])());
//app.use(morgan("dev"));
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use(_express["default"].json());

// Routes

app.use("/api", _productsRoutes["default"]);
app.use("/api", _activosRouter["default"]);
app.use("/api", _clientesRouter["default"]);
app.use("/api", _equiposRouter["default"]);
app.use("/api", _usuariosRouter["default"]);
app.use("/api", _historialRouter["default"]);
app.use("/api", _modelosRouter["default"]);
app.use("/api", _logosRouter["default"]);
app.use("/api", _solicitudExternaRouter["default"]);
app.use("/api", _areaservicioRoutes["default"]);
app.use("/api", _localizacionRoutes["default"]);
app.use("/api", _personareportaRouter["default"]);
app.use("/api", _tiposerviciopersRouter["default"]);
app.use("/api", _subclienteRouter["default"]);
app.use("/api", _prefacturaRoutes["default"]);
app.use("/api", _resumenRoutes["default"]);
app.use("/api", _kardexRoutes["default"]);
app.use("/api", _corteinventarioRoutes["default"]);
app.use("/api", _reportesRoutes["default"]);
app.use(function (req, res, next) {
  res.status(404).json({
    message: 'endpoint not found'
  });
});
var _default = app;
exports["default"] = _default;