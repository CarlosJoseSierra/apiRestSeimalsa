// src/config.js
import { config } from "dotenv";
config();

export const DB_USER = process.env.DB_USER || "";
export const DB_PASSWORD = process.env.DB_PASSWORD || "";
export const DB_SERVER = process.env.DB_SERVER || "";
export const DB_DATABASE = process.env.DB_DATABASE || "";
export const PORT = process.env.PORT || 3000;

// Exportación para AWS
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || "";
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || "";
export const AWS_REGION = process.env.AWS_REGION || "us-east-1";
export const AWS_SG_ID = process.env.AWS_SG_ID || "";