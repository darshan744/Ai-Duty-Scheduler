import { Request, Response, NextFunction } from "express";
import AppError from "../Utils/AppError";
import jwt from "jsonwebtoken";
import environments from "../environments";
export default function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  // Verfication of token
  try {
    // Simulate authentication check
    const token = req.cookies.token;
    if (!token) {
      throw new AppError("Authentication token is missing", 401);
    }
    const payload = jwt.verify(token, environments.JWT_KEY as string);
    req.user = JSON.parse(JSON.stringify(payload));
    next();
  } catch (error: any) {
    next(error instanceof AppError ? error : new AppError(error.message, 401));
  }
}
