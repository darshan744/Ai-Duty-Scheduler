import { NextFunction, Request, Response } from "express";
import AppError from "../Utils/AppError";

import * as db from "../Repository";
import { IUser } from "../Models/User";
import { ProfileEdits } from "../Types/Types";
export async function getProfile(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const email = req.user?.email;

    if (!email) {
      throw new AppError("Email not Found in request", 404);
    }

    const user: IUser | null = await db.getUser(email);

    if (!user) {
      throw new AppError("User not found", 404);
    }
    res.json({ message: "User found", data: user });
  } catch (error: any) {
    next(error instanceof AppError ? error : new AppError(error.message, 500));
  }
}

export async function patchProfile(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const email = req.user?.email;
    if (!email) {
      throw new AppError("Email not Found in request", 404);
    }
    const patchData: ProfileEdits = req.body;
    let result = await db.patchUserProfileData(patchData, email);
    if (!result) {
      res.json({ message: "Couldn't update data" });
      return;
    }
    let updatedData = Object.keys(patchData).reduce((acc, key) => {
      acc[key as keyof ProfileEdits] = result[key as keyof ProfileEdits];
      return acc;
    }, {} as ProfileEdits);

    res.json({ message: "Updated successfully", data: updatedData });
  } catch (error: any) {
    next(error instanceof AppError ? error : new AppError(error.message, 500));
  }
}
