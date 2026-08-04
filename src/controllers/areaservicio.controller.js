import { getConnection, querys, sql } from "../database";
const cloudinary = require("../libs/cloudinary");
import { generarAreaServicioPDF } from '../utils/areaServicioPdf.js';

const obtenerTextoOpcional = (valor) => {
  if (typeof valor !== 'string') {
    return null;
  }

  const texto = valor.trim();

  if (
    texto === '' ||
    texto.toUpperCase() === 'TODOS'
  ) {
    return null;
  }

  return texto;
};


const obtenerNumeroOpcional = (valor) => {
  if (
    valor === null ||
    valor === undefined ||
    valor === ''
  ) {
    return null;
  }

  const numero = Number(valor);

  if (
    !Number.isFinite(numero) ||
    numero <= 0
  ) {
    return null;
  }

  return numero;
};


const obtenerFechaOpcional = (valor) => {
  if (
    valor === null ||
    valor === undefined ||
    typeof valor !== 'string'
  ) {
    return null;
  }

  const fecha = valor.trim();

  if (fecha === '') {
    return null;
  }

  /*
   * Formato esperado:
   * YYYY-MM-DD
   */
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    return null;
  }

  /*
   * Verifica que realmente sea una fecha válida.
   */
  const [anio, mes, dia] =
    fecha.split('-').map(Number);

  const fechaValidada =
    new Date(anio, mes - 1, dia);

  const esValida =
    fechaValidada.getFullYear() === anio &&
    fechaValidada.getMonth() === mes - 1 &&
    fechaValidada.getDate() === dia;

  return esValida ? fecha : null;
};
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

  export const updateAreaServicio = async (req, res) => {
    let idSub = 0;  
    const subcliente = req.body.Subcliente;
    const areaServicioId = Number(req.params.id);
    if (!isNaN(Number(subcliente))) {
      idSub = subcliente;
    }
    else{
      const pool = await getConnection();
      const result = await pool.request()
      .input('SC_nombre', sql.VarChar, subcliente)
      .input('SC_codUniversal', sql.VarChar, req.body.CodigoS)
      .input('SC_establecimiento', sql.VarChar, req.body.Establecimiento)
      .input('SC_direccion', sql.VarChar, req.body.Direccion)
      .input('SC_telefono', sql.VarChar, req.body.Telefono)
      .input('SC_USU_ing', sql.Decimal, req.body.USU_id)
      .query(querys.createSubcliente);
      
      if(result.rowsAffected[0]==1){
        if (result.recordset.length > 0) {
          idSub = result.recordset?.[0]?.SC_id;
        }
      }
    }
    try {
      const archivos = Array.isArray(req.files)
        ? req.files
        : [];
  
      const imagenes = [];
      let firma = '';
  
      for (const archivo of archivos) {
        const resultadoCloudinary =
          await cloudinary.uploader.upload(archivo.path,{folder: 'seimalsa'});
  
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
          'AS_id',
          sql.Decimal(18, 0),
          areaServicioId
        )
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
        .input('AS_SC_id',sql.Decimal(18, 0),idSub)
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
        .input(
          'latitud',
          sql.Decimal(18, 7),
          Number(req.body.Latitud)
        )

        .input(
          'longitud',
          sql.Decimal(18, 7),
          Number(req.body.Longitud)
        )

        .input(
          'precision',
          sql.Decimal(18, 2),
          Number(req.body.PrecisionGPS)
        )

        .input(
          'idEquipoCompleto',
          sql.Decimal(18, 0),
          Number(req.body.idEquipoCompleto)
        )
  
        .execute(
          'dbo.sp_AreaServicio_ActualizarCompleto'
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
  }

  export const createNewAreaServicio = async (req, res) => {
    let idSub = 0;  
    
    const subcliente = req.body.Subcliente;
    if (!isNaN(Number(subcliente))) {
      idSub = subcliente;
      const pool = await getConnection();
      const result = await pool.request()
      .input('SC_id', sql.Decimal, idSub)
      .input('SC_codUniversal', sql.VarChar, req.body.CodigoS)
      .query(querys.updateSubcliente);
      if(result.rowsAffected==1){
        // if (result.recordset.length > 0) {
          //idSub = result.recordset?.[0]?.SC_id;
        //}
      }
    }
    else{
      const pool = await getConnection();
      const result = await pool.request()
      .input('SC_nombre', sql.VarChar, subcliente)
      .input('SC_establecimiento', sql.VarChar, req.body.Establecimiento)
      .input('SC_codUniversal', sql.VarChar, req.body.CodigoS)
      .input('SC_direccion', sql.VarChar, req.body.Direccion)
      .input('SC_telefono', sql.VarChar, req.body.Telefono)
      .input('SC_USU_ing', sql.Decimal, req.body.USU_id)
      .query(querys.createSubcliente);
      
      if(result.rowsAffected[0]==1){
        if (result.recordset.length > 0) {
          idSub = result.recordset?.[0]?.SC_id;
        }
      }
    }
    try {
      const archivos = Array.isArray(req.files)
        ? req.files
        : [];
  
      const imagenes = [];
      let firma = '';
  
      for (const archivo of archivos) {
        const resultadoCloudinary =
          await cloudinary.uploader.upload(archivo.path,{folder: 'seimalsa'});
  
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
        .input('AS_SC_id',sql.Decimal(18, 0),idSub)
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

        .input(
          'latitud',
          sql.Decimal(18, 7),
          Number(req.body.Latitud)
        )

        .input(
          'longitud',
          sql.Decimal(18, 7),
          Number(req.body.Longitud)
        )

        .input(
          'precision',
          sql.Decimal(18, 2),
          Number(req.body.PrecisionGPS)
        )

        .input(
          'idEquipoCompleto',
          sql.Decimal(18, 0),
          Number(req.body.idEquipoCompleto)
        )
        .input(
          'codTag',
          sql.VarChar(50),
          req.body.QR 
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
        'Error insertando FIRMA:',
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
  export const getEntregadosAJE = async(req, res) =>{
    try {
      const pool = await getConnection();
      const result = await pool
      
        .request()
        .query(querys.getEntregaGeneralAJE);
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

  export const obtenerPDFReparacion =
  async (req, res) => {

  try {
    const id = Number(req.params.id);

    if (
      !Number.isFinite(id) ||
      id <= 0
    ) {
      return res.status(400).json({
        status: 'error',
        msg: 'El ID de AREA_SERVICIO no es válido.'
      });
    }

    const pool = await getConnection();

    const result = await pool
      .request()
      .input(
        'AS_id',
        sql.Decimal(18, 0),
        id
      )
      .execute(
        'dbo.sp_AreaServicio_ObtenerReportePDF'
      );

    const cabecera =
      result.recordsets?.[0]?.[0];

    const detalles =
      result.recordsets?.[1] || [];

    if (!cabecera) {
      return res.status(404).json({
        status: 'error',
        msg: 'No se encontró la reparación solicitada.'
      });
    }
    await generarAreaServicioPDF(
      res,
      cabecera,
      detalles
    );

  } catch (error) {
    console.error(
      'Error generando el PDF:',
      error
    );

    /*
      No se puede enviar JSON si el PDF ya comenzó
      a escribirse en la respuesta.
    */
    if (!res.headersSent) {
      return res.status(500).json({
        status: 'error',
        msg:
          error?.originalError?.info?.message ||
          error?.message ||
          'No se pudo generar el PDF.'
      });
    }

    res.end();
  }
};

export const obtenerMapaEquipos =
  async (req, res) => {

  try {
    const clienteId =
      req.query.clienteId
        ? Number(req.query.clienteId)
        : null;
    const clienteId2 = req.query.clienteId2
        ? Number(req.query.clienteId2)
        : 0;
    const pool = await getConnection();

    const result = await pool
      .request()
      .input(
        'AS_CLI_id',
        sql.Decimal(18, 0),
        clienteId
      ) .input(
        'AS_CLI_id2',
        sql.Decimal(18, 0),
        clienteId2
      )
      .execute(
        'dbo.sp_AreaServicio_ObtenerMapaEquipos'
      );

    return res.status(200).json({
      status: 'ok',
      msg: result.recordset.length,
      token: result.recordset
    });

  } catch (error) {
    console.error(
      'Error consultando mapa:',
      error
    );

    return res.status(500).json({
      status: 'error',
      msg:
        error?.originalError?.info?.message ||
        error?.message ||
        'No se pudieron obtener las ubicaciones.'
    });
  }
};

export const obtenerDashboardTecnico =
  async (req, res) => {

  try {
    const usuarioId =
      Number(req.params.usuarioId);

    if (
      !Number.isFinite(usuarioId) ||
      usuarioId <= 0
    ) {
      return res.status(400).json({
        status: 'error',
        msg: 'El usuario no es válido.'
      });
    }

    const pool = await getConnection();

    const result = await pool
      .request()
      .input(
        'USU_id',
        sql.Decimal(18, 0),
        usuarioId
      )
      .execute(
        'dbo.sp_DashboardTecnico'
      );

    return res.status(200).json({
      status: 'ok',

      data: {
        resumen:
          result.recordsets?.[0]?.[0] || {},

        actividadSemanal:
          result.recordsets?.[1] || [],

        actividadMensual:
          result.recordsets?.[2] || [],

        clientes:
          result.recordsets?.[3] || [],

        ciudades:
          result.recordsets?.[4] || [],

        repuestos:
          result.recordsets?.[5] || [],

        ultimasReparaciones:
          result.recordsets?.[6] || [],

        tecnico:
          result.recordsets?.[7]?.[0] || {}
      }
    });

  } catch (error) {
    console.error(
      'Error consultando dashboard:',
      error
    );

    return res.status(500).json({
      status: 'error',

      msg:
        error?.originalError?.info?.message ||
        error?.message ||
        'No se pudo obtener el dashboard.'
    });
  }
};

export const obtenerDashboardKPIPorCliente = async (
  req,
  res
) => {
  try {
    /*
     * Único dato obligatorio.
     * Debe corresponder al cliente autenticado.
     */
    const clienteId =
      Number(req.params.clienteId);

    if (
      !Number.isFinite(clienteId) ||
      clienteId <= 0
    ) {
      return res.status(400).json({
        success: false,
        status: 'error',
        msg:
          'El ID del cliente no es válido.',
        token: 0
      });
    }

    /*
     * Filtros opcionales.
     * Cuando no vienen o tienen valor 0/TODOS,
     * se envía NULL al procedimiento.
     */
    const servicioId =
      obtenerNumeroOpcional(
        req.query.servicioId
      );

    const fechaDesde =
      obtenerFechaOpcional(
        req.query.fechaDesde
      );

    const fechaHasta =
      obtenerFechaOpcional(
        req.query.fechaHasta
      );

    const provincia =
      obtenerTextoOpcional(
        req.query.provincia
      );

    const ciudad =
      obtenerTextoOpcional(
        req.query.ciudad
      );

    const marca =
      obtenerTextoOpcional(
        req.query.marca
      );

    const modelo =
      obtenerTextoOpcional(
        req.query.modelo
      );

    const tipoServicioId =
      obtenerNumeroOpcional(
        req.query.tipoServicioId
      );

    const estadoCotizacionId =
      obtenerNumeroOpcional(
        req.query.estadoCotizacionId
      );

    const estadoServicioId =
      obtenerNumeroOpcional(
        req.query.estadoServicioId
      );

    const estadoMovimientoId =
      obtenerNumeroOpcional(
        req.query.estadoMovimientoId
      );

    const tecnicoId =
      obtenerNumeroOpcional(
        req.query.tecnicoId
      );


    /*
     * Validar fechas solamente cuando ambas
     * fueron recibidas.
     */
    if (
      fechaDesde &&
      fechaHasta &&
      fechaDesde > fechaHasta
    ) {
      return res.status(400).json({
        success: false,
        status: 'error',
        msg:
          'La fecha inicial no puede ser mayor que la fecha final.',
        token: 0
      });
    }


    const pool =
      await getConnection();

    const result = await pool
      .request()

      .input(
        'ClienteId',
        sql.Decimal(18, 0),
        clienteId
      )

      .input(
        'ServicioId',
        sql.Decimal(18, 0),
        servicioId
      )

      .input(
        'FechaDesde',
        sql.Date,
        fechaDesde
      )

      .input(
        'FechaHasta',
        sql.Date,
        fechaHasta
      )

      .input(
        'Provincia',
        sql.VarChar(150),
        provincia
      )

      .input(
        'Ciudad',
        sql.VarChar(150),
        ciudad
      )

      .input(
        'Marca',
        sql.VarChar(150),
        marca
      )

      .input(
        'Modelo',
        sql.VarChar(150),
        modelo
      )

      .input(
        'TipoServicioId',
        sql.Decimal(18, 0),
        tipoServicioId
      )

      .input(
        'EstadoCotizacionId',
        sql.Decimal(18, 0),
        estadoCotizacionId
      )

      .input(
        'EstadoServicioId',
        sql.Decimal(18, 0),
        estadoServicioId
      )

      .input(
        'EstadoMovimientoId',
        sql.Decimal(18, 0),
        estadoMovimientoId
      )

      .input(
        'TecnicoId',
        sql.Decimal(18, 0),
        tecnicoId
      )

      .execute(
        'dbo.sp_DashboardEquiposFrio'
      );


    const recordsets =
      result.recordsets ?? [];

    return res.status(200).json({
      success: true,
      status: 'ok',
      msg:
        'Dashboard consultado correctamente.',
      token: 0,

      /*
       * Recordset 1
       */
      contexto:
        recordsets[0]?.[0] ?? {},

      /*
       * Recordset 2
       */
      indicadores:
        recordsets[1]?.[0] ?? {
          TotalOrdenes: 0,
          EquiposUnicos: 0,
          CorrectivosMenores: 0,
          CorrectivosMayores: 0,
          MantenimientosPreventivos: 0,
          VisitasFallidas: 0,
          SubtotalGeneral: 0,
          IvaGeneral: 0,
          TotalGeneral: 0
        },

      /*
       * Recordset 3
       */
      ordenesPorServicio:
        recordsets[2] ?? [],

      /*
       * Recordset 4
       */
      ordenesPorMes:
        recordsets[3] ?? [],

      /*
       * Recordset 5
       */
      ordenesPorCiudad:
        recordsets[4] ?? [],

      /*
       * Recordset 6
       */
      ordenesPorProvincia:
        recordsets[5] ?? [],

      /*
       * Recordset 7
       */
      ordenesPorMarca:
        recordsets[6] ?? [],

      /*
       * Recordset 8
       */
      ordenesPorModelo:
        recordsets[7] ?? [],

      /*
       * Recordset 9
       */
      tiposServicio:
        recordsets[8] ?? [],

      /*
       * Recordset 10
       */
      estados:
        recordsets[9] ?? [],

      /*
       * Recordset 11
       */
      areasTrabajo:
        recordsets[10] ?? [],

      /*
       * Recordset 12
       */
      detalle:
        recordsets[11] ?? []
    });

  } catch (error) {
    console.error(
      'Error consultando Dashboard KPI:',
      error
    );

    return res.status(500).json({
      success: false,
      status: 'error',

      msg:
        error?.originalError
          ?.info
          ?.message ??
        error?.precedingErrors?.[0]
          ?.message ??
        error?.message ??
        'No se pudo consultar el Dashboard.',

      token: 0
    });
  }
};
