import { Router } from "express";
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
} from "../controllers/areaservicio.controller";

const router = Router();

router.get("/areaservicio/:serie/:idCliente1/:idCliente2", getAreaBySerie);

router.get("/areaservicio/x/:placa/:idCliente1/:idCliente2", getAreaByPlaca);

router.post("/areaservicio", createNewAreaServicio);

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

export default router;
