import { Router } from "express";
const storage = require('../libs/multer');
import {
    getAreaBySerie,
    getAreaByPlaca,
    getAreaSinTecnico,
    updateActivoByTecnico,
    getAreaByTecnico,
    createNewAreaServicio,
    getAreaServicioMovimiento,
    getAreaServicioMantenimiento,
    getReporteGeneral,
    getEntregadosHeineken,
    getEntregadosPronaca,
    getEntregadosTesalia,
    getEntregadosUnilever,
    getEntregadosElRosado,
    getEntregadosArca,
    getDetalleCTById,
    getReparacionesXtecnico,
    updateAreaServicio,
    obtenerPDFReparacion,
    obtenerMapaEquipos,
    obtenerDashboardTecnico,
} from "../controllers/areaservicio.controller";

const router = Router();

router.get("/areaservicio/tec/:idTecnico",getReparacionesXtecnico);
router.get("/areaservicio/:serie/:idCliente1/:idCliente2", getAreaBySerie);
router.get("/areaservicio/x/:placa/:idCliente1/:idCliente2", getAreaByPlaca);

router.post("/areaservicio/new", storage.array('image',7),createNewAreaServicio);

router.get("/areaservicio/x", getAreaSinTecnico); //Obtengo el listado de cts que no se haya asignado tecnico

router.put("/areaservicio/x/:id", updateActivoByTecnico); //Actualizo ct pot tecnico

router.get("/areaservicio/y/:id", getAreaByTecnico); //Obtengo las tareas pendientes de los tecnicos

router.get("/areaservicio/mov", getAreaServicioMovimiento); //Obtengo las cts con area de servicio movimiento

router.get("/areaservicio/mant", getAreaServicioMantenimiento); //Obtengo las cts con area de servicio mantenimiento

router.get("/areaservicio/z", getReporteGeneral);

router.get("/areaservicio/H", getEntregadosHeineken);
router.get("/areaservicio/P", getEntregadosPronaca);
router.get("/areaservicio/T", getEntregadosTesalia);
router.get("/areaservicio/U", getEntregadosUnilever);
router.get("/areaservicio/R", getEntregadosElRosado);
router.get("/areaservicio/A", getEntregadosArca);
router.get("/areaservicio/DET/:id", getDetalleCTById);
router.put("/areaservicio/:id", storage.array('image',7), updateAreaServicio);
router.get('/areaservicio/:id/pdf',obtenerPDFReparacion);
router.get('/areaservicio/mapa/equipos',obtenerMapaEquipos);
router.get('/areaservicio/dashboard/:usuarioId',obtenerDashboardTecnico);
export default router;
