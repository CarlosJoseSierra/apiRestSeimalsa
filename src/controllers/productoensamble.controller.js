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
      const {
        PROD_codigo, PROD_nombre, PROD_medida, PROD_costoUnitario,
        PROD_TotalMP, PROD_TotalMO, PROD_TotalCIF, PROD_TotalFInal,
        PROD_itemsXhora, PROD_mp, PROD_mo, PROD_cif
    } = req.body;
        const materiales = JSON.parse(PROD_mp);
        const manoObra = JSON.parse(PROD_mo);
        const cif = JSON.parse(PROD_cif);
        await transaction.begin();
        const pool = await getConnection();
        const result = await pool.request()
        .input('PROD_codigo', sql.VarChar, PROD_codigo)
            .input('PROD_nombre', sql.VarChar, PROD_nombre)
            .input('PROD_medida', sql.VarChar, PROD_medida)
            .input('PROD_costoUnitario', sql.Decimal(18, 4), PROD_costoUnitario)
            .input('PROD_TotalMP', sql.Decimal(18, 4), PROD_TotalMP)
            .input('PROD_TotalMO', sql.Decimal(18, 4), PROD_TotalMO)
            .input('PROD_TotalCIF', sql.Decimal(18, 4), PROD_TotalCIF)
            .input('PROD_TotalFInal', sql.Decimal(18, 4), PROD_TotalFInal)
            .input('PROD_itemsXhora', sql.Int, PROD_itemsXhora)
            .query(`INSERT INTO PRODUCTO (PROD_codigo, PROD_nombre, PROD_medida, PROD_costoUnitario, PROD_TotalMP, PROD_TotalMO, PROD_TotalCIF, PROD_TotalFInal, PROD_itemsXhora, PROD_item) 
                    VALUES (@PROD_codigo, @PROD_nombre, @PROD_medida, @PROD_costoUnitario, @PROD_TotalMP, @PROD_TotalMO, @PROD_TotalCIF, @PROD_TotalFInal, @PROD_itemsXhora, 'PRODUCCION');
                    SELECT SCOPE_IDENTITY() AS id;`);
      const PROD_id = resultHeader.recordset[0].id;
      for (const m of materiales) {
        await new sql.Request(transaction)
            .input('PROD_id', sql.Int, PROD_id)
            .input('MP_id', sql.Int, m.MP_id)
            .input('cantidad', sql.Decimal(18, 4), m.cantidad)
            .input('costo', sql.Decimal(18, 4), m.MP_costo)
            .query(`INSERT INTO PRODUCTO_DET_MP (PROD_DETMP_PROD_id, PROD_DETMP_MP_id, PROD_DETMP_MP_cantidad, PROD_DETMP_MP_costo) 
                    VALUES (@PROD_id, @MP_id, @cantidad, @costo)`);
      }
      for (const mo of manoObra) {
        const resultMO = await new sql.Request(transaction)
            .input('PROD_id', sql.Int, PROD_id)
            .input('MO_id', sql.Int, mo.MO_id)
            .input('costoHora', sql.Decimal(18, 4), mo.cantidad) // cantidad es suma salarios en tu front
            .query(`INSERT INTO PRODUCTO_DET_MO (PROD_DETMO_PROD_id, PROD_DETMO_MO_id, PROD_DETMO_MO_costoHora) 
                    VALUES (@PROD_id, @MO_id, @costoHora);
                    SELECT SCOPE_IDENTITY() AS mo_det_id;`);

        const mo_det_id = resultMO.recordset[0].mo_det_id;

        // Insertar empleados asignados a esta mano de obra
        for (const emp of mo.empleadosSeleccionados) {
            await new sql.Request(transaction)
                .input('mo_det_id', sql.Int, mo_det_id)
                .input('EMP_id', sql.Int, emp.EMP_id)
                .query(`INSERT INTO EMPLEADO_MANOOBRA (EMP_MO_PROD_DETMO_id, EMP_MO_EMP_id) 
                        VALUES (@mo_det_id, @EMP_id)`);
        }
    }
    await transaction.commit();
    return res.status(200).json({ status: "ok", msg: "Producto creado con éxito" ,token:0});

      } catch (error) {
        await transaction.rollback();
        console.error(error);
        return res.status(500).send("Error al procesar el registro: " + error.message);
    }    
  }
        
         

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
