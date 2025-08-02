import { config } from "dotenv";

config();

export default {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  FRONTEND_URL: process.env.FRONTEND_URL,
  LOG_LEVEL: process.env.LOG_LEVEL,
};
