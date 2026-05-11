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
        const { Descripcion, Medida, Costo, Categoria } = req.body;
        let costoFinal;
        
        if (typeof Costo === 'string') {
            costoFinal = parseFloat(Costo.replace(',', '.'));
        } else {
            costoFinal = Costo;
        }
       
        const pool = await getConnection();
        const result = await pool.request()
        .input("MP_descripcion", sql.VarChar, Descripcion)
        .input("MP_medida", sql.VarChar, Medida)
        .input("MP_costo", sql.Decimal(18, 4), costoFinal)
        .input("MP_categoria", sql.VarChar, Categoria)
        .query(querys.createMP);
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
        let costoFinal;
        if (typeof Costo === 'string') {
          costoFinal = parseFloat(Costo.replace(',', '.'));
      } else {
          costoFinal = Costo;
      }
        const pool = await getConnection();
        const result = await pool
        .request()
        .input("id", id)
        .input("MP_descripcion", sql.VarChar, materia.Descripcion)
        .input("MP_medida", sql.VarChar, materia.Medida)
        .input("MP_costo", sql.Decimal(18, 4), costoFinal)
        .input("MP_categoria", sql.VarChar, materia.Categoria)
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

