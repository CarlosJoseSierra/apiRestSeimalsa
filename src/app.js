import express from "express";
import cors from "cors";
//const cors = require("cors");
import activoRoutes from "./routes/activos.router.js";
import clienteRoutes from "./routes/clientes.router.js";
import equipoRoutes from "./routes/equipos.router.js";
import productRoutes from "./routes/products.routes.js";
import usuarioRoutes from "./routes/usuarios.router.js";
import historialRoutes from "./routes/historial.router.js";
import modeloRoutes from "./routes/modelos.router.js";
import logoRoutes from "./routes/logos.router.js";
import solicitudRoutes from "./routes/solicitudExterna.router.js";
import areaservicioRoutes from "./routes/areaservicio.routes.js";
import localizacionRoutes from "./routes/localizacion.routes.js";
import personareportaRoutes from "./routes/personareporta.router.js";
import tiposervicioPers from "./routes/tiposerviciopers.router.js";
import subclienteRoutes from "./routes/subcliente.router.js";
import facturaRoutes from "./routes/prefactura.routes.js";
import resumenRoutes from "./routes/resumen.routes.js";
import kardexRoutes from "./routes/kardex.routes.js";
import corteInventarioRoutes from "./routes/corteinventario.routes.js";
import reporteRoutes from "./routes/reportes.routes.js";
import correoRoutes from "./routes/correo.routes.js";
//import morgan from "morgan";
//import config from "./config.js";

const app = express();

// Middlewares
app.use(cors());
//app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes

app.use("/api", productRoutes);
app.use("/api", activoRoutes);
app.use("/api", clienteRoutes);
app.use("/api", equipoRoutes);
app.use("/api", usuarioRoutes);
app.use("/api", historialRoutes);
app.use("/api", modeloRoutes);
app.use("/api", logoRoutes);
app.use("/api", solicitudRoutes);
app.use("/api", areaservicioRoutes);
app.use("/api", localizacionRoutes);
app.use("/api", personareportaRoutes);
app.use("/api", tiposervicioPers);
app.use("/api", subclienteRoutes);
app.use("/api", facturaRoutes);
app.use("/api", resumenRoutes);
app.use("/api", kardexRoutes);
app.use("/api", corteInventarioRoutes);
app.use("/api", reporteRoutes);
app.use("/api", correoRoutes);
app.use((req,res,next)=>{
    res.status(404).json({
        message: 'endpoint not found'
    })
});

export default app;
