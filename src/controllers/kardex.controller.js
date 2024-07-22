import { getConnection, querys, sql } from "../database";

export const getClienteKardex = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .query(querys.getClienteKardex);
    return res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getClienteKardexP = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .query(querys.getClienteKardexP);
    return res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getClienteKardexA = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .query(querys.getClienteKardexA);
    return res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

export const getClienteKardexU = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request()
      .query(querys.getClienteKardexU);
    return res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};