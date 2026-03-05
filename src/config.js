import { config } from "dotenv";
config()

export const PORT = process.env.PORT || 3000
export const CORREO = process.env.CORREO || ""

export default {
  port: process.env.PORT || 3000,
  DB_USER: process.env.DB_USER || "",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_SERVER: process.env.DB_SERVER || "",
  DB_DATABASE: process.env.DB_DATABASE || "",
  DB_DATABASEPORT: process.env.DB_DATABASEPORT || "",
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || "",
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || "",
  AWS_REGION: process.env.AWS_REGION || "",
  AWS_SG_ID: process.env.AWS_SG_ID || "",
};
