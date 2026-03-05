import sql from "mssql";
import config from "../config";

export const dbSettings = {
  user:config.DB_USER,
  password:config.DB_PASSWORD,
  server: config.DB_SERVER,
  database:config.DB_DATABASE,
  options: {
    encrypt: false, // for azure
    trustServerCertificate: true, // change to true for local dev / self-signed certs
  },
};

export const getConnection = async () => {
  try {
    const pool = await sql.connect(dbSettings);
    return pool;
  } catch (error) {
    console.error(error);
  }
};

export { sql };
