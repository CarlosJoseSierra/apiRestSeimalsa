import { Router } from "express";
const storage = require('../libs/multer');
import {
  getUsuarios,
  getUsuarioByCargo,
  getByUserPass,
  createFirmaUser,
  getFirma,
} from "../controllers/usuarios.controller";

const router = Router();

router.get("/usuarios", getUsuarios);

//router.get("/usuarios/:id", getUsuarioById);

router.post("/usuarios/login", getByUserPass);
//router.post("/usuarios/login", getUser);
router.get("/usuarios/tec", getUsuarioByCargo);
router.put("/usuarios/new/:id", storage.single('image'),createFirmaUser);
router.get('/usuarios/get/:id',getFirma);
export default router;
