import { getConnection, querys, sql } from "../database";

export const getAllCalificaciones = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool.request().query(querys.getAllCalificciones);
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };
  
  export const createCalificacion = async (req, res) => {
    try {
        const { CAL_numero } = req.body;
        const pool = await getConnection();
        const result = await pool.request()
        .input('CAL_numero', sql.Int, CAL_numero)
        .query(querys.createCalificacion);
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

  