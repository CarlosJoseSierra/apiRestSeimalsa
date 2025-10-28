import sql from "mssql";
import config from "../config";

export const dbSettings = {
 /*  user: config.dbUser,
  password: config.dbPassword,
  server: config.dbServer,
  database: config.dbDatabase, */
  //user: "sa",
  user:"server",
  password: "Solomon2011",
  //server: "181.198.20.179",
  server:"seimalsa.cwh4s6o4w0t4.us-east-1.rds.amazonaws.com",
  //server: "192.168.15.6",
  //server: "DESKTOP-DQQ2201",
  //database: "PRODUCCIONPRUEBA",
  database: "PRODUCCION",
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
