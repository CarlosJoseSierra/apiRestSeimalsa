// config.js
import { config } from "dotenv";

// 1. Se ejecuta la configuración inmediatamente
config(); 

// 2. Se capturan los valores del entorno ya cargados
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_SERVER = process.env.DB_SERVER;
const DB_DATABASE = process.env.DB_DATABASE;
const PORT = process.env.PORT || 3000;

// 3. Verificación de depuración para Railway
if (!DB_SERVER) {
  console.error("❌ CRÍTICO: DB_SERVER no se cargó. Revisa las variables en Railway.");
}

// 4. Se exportan los valores ya procesados
export {
  DB_USER,
  DB_PASSWORD,
  DB_SERVER,
  DB_DATABASE,
  PORT
};

export default {
  DB_USER,
  DB_PASSWORD,
  DB_SERVER,
  DB_DATABASE,
  PORT
};