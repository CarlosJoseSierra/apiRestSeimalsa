import { getConnection, querys, sql } from "../database";


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
    const {AS_SS_id, AS_USU_id, AS_fecha,AS_CLI_id,AS_AT_id,AS_OT_id,AS_OT_codigo, AS_TPS_id,
      AS_EC_id,AS_UBIC_id,AS_serie,AS_placa,AS_EQUIP_id,AS_LOGO_id,AS_observacionTecnica,
      AS_USU_ing,AS_Subtotal,AS_impuesto,AS_iva,AS_total,AS_descCliente,AS_descuento,
      AS_descuentoR,AS_descuentoS,AS_descuentoP,AS_EstadoFactura,
      AS_Reporte,AS_SC_id,AS_ES_id,AS_IE_id,AS_SEDE_id,AS_fechaReq,AS_semana,AS_numReq,
      AS_PR_id,AS_UBIC_id2,AS_TPSP_id,AS_VEND_id,AS_serie2,AS_placa2,AS_EQUIP_id2,
      AS_LOGO_id2,AS_observacion2,AS_EM_id,AS_CT_idOrigen,AS_serieCompresor} = req.body;
    try {
      const pool = await getConnection();
      
      const codigo = await pool.request().query(querys.getLastIdAreaServivio);
      let id = codigo.recordset[0].AS_id;
      let secuencial = '';
     let _as_es_id = AS_ES_id;
      if(id>0){
        secuencial = 'CT'+(id);
      
        const pool = await getConnection();
        const result = await pool
        .request()
        .input("AS_secuencial", sql.VarChar, secuencial)
        .input("AS_SS_id", sql.Decimal, AS_SS_id)
        .input("AS_USU_id", sql.Decimal, AS_USU_id)
        .input("AS_fecha", sql.DateTime, AS_fecha)
        .input("AS_CLI_id", sql.Decimal, AS_CLI_id)
        .input("AS_AT_id", sql.Decimal, AS_AT_id)
        .input("AS_OT_id", sql.Decimal, AS_OT_id)
        .input("AS_OT_codigo", sql.VarChar, AS_OT_codigo)
        .input("AS_TPS_id", sql.Decimal, AS_TPS_id)
        .input("AS_EC_id", sql.Decimal, AS_EC_id)
        .input("AS_UBIC_id", sql.Decimal, AS_UBIC_id)
        .input("AS_serie", sql.VarChar, AS_serie)
        .input("AS_placa", sql.VarChar, AS_placa)
        .input("AS_EQUIP_id", sql.Decimal, AS_EQUIP_id)
        .input("AS_LOGO_id", sql.Decimal, AS_LOGO_id)
        .input("AS_observacionTecnica", sql.VarChar, AS_observacionTecnica)
        .input("AS_USU_ing", sql.Decimal, AS_USU_ing)
        .input("AS_Subtotal", sql.Decimal, AS_Subtotal)
        .input("AS_impuesto", sql.Decimal, AS_impuesto)
        .input("AS_iva", sql.Decimal, AS_iva)
        .input("AS_total", sql.Decimal, AS_total)
        .input("AS_descCliente", sql.Decimal, AS_descCliente)
        .input("AS_descuento", sql.Decimal, AS_descuento)
        .input("AS_descuentoR", sql.Decimal, AS_descuentoR)
        .input("AS_descuentoS", sql.Decimal, AS_descuentoS)
        .input("AS_descuentoP", sql.Decimal, AS_descuentoP)
        .input("AS_EstadoFactura", sql.Decimal, AS_EstadoFactura)
        .input("AS_Reporte", sql.VarChar, AS_Reporte)
        .input("AS_SC_id", sql.Decimal, AS_SC_id)
        .input("AS_ES_id", sql.Decimal, AS_ES_id)
        .input("AS_IE_id", sql.Decimal, AS_IE_id)
        .input("AS_SEDE_id", sql.Decimal, AS_SEDE_id)
        .input("AS_fechaReq", sql.DateTime, AS_fechaReq)
        .input("AS_semana", sql.VarChar, AS_semana)
        .input("AS_numReq", sql.VarChar, AS_numReq)
        .input("AS_PR_id", sql.Decimal, AS_PR_id)
        .input("AS_UBIC_id2", sql.Decimal, AS_UBIC_id2)
        .input("AS_TPSP_id", sql.Decimal, AS_TPSP_id)
        .input("AS_VEND_id", sql.Decimal, AS_VEND_id)
        .input("AS_serie2", sql.VarChar, AS_serie2)
        .input("AS_placa2", sql.VarChar, AS_placa2)
        .input("AS_EQUIP_id2", sql.Decimal, AS_EQUIP_id2)
        .input("AS_LOGO_id2", sql.Decimal, AS_LOGO_id2)
        .input("AS_observacion2", sql.VarChar, AS_observacion2)
        .input("AS_EM_id", sql.Decimal, AS_EM_id)
        .input("AS_CT_idOrigen", sql.Decimal, AS_CT_idOrigen)
        .input("AS_serieCompresor", sql.VarChar, AS_serieCompresor)
        
        .query(querys.addNewAreaServicio);
        if(result.rowsAffected==1){
          return res.status(200).json({ status: "ok", msg: "Registro exitoso" ,token:0});
        }else{
          return res.status(400).json({ status: "400", msg: "No se pudo registrar, consulte al administrador" ,token:0});
        }
      }else{
        
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }


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