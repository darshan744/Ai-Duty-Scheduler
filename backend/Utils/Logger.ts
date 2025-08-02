import pino from "pino";
import environments from "../environments";

const logger = pino({
  level: environments.LOG_LEVEL || "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
    },
  },
});

export default logger;
