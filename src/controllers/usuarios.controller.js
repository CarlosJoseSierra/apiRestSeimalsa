import { getConnection } from "../database/connection";
import sql from "mssql"; // <--- ESTA ES LA LÍNEA CLAVE
import { querys } from "../database/querys";
const cloudinary = require("../libs/cloudinary");

const jwt = require('jsonwebtoken');

export const getUsuarios = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getAllUsuarios);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getUser = async(req, res) =>{
  const { USU_usuario, USU_clave } = req.body;
  
  //return res.status(200).json({ status: "200",msg: "Hola" + req.params.USU_usuario});
  console.log(req.body);

   if (USU_usuario == null || USU_clave == null) {
      return res.status(400).json({ status: "400",msg: "Favor ingresar Datos Requeridos" });
    }
    else
    {

      return res.status(200).json({ status: "200",msg: "Bienvenido" });
    }
}

export const getByUserPass = async (req, res) => {
  const {
    USU_usuario,
    USU_clave,
    dispositivoId
  } = req.body;

  if (
    USU_usuario == null ||
    USU_clave == null
  ) {
    return res.status(400).json({
      status: "400",
      msg: "Favor ingresar Datos Requeridos"
    });
  }

  try {
    const pool = await getConnection();
    if (!pool) {
      return res.status(500).json({
        status: "500",
        msg: "No se pudo conectar a la base de datos",
        token: 0
      });
    }

    const result =
      await pool
        .request()
        .input("USU_usuario",sql.VarChar,USU_usuario)
        .query(querys.getUserPass);

    if (!result.recordset[0]) {
      return res.status(400).json({
        status: "400",
        msg: "El user es incorrecto",
        token: 0
      });
    }
    const usuario = result.recordset[0];
    if (
      usuario.USU_clave !==
      USU_clave
    ) {
      return res.status(400).json({
        status: "400",
        msg: "El password es incorrecto",
        token: 0
      });
    }
    if (
      String(usuario.USU_rol)
        .trim()
        .toUpperCase()
        === "TECNICO"
    ) {

      if (
        !dispositivoId ||
        String(dispositivoId).trim() === ""
      ) {

        return res.status(403).json({
          status: "403",
          codigo:
            "DISPOSITIVO_NO_IDENTIFICADO",
          msg:
            "No fue posible identificar este dispositivo.",
          token: 0
        });
      }
      const dispositivoResult =
        await pool
          .request()
          .input("UD_USU_id",sql.Decimal,usuario.USU_id)
          .input("UD_dispositivoId",sql.VarChar,String(dispositivoId).trim())
          .query(`
            SELECT TOP 1
                UD_id,
                UD_USU_id,
                UD_dispositivoId,
                UD_nombre,
                UD_estado
            FROM USUARIO_DISPOSITIVO
            WHERE
                UD_USU_id =
                    @UD_USU_id
                AND UD_dispositivoId =
                    @UD_dispositivoId
                AND UD_estado = 1
          `);
      if (
        dispositivoResult
          .recordset
          .length === 0
      ) {
        return res
          .status(403)
          .json({
            status: "403",
            codigo:
              "DISPOSITIVO_NO_AUTORIZADO",
            msg:
              "Este dispositivo no está autorizado para este técnico.",
            dispositivoId:
              String(dispositivoId).trim(),
            token: 0
          });
      }

      const dispositivo =
        dispositivoResult
          .recordset[0];
      await pool
        .request()
        .input(
          "UD_id",
          sql.Int,
          dispositivo.UD_id
        )
        .query(`UPDATE USUARIO_DISPOSITIVO SET UD_ultimoAcceso = GETDATE() WHERE UD_id = @UD_id`);
    }

    const userFormToken = {

      id:usuario.USU_id,

      nameU:usuario.USU_usuario
    };

    const token =
      '00ggg';
    return res.json({
      status: "ok",
      msg:
        usuario,
      token:
        token
    });
  } catch (error) {
    console.error(
      "Error en login:",
      error
    );

    if (!res.headersSent) {
      return res
        .status(500)
        .json({
          status: "500",

          msg:
            error.message,
          token: 0
        });
    }
  }
};

export const createFirmaUser = async (req, res) => {
  try{
    let firma=''; 
    const imagen = req.file;

    if(imagen){
      const resultadoCloudinary = await cloudinary.uploader.upload(imagen.path,{folder: 'seimalsa'});
      firma = resultadoCloudinary.secure_url;
    }
    
    const pool = await getConnection();

    const result = await pool
        .request()
        .input("USU_id",sql.Decimal(18, 0), req.params.id)
        .input('USU_firma',sql.VarChar(1000),firma)
        .execute(
          'dbo.sp_AreaServicio_InsertarFirmaUsuario'
        );
        const registro = result.recordset?.[0];
  
      return res.status(200).json({
        status: registro?.status ?? 'ok',
        msg: registro?.msg ?? 'Registro exitoso',
        token: 0
      });
    } catch (error) {
      console.error(
        'Error insertando la firma:',
        error
      );
  
      return res.status(500).json({
        status: 'error',
        msg:
          error?.originalError?.info?.message ??
          error?.message ??
          'No se pudo registrar la firma.',
        token: 0
      });
    }
};

export const getUsuarioById = async (req, res) => {
    try {
        const pool = await getConnection();
    
        const result = await pool
          .request()
          .input("id", req.params.id)
          .query(querys.getUsuarioById);
        return res.json(result.recordset[0]);
      } catch (error) {
        res.status(500);
        res.send(error.message);
      }
  };

  export const getUsuarioByCargo = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool.request().query(querys.getAllUsuariosByCargo);
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

export const getFirma = async (req, res) => {
  try{
    const pool = await getConnection();
      const result = await pool.request()
      .input("id", req.params.id)
      .query(querys.getFirmaTecnico);
      res.json(result.recordset);
  }
  catch(error){
    res.status(500);
    res.send(error.message);
  }
};