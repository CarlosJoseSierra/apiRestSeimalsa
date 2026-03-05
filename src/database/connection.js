import sql from "mssql";
import config from "../config";

export const dbSettings = {
  //user:process.env.DB_USER,
  user:"server",
  //password: process.env.DB_PASSWORD,
  password:"Solomon2011",
  //server:process.env.DB_SERVER,
  server: "seimalsa.cwh4s6o4w0t4.us-east-1.rds.amazonaws.com",
  //server: "DESKTOP-DQQ2201",
  //database: process.env.DB_DATABASE,
  database:"PRODUCCION",
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
