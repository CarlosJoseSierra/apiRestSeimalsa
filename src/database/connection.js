// src/database/connection.js
import sql from "mssql";
import { DB_USER, DB_PASSWORD, DB_SERVER, DB_DATABASE } from "../config";

export const dbSettings = {
  user: DB_USER,
  password: DB_PASSWORD,
  server: DB_SERVER,
  database: DB_DATABASE,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export const getConnection = async () => {
  try {
    // Verificación de depuración en logs de Railway
    if (!DB_SERVER) {
      console.error("❌ ERROR: DB_SERVER no está cargado.");
      return null;
    }
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.error("❌ Error SQL:", error.message);
    throw error;
  }
};