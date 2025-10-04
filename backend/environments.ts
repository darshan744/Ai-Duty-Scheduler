import { config } from "dotenv";


if(process.env.NODE_ENV && process.env.NODE_ENV === 'development') 
  config({path : ".env.development"})
else
  config();

export default {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  FRONTEND_URL: process.env.FRONTEND_URL,
  LOG_LEVEL: process.env.LOG_LEVEL,
  JWT_KEY: process.env.JWT_KEY,
  REFRESH_KEY: process.env.REFRESH_KEY,
};
