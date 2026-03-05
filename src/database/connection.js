import sql from "mssql";
import {config} from "../config";

export const dbSettings = {
  //user:config.DB_USER,
  user:"server",
  //password:config.DB_PASSWORD,
  password:"Solomon2011",
  //server: config.DB_SERVER,
  server:"seimalsa.cwh4s6o4w0t4.us-east-1.rds.amazonaws.com",
  //database:config.DB_DATABASE,
  database:"PRODUCCION",
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};


export const getConnection = async () => {
  try {
    if (!dbSettings.server) {
      throw new Error("La configuración del servidor (DB_SERVER) está vacía. "+ dbSettings.server + " server");
    }
    
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    // Esto aparecerá en los logs de Railway para decirte exactamente qué falló
    console.error("❌ Error detallado de conexión SQL:", error.message);
    throw error; // Re-lanzar es vital para que el login sepa que falló
  }
};

export { sql };
