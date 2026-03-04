import sql from "mssql";
import config from "../config";

export const dbSettings = {
  user:process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server:process.env.DB_SERVER,
  //server: "192.168.15.6",
  //server: "DESKTOP-DQQ2201",
  database: process.env.DB_DATABASE,
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
