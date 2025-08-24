import { getConnection, querys, sql } from "../database";

export const getReporteSabana = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getReporteSabanaTotal);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getReporteCTsinOT = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getReporteCTsinOT);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getReporteOT = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(querys.getReporteOT);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getReporteMentenimiento = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().
    query(querys.getMentenimientoEquiposUrgente);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getReporteMantenimientoPorSerie = async (req, res) => {
  try {
    console.log(req.params.serie);
    const pool = await getConnection();
    const result = await pool.request()
    .input("serie", req.params.serie)
    .query(querys.getMentenimientoEquiposUrgente);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

