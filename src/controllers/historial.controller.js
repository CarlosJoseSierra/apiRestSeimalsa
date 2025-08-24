import { Date, DateTime } from "mssql";
import { getConnection, querys, sql } from "../database";

export const getHistReparados = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
    .request()
    .input("id", req.params.id)
    .input("id2", req.params.id2)
    .input("Anio", req.params.anio)
    .query(querys.getDataReparados); //dataReparados
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
  };


  export const getHistDisponibles = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool
      .request()
      .input("id", req.params.id)
      .input("id2", req.params.id2)
      .input("Anio", req.params.anio)
      .query(querys.getDataDisponibles);//datadisponbles
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
    };

  export const getHistEntregados = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool
      .request()
      .input("id", req.params.id)
      .input("id2", req.params.id2)
      .input("Anio", req.params.anio)
      .query(querys.getDataEntregados);//dataentregados
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
    };

  export const getTopFiveItems = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool
        .request()
        .input("id", req.params.id)
        .input("id2", req.params.id2)
        .input("Anio", req.params.anio)
        .query(querys.getTopFiveItems);
        res.json(result.recordset);
      } catch (error) {
        res.status(500);
        res.send(error.message);
      }
  };

  export const getTopFiveItemsFiltro = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool
        .request()
        .input("id", req.params.id)
        .input("id2", req.params.id2)
        .input("Anio", req.params.anio)
        .input("Mes", req.params.mes)
        .query(querys.getTopFiveItemsFiltro);
        res.json(result.recordset);
      } catch (error) {
        res.status(500);
        res.send(error.message);
      }
  };

  export const getTotalItemsServ = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool
      .request()
      .input("Anio", req.params.anio)
      .query(querys.geoTotalItemsServicios);
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  export const getTotalItemsServFiltro = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool
      .request()
      .input("Anio", req.params.anio)
      .input("Mes", req.params.mes)
      .query(querys.geoTotalItemsServiciosFiltro);
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  export const getHistorialEquipoEntregado = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool
        .request()
        .input("id", req.params.id)
        .input("id2", req.params.id2)
        .input("Anio", req.params.anio)
        .query(querys.getHistorialEntregados);//gistorialentregados
        res.json(result.recordset);
      } catch (error) {
        res.status(500);
        res.send(error.message);
      }
  };

  export const getHistorialEquipoEntregadoFiltro = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool
        .request()
        .input("id", req.params.id)
        .input("id2", req.params.id2)
        .input("Anio", req.params.anio)
        .input("Mes", req.params.mes)
        .query(querys.getHistorialEntregadosFiltro);//gistorialentregados
        res.json(result.recordset);
      } catch (error) {
        res.status(500);
        res.send(error.message);
      }
  };

  export const getHistTotalReparado = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool
      .request()
      .input("Anio", req.params.anio)
      .query(querys.getHistorialTotalReparacion);//
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  export const getHistTotalReparadoFiltro = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool
      .request()
      .input("Anio", req.params.anio)
      .input("Mes", req.params.mes)
      .query(querys.getHistorialTotalReparacionFiltro);//
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  export const getHistTotalDisponible = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool
      .request()
      .input("Anio", req.params.anio)
      .query(querys.getHistorialTotalDisponible);//
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  export const getHistTotalDisponibleFiltro = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool
      .request()
      .input("Anio", req.params.anio)
      .input("Mes", req.params.mes)
      .query(querys.getHistorialTotalDisponibleFiltro);//
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  export const getHistTotalEntregado = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool
      .request()
      .input("Anio", req.params.anio)
      .query(querys.getHistorialTotalEntregados);//
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  export const getHistTotalEntregadoFiltro = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool
      .request()
      .input("Anio", req.params.anio)
      .input("Mes", req.params.mes)
      .query(querys.getHistorialTotalEntregadosFiltro);//
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  export const getHistorialEquipoReparado = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool
        .request()
        .input("id", req.params.id)
        .input("id2", req.params.id2)
        .input("Anio", req.params.anio)
        .query(querys.getHistorialReparacion);//historialReparacion
        res.json(result.recordset);
      } catch (error) {
        res.status(500);
        res.send(error.message);
      }
  };

  export const getHistorialEquipoReparadoFiltro = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool
        .request()
        .input("id", req.params.id)
        .input("id2", req.params.id2)
        .input("Anio", req.params.anio)
        .input("Mes", req.params.mes)
        .query(querys.getHistorialReparacionFiltro);//historialReparacion
        res.json(result.recordset);
      } catch (error) {
        res.status(500);
        res.send(error.message);
      }
  };

  export const getHistorialEquipoDisponible = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool
        .request()
        .input("id", req.params.id)
        .input("id2", req.params.id2)
        .input("Anio", req.params.anio)
        .query(querys.getHistorialDisponible);//historial dispnible
        res.json(result.recordset);
      } catch (error) {
        res.status(500);
        res.send(error.message);
      }
  };

  export const getHistorialEquipoDisponibleFiltro = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool
        .request()
        .input("id", req.params.id)
        .input("id2", req.params.id2)
        .input("Anio", req.params.anio)
        .input("Mes", req.params.mes)
        .query(querys.getHistorialDisponibleFiltro);//historial dispnible
        res.json(result.recordset);
      } catch (error) {
        res.status(500);
        res.send(error.message);
      }
  };

  export const getHistorialTotalEquipoReparado = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool
      .request()
      .input("Anio", req.params.anio)
      .query(querys.getDataReparadosTotal);//DataTotalRep
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  export const getHistorialTotalEquipoDisponible = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool
      .request()
      .input("Anio", req.params.anio)
      .query(querys.getDataDisponiblesTotal);//DataTotalDisp
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  export const getHistorialTotalEquipoEntregado = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool
      .request()
      .input("Anio", req.params.anio)
      .query(querys.getDataEntregadosTotal);//DataTotalEnt
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  //GLOBAL REFRIGERACION
  export const getTotalEquiposMapa = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool.request().query(querys.getDataEquiposMapa);//DataTotalRep
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  export const getTopFiveTecnicos = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool
        .request()
        .query(querys.getTopFiveTecnicos);
        res.json(result.recordset);
      } catch (error) {
        res.status(500);
        res.send(error.message);
      }
  };

  export const getHistTotalPorSerie = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool
      .request()
      .input("serie", req.params.serie)
      .input("idCli1", req.params.idCli1)
      .input("idCli2", req.params.idCli2)
      .query(querys.getDataHIstorialPorSerie); //dataReparados
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

  
  export const getHistTotalPorSerieInterno = async (req, res) => {
    try {
      const pool = await getConnection();
      const result = await pool
      .request()
      .input("serie", req.params.serie)
      .query(querys.getDataHIstorialPorSerieInterno); //dataReparados
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  };

    export const getHistTotalPorPlaca = async (req, res) => {
      try {
        const pool = await getConnection();
        const result = await pool
        .request()
        .input("placa", req.params.placa)
        .input("idCli1", req.params.idCli1)
        .input("idCli2", req.params.idCli2)
        .query(querys.getDataHIstorialPorPlaca); //dataReparados
        res.json(result.recordset);
      } catch (error) {
        res.status(500);
        res.send(error.message);
      }
    };

    export const getEntregadosPorSerie = async (req, res) => {
      try {
        const pool = await getConnection();
        const result = await pool
        .request()
        .input("serie", req.params.serie)
        .query(querys.getDataEntregadosPorSerie); 
        res.json(result.recordset);
      } catch (error) {
        res.status(500);
        res.send(error.message);
        console.log(error.message);
      }
    };

    export const getHistTotalCodSubCliente = async (req, res) => {
      try {
        const pool = await getConnection();
        const result = await pool
        .request()
        .input("codigo", req.params.codigo)
        .input("idCli1", req.params.idCli1)
        .input("idCli2", req.params.idCli2)
        .query(querys.getHistTotalCodSubCliente); //dataReparados
        res.json(result.recordset);
      } catch (error) {
        res.status(500);
        res.send(error.message);
      }
    };
