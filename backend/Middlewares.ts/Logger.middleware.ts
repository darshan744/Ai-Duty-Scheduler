import { NextFunction, Request, Response } from "express";
import logger from "../Utils/Logger";

export default function loggerMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const str = `Request Method : ${req.method} to Url : ${req.url}`;
  logger.info(str);
  next();
}
