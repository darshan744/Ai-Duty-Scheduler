import express from "express";
import cors from "cors";

import connectToDB from "./Utils/ConnectToDB";
import logger from "./Utils/Logger";
import environments from "./environments";

import AuthRoutes from "./Routes/Auth.routes";
import AdminRoutes from "./Routes/Admin.routes";
import StaffRoutes from "./Routes/Staff.routes";

import ErrorMiddleware from "./Middlewares.ts/Error.middleware";
import loggerMiddleware from "./Middlewares.ts/Logger.middleware";

connectToDB();
const app = express();

logger.debug("Initialized CORS Options");
app.use(
  cors({
    origin: environments.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(loggerMiddleware);
logger.debug("Added Logger Middleware");
app.use(express.json());
logger.debug("Added JSON parser middleware");

logger.debug("Added Routes to the application");
app.use("/auth", AuthRoutes);
app.use("/admin", AdminRoutes);
app.use("/staff", StaffRoutes);

// Error Hanling Middleware
app.use(ErrorMiddleware);
logger.debug("Added Error Handling Middleware");
export default app;
