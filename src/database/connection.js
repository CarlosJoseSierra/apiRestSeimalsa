import sql from "mssql";
import config from "../config";

export const dbSettings = {
  DB_USER:config.DB_USER,
  DB_PASSWORD:config.DB_PASSWORD,
  DB_SERVER: config.DB_SERVER,
  DB_DATABASE:config.DB_DATABASE,
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};


export const getConnection = async () => {
  try {
    // Validación preventiva
    if (!dbSettings.server) {
      throw new Error("La configuración del servidor (DB_SERVER) está vacía.");
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
