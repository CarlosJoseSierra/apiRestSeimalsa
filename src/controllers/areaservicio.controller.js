import { getConnection, querys, sql } from "../database";
const cloudinary = require("../libs/cloudinary");

export const getAreaBySerie = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("serie", req.params.serie)
      .input("idCliente1", req.params.idCliente1)
      .input("idCliente2", req.params.idCliente2)
      .query(querys.getAreaBySerie);
    return res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getAreaByPlaca = async (req, res) => {
    try {
      const pool = await getConnection();
  
      const result = await pool
        .request()
        .input("placa", req.params.placa)
        .input("idCliente1", req.params.idCliente1)
      .input("idCliente2", req.params.idCliente2)
        .query(querys.getAreaByPlaca);
      return res.json(result.recordset[0]);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  export const getAreaSinTecnico = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool.request()
        .query(querys.getAreaSinTecnico);
      return res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  
  export const updateActivoByTecnico = async (req, res) => {
    const {AS_USU_id,AS_USU_ing } = req.body;
  
    // validating
    if (AS_USU_id == null ||  AS_USU_ing==null) {
      return res.status(400).json({ msg: "Favor ingresar Datos Requeridos" });
    }
  
  
    try {
      const pool = await getConnection();
  
      const result = await pool
        .request()
        .input("id", req.params.id)
        .input("AS_USU_id", sql.VarChar, AS_USU_id)
        .input("AS_USU_ing", sql.VarChar, AS_USU_ing)
        .query(querys.updateActivoByTecnico);
  
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

  export const getAreaByTecnico = async (req, res) => {
    
    try {
      const pool = await getConnection();
  
      const result = await pool
        .request()
        .input("id", req.params.id)
        .query(querys.getAreaByTecnico);
  
        return res.json(result.recordset);
      } catch (error) {
        res.status(500);
        res.send(error.message);
      }
  };

  export const createNewAreaServicio = async (req, res) => {
    const idSub = 0;  
    try {
        const subcliente = req.body.Subcliente;
        if (!isNaN(Number(subcliente))) {
          idSub = subcliente;
        }
        else{
          const pool = await getConnection();
          const result = await pool.request()
          .input('SC_nombre', sql.VarChar, subcliente)
          .input('SC_establecimiento', sql.VarChar, req.body.Establecimiento)
          .input('SC_direccion', sql.VarChar, req.body.Direccion)
          .input('SC_telefono', sql.VarChar, req.body.Telefono)
          .input('SC_USU_ing', sql.Decimal, req.body.USU_id)
          .query(querys.createSubcliente);
          console.log(result);
          
          if(result.rowsAffected[0]==1){
            idSub = result.recordset[0].SC_id;

          }
        }
    } catch (error) {
      res.status(500);
    }
    try {
      const archivos = Array.isArray(req.files)
        ? req.files
        : [];
  
      const imagenes = [];
      let firma = '';
  
      for (const archivo of archivos) {
        const resultadoCloudinary =
          await cloudinary.uploader.upload(archivo.path);
  
        if (
          archivo.originalname
            .toLowerCase()
            .includes('firma')
        ) {
          firma = resultadoCloudinary.secure_url;
        } else if (imagenes.length < 5) {
          imagenes.push(resultadoCloudinary.secure_url);
        }
      }
  
      while (imagenes.length < 5) {
        imagenes.push('');
      }
  
      const detallesRecibidos =
        req.body['details[]'] ??
        req.body.details ??
        [];
  
      const detallesArray = Array.isArray(detallesRecibidos)
        ? detallesRecibidos
        : detallesRecibidos
          ? [detallesRecibidos]
          : [];
  
          const detalles = detallesArray.map((detalle) => {
            if (typeof detalle === 'string') {
              return JSON.parse(detalle);
            }
          
            return detalle;
          });
  
      if (detalles.length === 0) {
        return res.status(400).json({
          status: 'error',
          msg: 'Debe agregar al menos un producto.',
          token: 0
        });
      }
  
      let estadoSeimalsa = 4;
      let estadoMovimiento = 10;
  
      const servicio = Number(req.body.Servicio);
  
      if (servicio === 2) {
        estadoSeimalsa = Number(req.body.Estado);
      }
  
      if (servicio === 4) {
        estadoMovimiento = Number(req.body.Estado);
      }
  
      const pool = await getConnection();
  
      const result = await pool
        .request()
  
        .input(
          'AS_SS_id',
          sql.Decimal(18, 0),
          Number(req.body.Servicio)
        )
        .input(
          'AS_USU_id',
          sql.Decimal(18, 0),
          Number(req.body.USU_id)
        )
        .input(
          'AS_CLI_id',
          sql.Decimal(18, 0),
          Number(req.body.Cliente)
        )
        .input(
          'AS_TPS_id',
          sql.Decimal(18, 0),
          Number(req.body.TipoServicio)
        )
        .input(
          'AS_UBIC_id',
          sql.Decimal(18, 0),
          Number(req.body.Ciudad)
        )
        .input(
          'AS_serie',
          sql.VarChar(100),
          req.body.Serie ?? ''
        )
        .input(
          'AS_placa',
          sql.VarChar(100),
          req.body.Placa ?? ''
        )
        .input(
          'AS_EQUIP_id',
          sql.Decimal(18, 0),
          Number(req.body.Modelo)
        )
        .input(
          'AS_LOGO_id',
          sql.Decimal(18, 0),
          Number(req.body.Logo)
        )
        .input(
          'AS_observacionTecnica',
          sql.VarChar(sql.MAX),
          req.body.ObservacionTec ?? ''
        )
        .input(
          'AS_Subtotal',
          sql.Decimal(18, 2),
          Number(req.body.Subtotal ?? 0)
        )
        .input(
          'AS_impuesto',
          sql.Decimal(18, 2),
          15
        )
        .input(
          'AS_iva',
          sql.Decimal(18, 2),
          Number(req.body.IVA ?? 0)
        )
        .input(
          'AS_total',
          sql.Decimal(18, 2),
          Number(req.body.Total ?? 0)
        )
        .input(
          'AS_SC_id',
          sql.Decimal(18, 0),
          idSub
        )
        .input(
          'AS_ES_id',
          sql.Decimal(18, 0),
          estadoSeimalsa
        )
        .input(
          'AS_EM_id',
          sql.Decimal(18, 0),
          estadoMovimiento
        )
        .input(
          'AS_SEDE_id',
          sql.Decimal(18, 0),
          0
        )
  
        .input(
          'AS_imagen1',
          sql.VarChar(1000),
          imagenes[0]
        )
        .input(
          'AS_imagen2',
          sql.VarChar(1000),
          imagenes[1]
        )
        .input(
          'AS_imagen3',
          sql.VarChar(1000),
          imagenes[2]
        )
        .input(
          'AS_imagen4',
          sql.VarChar(1000),
          imagenes[3]
        )
        .input(
          'AS_imagen5',
          sql.VarChar(1000),
          imagenes[4]
        )
        .input(
          'AS_imagenfirma',
          sql.VarChar(1000),
          firma
        )
  
        .input(
          'DetallesJSON',
          sql.NVarChar(sql.MAX),
          JSON.stringify(detalles)
        )
  
        .execute(
          'dbo.sp_AreaServicio_InsertarCompleto'
        );
  
      const registro = result.recordset?.[0];
  
      return res.status(200).json({
        status: registro?.status ?? 'ok',
        msg: registro?.msg ?? 'Registro exitoso',
        token: 0,
        data: {
          AS_id: registro?.AS_id,
          AS_secuencial: registro?.AS_secuencial,
          cantidadDetalles:
            registro?.cantidadDetalles
        }
      });
  
    } catch (error) {
      console.error(
        'Error insertando AREA_SERVICIO:',
        error
      );
  
      return res.status(500).json({
        status: 'error',
        msg:
          error?.originalError?.info?.message ??
          error?.message ??
          'No se pudo registrar la cotización.',
        token: 0
      });
    }
  };

  /*export const createNewAreaServicio = async (req, res) => {
    
    try {
      let image = '',image1= '',image2= '',image3= '',image4= '',firma=''; 
      if(req.files.length>0)
      {
        if(req.files[0]!=undefined)
        {
          if(req.files[0].originalname.includes('Firma')){
              const img = await cloudinary.uploader.upload(req.files[0].path);
              firma = img.secure_url;
          }
          else{
            image = req.files[0].filename;
            const img = await cloudinary.uploader.upload(req.files[0].path);
            imageruta = img.secure_url;
          }
        }
        if(req.files[1]!=undefined)
        {
          if(req.files[1].originalname.includes('Firma')){
            const img = await cloudinary.uploader.upload(req.files[1].path);
            firma = img.secure_url;
          }else{
            const img = await cloudinary.uploader.upload(req.files[1].path);
            image1 = img.secure_url;
          }
        }
        if(req.files[2]!=undefined)
        {
          if(req.files[2].originalname.includes('Firma')){
            const img = await cloudinary.uploader.upload(req.files[2].path);
            firma = img.secure_url;
          }else{
            const img = await cloudinary.uploader.upload(req.files[2].path);
            image2 = img.secure_url;
          }
        }
        if(req.files[3]!=undefined)
        {
          if(req.files[3].originalname.includes('Firma')){
            const img = await cloudinary.uploader.upload(req.files[3].path);
            firma = img.secure_url;
          }else{
            const img = await cloudinary.uploader.upload(req.files[3].path);
            image3 = img.secure_url;
          }
        }
        if(req.files[4]!=undefined)
        {
          if(req.files[4].originalname.includes('Firma')){
            const img = await cloudinary.uploader.upload(req.files[4].path);
            firma = img.secure_url;
          }else{
            const img = await cloudinary.uploader.upload(req.files[4].path);
            image4 = img.secure_url;
          }
        }

        if(req.files[5]!=undefined)
        {
          if(req.files[5].originalname.includes('Firma')){
            const img = await cloudinary.uploader.upload(req.files[5].path);
            firma = img.secure_url;
          }else{
            const img = await cloudinary.uploader.upload(req.files[5].path);
            image5 = img.secure_url;
          }
        }

        if(req.files[6]!=undefined){
          if(req.files[6].originalname.includes('Firma')){
            const img = await cloudinary.uploader.upload(req.files[6].path);
            firma = img.secure_url;
          }
          else{
            firma = '';
          }
        }
      }
      for(let i=0;i<req.body.details.length;i++){
        const json = JSON.parse(req.body.details[i])            
       }
      let estadoSeimalsa = 4;
      let estadoMovimiento = 10;
      if(req.body.Servicio==2){
        estadoSeimalsa = req.body.Estado;
      }
      if(req.body.Servicio==4){
        estadoMovimiento = req.body.Estado;
      }
        const pool = await getConnection();
        const result = await pool
        .request()
        .input("AS_SS_id", sql.Decimal, req.body.Servicio)
        .input("AS_USU_id", sql.Decimal, req.body.USU_id)
        .input("AS_CLI_id", sql.Decimal, req.body.Cliente)
        .input("AS_TPS_id", sql.Decimal, req.body.TipoServicio)
        .input("AS_UBIC_id", sql.Decimal, Ciudad)
        .input("AS_serie", sql.VarChar, Serie)
        .input("AS_placa", sql.VarChar, Placa)
        .input("AS_EQUIP_id", sql.Decimal, Modelo)
        .input("AS_LOGO_id", sql.Decimal, Logo)
        .input("AS_observacionTecnica", sql.VarChar, ObservacionTec)
        .input("AS_Subtotal", sql.Decimal, Subtotal)
        .input("AS_impuesto", sql.Decimal, AS_impuesto)
        .input("AS_iva", sql.Decimal, IVA)
        .input("AS_total", sql.Decimal, Total)
        .input("AS_SC_id", sql.Decimal, Subcliente)
        .input("AS_ES_id", sql.Decimal, estadoSeimalsa)
        .input("AS_SEDE_id", sql.Decimal, AS_SEDE_id)
        .input("AS_EM_id", sql.Decimal, estadoMovimiento)
        .query(querys.addNewAreaServicio);
        if(result.rowsAffected==1){
          let idAS = result.recordset[0].AS_id;
          if(req.body.details.length>0){
            for(let i=0;i<req.body.details.length;i++){
              const json = JSON.parse(req.body.details[i])      
              const pool3 = await getConnection();
              const result3 = await pool3
              .request()
              .input("AS_DET_AS_id", sql.Decimal,idAS)
              .input("AS_DET_PROD_id", sql.Decimal, json.productName)
              .input("AS_DET_PROD_codigo", sql.Varchar, json.codigo)
              .input("AS_DET_PROD_codigo", sql.Varchar, json.nombre)
              .input("REQDET_cantidad", sql.Decimal(18,2), json.qty)
              .input("REQDET_pvp", sql.Decimal(18,2), json.salesPrice)
              .input("REQDET_total", sql.Decimal(18,2), json.qty * json.salesPrice)
              .query(querys.addNewAreaServicio);
            }
          }
          return res.status(200).json({ status: "ok", msg: "Registro exitoso" ,token:0});
        }else{
          return res.status(400).json({ status: "400", msg: "No se pudo registrar, consulte al administrador" ,token:0});
        }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }*/


  export const getAreaServicioMovimiento = async (req, res) => {
    try {
      const pool = await getConnection();
  
      const result = await pool
        .request()
        .query(querys.getAreaByMovimiento);
      return res.json(result.recordset[0]);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  export const getAreaServicioMantenimiento = async (req, res) => {
    try {
      const pool = await getConnection();
  
      const result = await pool
        .request()
        .query(querys.getAreaByMantenimiento);
      return res.json(result.recordset[0]);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  export const getReporteGeneral = async(req, res) =>{
    try {
      const pool = await getConnection();
      const result = await pool
      
        .request()
        .query(querys.getReporteGeneralSabana);
        return res.json(result.recordset);
    } catch (error) {
      res.status(500);
    }
  }

  export const getEntregadosHeineken = async(req, res) =>{
    try {
      const pool = await getConnection();
      const result = await pool
      
        .request()
        .query(querys.getEntregaGeneralHeineken);
        return res.json(result.recordset);
    } catch (error) {
      res.status(500);
    }
  }

  export const getEntregadosPronaca = async(req, res) =>{
    try {
      const pool = await getConnection();
      const result = await pool
      
        .request()
        .query(querys.getEntregaGeneralPronaca);
        return res.json(result.recordset);
    } catch (error) {
      res.status(500);
    }
  }

  export const getEntregadosTesalia = async(req, res) =>{
    try {
      const pool = await getConnection();
      const result = await pool
      
        .request()
        .query(querys.getEntregaGeneralTesalia);
        return res.json(result.recordset);
    } catch (error) {
      res.status(500);
    }
  }

  export const getEntregadosUnilever = async(req, res) =>{
    try {
      const pool = await getConnection();
      const result = await pool
      
        .request()
        .query(querys.getEntregaGeneralUnilever);
        return res.json(result.recordset);
    } catch (error) {
      res.status(500);
    }
  }
  
  export const getEntregadosElRosado = async(req, res) =>{
    try {
      const pool = await getConnection();
      const result = await pool
      
        .request()
        .query(querys.getEntregaGeneralElRosado);
        return res.json(result.recordset);
    } catch (error) {
      res.status(500);
    }
  }

  export const getEntregadosArca = async(req, res) =>{
    try {
      const pool = await getConnection();
      const result = await pool
      
        .request()
        .query(querys.getEntregaGeneralArca);
        return res.json(result.recordset);
    } catch (error) {
      res.status(500);
    }
  }

  export const getDetalleCTById = async(req, res) =>{
    try {
      const pool = await getConnection();
      const result = await pool
        .request()
        .input("id", req.params.id)
        .query(querys.getDetalleCTById);
        return res.json(result.recordset);
    } catch (error) {
      res.status(500);
    }
  }

  export const getReparacionesXtecnico= async(req, res) =>{
    try {
      const { idTecnico } = req.params;
      const pool = await getConnection();
      const result = await pool.request()
      .input("idTecnico", sql.Decimal, idTecnico)
      .execute('sp_Ventas_GetRepairPorTecnico');
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
      const finalArray = data.repairs ? data.repairs : data;
      res.json(finalArray);
    } catch (error) {
        res.status(500).send({
        message: "Error interno del servidor al procesar la solicitud.",
        error: error.message
      });
    }
  }