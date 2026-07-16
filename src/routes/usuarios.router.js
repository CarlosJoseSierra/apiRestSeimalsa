import { Router } from "express";
const storage = require('../libs/multer');
import {
  getUsuarios,
  getUsuarioByCargo,
  getByUserPass,
  createFirmaUser,
} from "../controllers/usuarios.controller";

const router = Router();

router.get("/usuarios", getUsuarios);

//router.get("/usuarios/:id", getUsuarioById);

router.post("/usuarios/login", getByUserPass);
//router.post("/usuarios/login", getUser);
router.get("/usuarios/tec", getUsuarioByCargo);
router.post("/usuarios/new", storage.single('image'),createFirmaUser);
//router.get('/usuarios/get/:id',getFirma);
export default router;
