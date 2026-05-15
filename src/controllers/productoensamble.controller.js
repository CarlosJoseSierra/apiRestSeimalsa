import { getConnection, querys, sql } from "../database";
const cloudinary = require("../libs/cloudinary");
const path = require('path');
const upload = require ('../libs/multer');
const storage = require('../libs/multer');

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
        PROD_precioMinimo,PROD_pvp,PROD_item,PROD_costoUnitarioH,
        PROD_precioMinimoH,PROD_pvpH,PROD_TotalMP, PROD_TotalMO,
        PROD_TotalCIF, PROD_TotalFInal,PROD_utilidad,
        PROD_itemsXhora, PROD_mp, PROD_mo, PROD_cif
    } = req.body;
    let imageruta= '';
    let vc_PROD_costoUnitario,vc_PROD_precioMinimo,vc_PROD_pvp,vc_PROD_costoUnitarioH,vc_PROD_precioMinimoH;
    let vc_PROD_pvpH,vc_PROD_TotalMP,vc_PROD_TotalMO,vc_PROD_TotalCIF,vc_PROD_TotalFInal,vc_PROD_utilidad;
    let vc_PROD_itemsXhora;
        if (typeof PROD_costoUnitario === 'string') {
          vc_PROD_costoUnitario = parseFloat(PROD_costoUnitario.replace(',', '.'));
        } else {
          vc_PROD_costoUnitario = PROD_costoUnitario;
        }
        if (typeof PROD_precioMinimo === 'string') {
          vc_PROD_precioMinimo = parseFloat(PROD_precioMinimo.replace(',', '.'));
        } else {
          vc_PROD_precioMinimo = PROD_precioMinimo;
        }
        if (typeof PROD_pvp === 'string') {
          vc_PROD_pvp = parseFloat(PROD_pvp.replace(',', '.'));
        } else {
          vc_PROD_pvp = PROD_pvp;
        }
        if (typeof PROD_costoUnitarioH === 'string') {
          vc_PROD_costoUnitarioH = parseFloat(PROD_costoUnitarioH.replace(',', '.'));
        } else {
          vc_PROD_costoUnitarioH = PROD_costoUnitarioH;
        }
        if (typeof PROD_precioMinimoH === 'string') {
          vc_PROD_precioMinimoH = parseFloat(PROD_precioMinimoH.replace(',', '.'));
        } else {
          vc_PROD_precioMinimoH = PROD_precioMinimoH;
        }
        if (typeof PROD_pvpH === 'string') {
          vc_PROD_pvpH = parseFloat(PROD_pvpH.replace(',', '.'));
        } else {
          vc_PROD_pvpH = PROD_pvpH;
        }
        //
        if (typeof PROD_TotalMP === 'string') {
          vc_PROD_TotalMP = parseFloat(PROD_TotalMP.replace(',', '.'));
        } else {
          vc_PROD_TotalMP = PROD_TotalMP;
        }
        if (typeof PROD_TotalMO === 'string') {
          vc_PROD_TotalMO = parseFloat(PROD_TotalMO.replace(',', '.'));
        } else {
          vc_PROD_TotalMO = PROD_TotalMO;
        }
        if (typeof PROD_TotalCIF === 'string') {
          vc_PROD_TotalCIF = parseFloat(PROD_TotalCIF.replace(',', '.'));
        } else {
          vc_PROD_TotalCIF = PROD_TotalCIF;
        }
        if (typeof PROD_TotalFInal === 'string') {
          vc_PROD_TotalFInal = parseFloat(PROD_TotalFInal.replace(',', '.'));
        } else {
          vc_PROD_TotalFInal = PROD_TotalFInal;
        }
       
        if (typeof PROD_utilidad === 'string') {
          vc_PROD_utilidad = parseFloat(PROD_utilidad.replace(',', '.'));
        } else {
          vc_PROD_utilidad = PROD_utilidad;
        }
        if (typeof PROD_itemsXhora === 'string') {
          vc_PROD_itemsXhora = parseFloat(PROD_itemsXhora.replace(',', '.'));
        } else {
          vc_PROD_itemsXhora = PROD_itemsXhora;
        }
        //
      if(req.files.length>0)
      {
        if(req.files[0]!=undefined)
        {
            const img = await cloudinary.uploader.upload(req.files[0].path);
            imageruta = img.secure_url; 
        }
      }
        const materiales = JSON.parse(PROD_mp);
        const manoObra = JSON.parse(PROD_mo);
        const cif = JSON.parse(PROD_cif);
        await transaction.begin();
        console.log('1');
        const pool = await getConnection();
        const result = await pool.request()
        .input('PROD_codigo', sql.VarChar, PROD_codigo)
            .input('PROD_nombre', sql.VarChar, PROD_nombre)
            .input('PROD_medida', sql.VarChar, PROD_medida)
            .input('PROD_costoUnitario', sql.Decimal(18, 2), vc_PROD_costoUnitario)
            .input('PROD_precioMinimo', sql.Decimal(18, 2), vc_PROD_precioMinimo)
            .input('PROD_pvp', sql.Decimal(18, 2), vc_PROD_pvp)
            .input('PROD_item', sql.VarChar, PROD_item)
            .input('PROD_costoUnitarioH', sql.Decimal(18, 2), vc_PROD_costoUnitarioH)
            .input('PROD_precioMinimoH', sql.Decimal(18, 2), vc_PROD_precioMinimoH)
            .input('PROD_pvpH', sql.Decimal(18, 2), vc_PROD_pvpH)
            .input("PROD_image", sql.VarChar, imageruta)
            .input('PROD_TotalMP', sql.Decimal(18, 2), vc_PROD_TotalMP)
            .input('PROD_TotalMO', sql.Decimal(18, 2), vc_PROD_TotalMO)
            .input('PROD_TotalCIF', sql.Decimal(18, 2), vc_PROD_TotalCIF)
            .input('PROD_TotalFInal', sql.Decimal(18, 2), vc_PROD_TotalFInal)
            .input('PROD_utilidad', sql.Decimal(18, 2), vc_PROD_utilidad)
            .input('PROD_itemsXhora', sql.Decimal(18, 2), vc_PROD_itemsXhora)
            .query(`INSERT INTO PRODUCTO2 (PROD_codigo, PROD_nombre, PROD_medida, PROD_costoUnitario,PROD_precioMinimo,
              PROD_pvp,PROD_item,PROD_costoUnitarioH,PROD_precioMinimoH,PROD_image,PROD_TotalMP, PROD_TotalMO, PROD_TotalCIF, 
              PROD_TotalFInal, PROD_utilidad,PROD_itemsXhora,PROD_estado) 
              VALUES (@PROD_codigo, @PROD_nombre, @PROD_medida, @PROD_costoUnitario,@PROD_precioMinimo,@PROD_pvp,@PROD_item,
              @PROD_costoUnitarioH,@PROD_precioMinimoH,@PROD_image,@PROD_TotalMP, @PROD_TotalMO, @PROD_TotalCIF,
              @PROD_TotalFInal, @PROD_utilidad,@PROD_itemsXhora, 1);
              SELECT SCOPE_IDENTITY() AS id;`);
      const PROD_id = result.recordset[0].id;
      console.log('2');
      for (const m of materiales) {
        let cantidad,costo;
        if (typeof m.cantidad === 'string') {
          cantidad = parseFloat(m.cantidad.replace(',', '.'));
        } else {
          costo = m.cantidad;
        }
        if (typeof m.MP_costo === 'string') {
          costo = parseFloat(m.MP_costo.replace(',', '.'));
        } else {
          costo = m.MP_costo;
        }
        console.log('3');
        await new sql.Request(transaction)
            .input('PROD_id', sql.Decimal(18,0), PROD_id)
            .input('MP_id', sql.Decimal(18,0), m.MP_id)
            .input('cantidad', sql.Decimal(18, 4), cantidad)
            .input('costo', sql.Decimal(18, 4), costo)
            .query(`INSERT INTO PRODUCTO_DET_MP (PROD_DETMP_PROD_id, PROD_DETMP_MP_id, PROD_DETMP_MP_cantidad,
               PROD_DETMP_MP_costo) 
                    VALUES (@PROD_id, @MP_id, @cantidad, @costo)`);
      }
      console.log('4');
      for (const mo of manoObra) {
        console.log('5');
        let total = 0;
        let cantidad;
        if (typeof mo.cantidad === 'string') {
          cantidad = parseFloat(mo.cantidad.replace(',', '.'));
        } else {
          cantidad = mo.cantidad;
        }
        total = mo.cantidad/vc_PROD_itemsXhora;
        const resultMO = await new sql.Request(transaction)
            .input('PROD_id', sql.Decimal(18,0), PROD_id)
            .input('MO_id', sql.Decimal(18,0), mo.MO_id)
            .input('costoHora', sql.Decimal(18, 4), cantidad) 
            .input('horaItem', sql.Decimal(18, 4), vc_PROD_itemsXhora) 
            .input('total', sql.Decimal(18, 4), total) 
            .query(`INSERT INTO PRODUCTO_DET_MO (PROD_DETMO_PROD_id, PROD_DETMO_MO_id, PROD_DETMO_MO_costoHora,
              PROD_DETMO_HoraItem,PROD_DETMO_MO_total) 
                    VALUES (@PROD_id, @MO_id, @costoHora,@horaItem,@total);
                    SELECT SCOPE_IDENTITY() AS mo_det_id;`);

        const mo_det_id = resultMO.recordset[0].mo_det_id;

        for (const emp of mo.empleadosSeleccionados) {
          console.log('6');
          let sueldo;
          if (typeof emp.EMP_sueldoHora === 'string') {
            sueldo = parseFloat(emp.EMP_sueldoHora.replace(',', '.'));
          } else {
            sueldo = emp.EMP_sueldoHora;
          }
            await new sql.Request(transaction)
                .input('mo_det_id', sql.Decimal(18, 0), mo_det_id)
                .input('costoHora', sql.Decimal(18, 4), sueldo)
                .input('EMP_id', sql.Decimal(18, 0), emp.EMP_id)
                .query(`INSERT INTO EMPLEADO_MANOOBRA (EMP_MO_PROD_DETMO_id,EMP_MO_costoHora, EMP_MO_EMP_id) 
                        VALUES (@mo_det_id, @costoHora,@EMP_id)`);
        }
    }
    console.log('7');
    for (const m of cif) {
      let valor;
          if (typeof m.CI_valor === 'string') {
            valor = parseFloat(m.CI_valor.replace(',', '.'));
          } else {
            valor = m.CI_valor;
          }
      await new sql.Request(transaction)
          .input('PROD_id', sql.Decimal(18,0), PROD_id)
          .input('CIF_id', sql.Decimal(18,0), m.CI_id)
          .input('costo', sql.Decimal(18, 4), valor)
          .query(`INSERT INTO PRODUCTO_DET_CIF (PROD_DETCIF_PROD_id, PROD_DETCIF_CIF_id, PROD_DETCIF_CIF_costo) 
                  VALUES (@PROD_id, @CIF_id, @costo)`);
    }
    await transaction.commit();
     res.status(200).json({ status: "ok", msg: "Producto creado con éxito" ,token:0});

      } catch (error) {
        await transaction.rollback();
        console.error(error);
         res.status(500).send("Error al procesar el registro: " + error.message);
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
