import { getConnection, querys, sql } from "../database";

export const getAllCIF = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool.request().query(querys.getAllCIF);
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  export const getCIFById = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await getConnection();
        const result = await pool
        .request()
        .input("id", id)
        .query(querys.getCIFById);
      return res.json(result.recordset[0]);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };
  
  export const createCIF = async (req, res) => {
    try {
        const materia = req.body;
        const pool = await getConnection();
        const result = await pool.request()
        .input('CI_descripcion', sql.VarChar(500), materia.description)
        .input('CI_valor', sql.Decimal(18, 2), materia.defaultAmount || 0)
        .query(querys.createCIF);
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

  export const updateMO = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = req.body;
        const pool = await getConnection();
        const result = await pool
        .request()
        .input("id", id)
        .input('CI_descripcion', sql.VarChar(500), materia.description)
        .input('CI_valor', sql.Decimal(18, 2), materia.defaultAmount || 0)
        .query(querys.updateMO);
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

