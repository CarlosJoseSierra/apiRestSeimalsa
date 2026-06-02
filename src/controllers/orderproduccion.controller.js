import { getConnection, querys, sql } from "../database";

export const getAllOrdenP = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().execute('sp_Produccion_GetAllOrderForm');
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
        const finalArray = data.orders ? data.orders : data;
        res.json(finalArray);
      } catch (error) {
          res.status(500).send({
          message: "Error interno del servidor al procesar la solicitud.",
          error: error.message
        });
      }
  };

  export const getOrdenPById = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await getConnection();
        const result = await pool
        .request()
        .input("id", id)
        .query(querys.getOrdenPById);
      return res.json(result.recordset[0]);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };
  
  export const createOrdenP = async (req, res) => {
    let transaction;
    try {   
      const { Fecha, FechaFin,OT, Costo, Cliente, idUser, listAgregados } = req.body;
    let vc_OP_costoTotal;
        if (typeof Costo === 'string') {
            vc_OP_costoTotal = parseFloat(Costo.replace(',', '.'));
        } else {
            vc_OP_costoTotal = Costo;
        }
       
        const detalles = JSON.parse(listAgregados);
        
        const pool = await getConnection();
        transaction = new sql.Transaction(pool);
        await transaction.begin();
        const requestCabecera = new sql.Request(transaction);
        const result = await requestCabecera
        .input('OP_fecha', sql.DateTime, Fecha)
        .input('OP_fechaFin', sql.DateTime, FechaFin)
            .input('OP_OT_codigo', sql.VarChar, OT)
            .input('OP_costoTotal', sql.Decimal(18, 2), vc_OP_costoTotal)
            .input('OP_CLI_id', sql.Decimal, Cliente)
            .input('OP_USU_ing', sql.Decimal, idUser)
            .query(`INSERT INTO ORDEN_PRODUCCION
             (OP_codigo, OP_fecha,OP_fechaFin, OP_OT_id, OP_OT_codigo,OP_OT_tipo,OP_costoTotal,OP_CLI_id,OP_estado,OP_USU_ing,OP_fecha_ing) 
              VALUES 
              (NULL, @OP_fecha,@OP_fechaFin ,0, @OP_OT_codigo,0,@OP_costoTotal,@OP_CLI_id,1,@OP_USU_ing,GETDATE());
              DECLARE @NuevoID DECIMAL(18,0) = SCOPE_IDENTITY();
              UPDATE ORDEN_PRODUCCION SET OP_codigo = 'OPR' + CAST(@NuevoID AS VARCHAR(10)) WHERE OP_id = @NuevoID;
              SELECT @NuevoID AS id;`);
      const OP_id = result.recordset[0].id;
      for (const m of detalles) {
        let costo;
        if (typeof m.costoUnitario === 'string') {
            costo = parseFloat(m.costoUnitario.replace(',', '.'));
        } else {
            costo = m.costoUnitario;
        }
        
        await new sql.Request(transaction)
            .input('OPD_PO_id', sql.Decimal(18,0), OP_id)
            .input('OPD_PROD_id', sql.Decimal(18,0), m.id)
            .input('OPD_PROD_codigo', sql.VarChar, m.codigo)
            .input('OPD_PROD_nombre', sql.VarChar, m.nombre)
            .input('OPD_CantidadInicio', sql.Decimal(18, 2), m.cantidad)
            .input('OPD_costo', sql.Decimal(18, 2), costo)
            .query(`INSERT INTO ORDEN_PRODUCCIONDETALLE 
            (OPD_PO_id, OPD_PROD_id, OPD_PROD_codigo,OPD_PROD_nombre,OPD_CantidadInicio,OPD_CantidadProd,OPD_costo,OPD_estado) 
              VALUES
           (@OPD_PO_id, @OPD_PROD_id, @OPD_PROD_codigo, @OPD_PROD_nombre,@OPD_CantidadInicio,0,
                @OPD_costo,1);`);
      }
      
    await transaction.commit();
     res.status(200).json({ status: "ok", msg: "Orden de Produccion creada con éxito" ,token:0});

      } catch (error) {
        if (transaction) {
          await transaction.rollback();
      }
        console.error(error);
         res.status(500).send("Error al procesar el registro: " + error.message);
    }
  };

  export const updateOrdenP = async (req, res) => {
    try {
        const { id } = req.params;
        const materia = req.body;
        let costoFinal;
        if (typeof materia.Costo === 'string') {
          costoFinal = parseFloat(materia.Costo.replace(',', '.'));
        } else {
          costoFinal = materia.Costo;
        }
        const pool = await getConnection();
        const result = await pool
        .request()
        .input("id", id)
        .input('CI_descripcion', sql.VarChar, materia.Descripcion)
        .input('CI_valor', sql.Decimal(18, 4), costoFinal || 0)
        .input('CI_Observacion', sql.VarChar, materia.Observacion)
        .query(querys.updateCIF);
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

