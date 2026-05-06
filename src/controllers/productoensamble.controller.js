import { getConnection, querys, sql } from "../database";

export const getAllEnsambles = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool.request().execute('sp_Produccion_GetAllEnsambles');
      if (!result.recordset || result.recordset.length === 0) {
        return res.json([]); 
      }
      const jsonResult = result.recordset
      .map(row => {
        return Object.values(row)[0]; 
      })
      .join('');

      if (!jsonResult) {
        return res.json([]);
      }
      const data = JSON.parse(jsonResult);
      const finalArray = data.products ? data.products : data;
      res.json(finalArray);
    } catch (error) {
        res.status(500).send({
        message: "Error interno del servidor al procesar la solicitud.",
        error: error.message
      });
    }
  };

  export const getEnsambleById = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await getConnection();
        const result = await pool
        .request()
        .input("id", id)
        .query(querys.getEnsambleById);
      return res.json(result.recordset[0]);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };
  
  export const createEnsamble = async (req, res) => {
    try {
        const ensamble = req.body;
        const pool = await getConnection();
        const result = await pool.request()
        .input('PROD_id', sql.Decimal, ensamble.firstName)
        .input('PROD_ENS_codigo', sql.VarChar(50), ensamble.lastName)
        .input('PROD_ENS_nombre', sql.VarChar(200), ensamble.lastName)
        .input('PROD_ENS_descripcion', sql.VarChar(200), employee.documentNumber)
        .input('PROD_ENS_imagen', sql.VarChar(500), ensamble.city)
        .input('PROD_ENS_TotalMP', sql.Decimal(18, 2), ensamble.position)
        .input('PROD_ENS_TotalMO', sql.Decimal(18, 2), ensamble.department)
        .input('PROD_ENS_TotalCIF', sql.Decimal(18, 2), ensamble.contractType)
        .input('PROD_ENS_Total', sql.Decimal(18, 2), ensamble.workSchedule)
        .input('PROD_ENS_utilidad', sql.Decimal(18, 2), ensamble.baseSalary)
        .input('PROD_ENS_PrecioVenta', sql.Decimal(18, 2), ensamble.annualSalary || 0)
        .query(querys.createEnsamble);
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

  export const updateEnsamble = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = req.body;
        const pool = await getConnection();
        const result = await pool
        .request()
        .input("id", id)
        .input('PROD_id', sql.Decimal, ensamble.firstName)
        .input('PROD_ENS_codigo', sql.VarChar(50), ensamble.lastName)
        .input('PROD_ENS_nombre', sql.VarChar(200), ensamble.lastName)
        .input('PROD_ENS_descripcion', sql.VarChar(200), employee.documentNumber)
        .input('PROD_ENS_imagen', sql.VarChar(500), ensamble.city)
        .input('PROD_ENS_TotalMP', sql.Decimal(18, 2), ensamble.position)
        .input('PROD_ENS_TotalMO', sql.Decimal(18, 2), ensamble.department)
        .input('PROD_ENS_TotalCIF', sql.Decimal(18, 2), ensamble.contractType)
        .input('PROD_ENS_Total', sql.Decimal(18, 2), ensamble.workSchedule)
        .input('PROD_ENS_utilidad', sql.Decimal(18, 2), ensamble.baseSalary)
        .input('PROD_ENS_PrecioVenta', sql.Decimal(18, 2), ensamble.annualSalary || 0)
        .query(querys.updateEnsamble);
  
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

  export const deleteEnsamble = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = req.body;
        const pool = await getConnection();
        const result = await pool
        .request()
        .input("id", id)
        .query(querys.deleteEnsamble);
  
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
