// src/database/connection.js
import sql from "mssql";
import { DB_USER, DB_PASSWORD, DB_SERVER, DB_DATABASE } from "../config";

export const dbSettings = {
  //user: DB_USER,
  user:"server",
  password: "Solomon2011",
  server: "seimalsa.cwh4s6o4w0t4.us-east-1.rds.amazonaws.com",
  database: "PRODUCCION",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export const getConnection = async () => {
  try {
    // Verificación de depuración en logs de Railway
    //if (!DB_SERVER) {
      //console.error("❌ ERROR: DB_SERVER no está cargado.");
      //return null;
    //}
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.error("❌ Error SQL:", error.message);
    throw error;
  }
};