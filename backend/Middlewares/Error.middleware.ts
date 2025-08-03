import { NextFunction, Request, Response } from "express";
import logger from "../Utils/Logger";
export default function ErrorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  logger.error(err.message);
  res
    .status(
      "statusCode" in err ? Number(err.statusCode) : 500, // Use 'statuscode' if available, otherwise default to 500
    )
    .json({
      message: err.message,
      error:
        process.env.NODE_ENV === "production" ? "Internal Server Error" : err,
    });
}
