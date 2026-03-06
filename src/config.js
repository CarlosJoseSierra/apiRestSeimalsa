// src/config.js
import { config } from "dotenv";
//if (process.env.RAILWAY_ENVIRONMENT === undefined) {
    config();
  //}
  export const PORT = process.env.PORT || 3000
  export const CORREO = process.env.CORREO || ""
  export default {
    port: process.env.PORT || 3000,
    dbUser: process.env.DB_USER || "",
    dbPassword: process.env.DB_PASSWORD || "",
    dbServer: process.env.DB_SERVER || "",
    dbDatabase: process.env.DB_DATABASE || "",
    dbDatabasePort: process.env.DB_DATABASEPORT || "",
  };

// Exportación para AWS
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || "";
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || "";
export const AWS_REGION = process.env.AWS_REGION || "us-east-1";
export const AWS_SG_ID = process.env.AWS_SG_ID || "";