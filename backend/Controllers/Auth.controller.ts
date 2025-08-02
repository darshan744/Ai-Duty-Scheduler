import { NextFunction, Request, Response } from "express";
import AppError from "../Utils/AppError";
import * as db from "../Repository";
import { IUser, Role } from "../Models/User";
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

    const user = await db.getUserWithEmail(email);
    if (!user) {
      throw new AppError("User doesn't exist", 404);
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
      throw new AppError("Invalid Credentials", 400);
    }

    res
      .status(200)
      .json({ email, name: user.name, profileImage: user.profileImage });
  } catch (error: any) {
    next("errorCode" in error ? error : new AppError(error.message, 500));
  }
}

export async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    let { email, password, name, role, regNo }: IUser = req.body;
    if (!email || !password || !name) {
      throw new AppError("Email, password and name are required", 400);
    }
    if (await db.userExist(email)) {
      throw new AppError("User already exists", 409);
    }
    if (!role) {
      role = Role.STAFF; // Default role if not provided
    }
    const newUser = await db.createUser({
      email,
      password,
      name,
      role,
      regNo,
      profileImage: null,
    });
    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error: any) {
    next(error instanceof AppError ? error : new AppError(error.message, 500));
  }
}
