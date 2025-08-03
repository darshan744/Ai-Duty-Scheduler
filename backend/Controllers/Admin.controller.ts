import { NextFunction, Request, Response } from "express";
import AppError from "../Utils/AppError";
import * as db from "../Repository";

export async function createScheduleForUser(
  req: Request,
  res: Response,
  next: NextFunction,
) { }
