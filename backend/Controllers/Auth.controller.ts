import { NextFunction, Request, Response } from "express";
import AppError from "../Utils/AppError";

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;

    if (!email && !password) {
      throw new AppError("Email and Password is Required", 400);
    }
    if (!email) {
      throw new AppError("Email is Required", 400);
    }

    if (!password) {
      throw new AppError("Password is required", 400);
    }
  } catch (error: any) { }
}
