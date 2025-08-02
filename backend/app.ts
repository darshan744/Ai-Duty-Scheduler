import express from "express";
import connectToDB from "./Database";
import logger from "./Utils/Logger";
import cors from "cors";
import environments from "./environments";
const app = express();
logger.debug("Initialized CORS Options");
app.use(
  cors({
    origin: environments.FRONTEND_URL,
  }),
);
connectToDB();
logger.debug("Added JSON parser middleware");
app.use(express.json());

export default app;
