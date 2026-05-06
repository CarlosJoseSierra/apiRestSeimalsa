import { getConnection, querys, sql } from "../database";

export const getAllMP = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool.request().query(querys.getAllMP);
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  export const getMPById = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await getConnection();
        const result = await pool
        .request()
        .input("id", id)
        .query(querys.getMPById);
      return res.json(result.recordset[0]);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };
  
  export const createMP = async (req, res) => {
    try {
        //const materia = req.body;
        const { Descripcion, Medida, Costo, Categoria } = req.body;
        console.log(req.body);
        const pool = await getConnection();
        const result = await pool.request()
        .input('MP_descripcion', sql.VarChar, Descripcion)
        .input('MP_medida', sql.VarChar, Medida)
        .input('MP_costo', sql.Decimal(18, 4), Costo)
        .input('MP_categoria', sql.VarChar, Categoria)
        .query(querys.createMP);
        console.log(result);
        if(result.rowsAffected==1){
          return res.status(200).json({ status: "ok", msg: "Registro exitoso" ,token:0});
        }else{
          return res.status(400).json({ status: "400", msg: "No se pudo registrar, consulte al administrador" ,token:0});
        }
      
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  export const updateMP = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = req.body;
        const pool = await getConnection();
        const result = await pool
        .request()
        .input("id", id)
        .input('MP_descripcion', sql.VarChar(500), materia.Descripcion)
        .input('MP_medida', sql.VarChar(50), materia.Medida)
        .input('MP_costo', sql.Decimal(18, 4), materia.Costo)
        .input('MP_categoria', sql.VarChar(100), materia.Categoria)
        .query(querys.updateMP);
     if(result.rowsAffected==1){
      return res.status(200).json({ status: "ok", msg: "Actualizacion exitosa" ,token:0});
    }else{
      return res.status(400).json({ status: "400", msg: "No se pudo actualizar, consulte al administrador" ,token:0});
    }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

