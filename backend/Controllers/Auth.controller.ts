import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";
import AppError from "../Utils/AppError";
import * as db from "../Repository";
import { IUser, Role } from "../Models/User";
import logger from "../Utils/Logger";
import environments from "../environments";
import { signToken, verifyToken } from "../Utils/Token";

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
    const jwtKey = sign(
      { email: user.email, id: user._id },
      environments.JWT_KEY || "",
      { expiresIn: "1h" },
    );
    const refreshKey = sign(
      { email: user.email, id: user._id },
      environments.REFRESH_KEY || "",
      { expiresIn: "7d" },
    );
    res
      .cookie("token", jwtKey, {
        httpOnly: true, // Prevents JS access
        expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
      })
      .cookie("refresh_token", refreshKey, {
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
      })
      .status(200)
      .json({
        email,
        name: user.name,
        profileImage: user.profileImage,
        role: user.role,
      });
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
    logger.info("User Created");
    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error: any) {
    next(error instanceof AppError ? error : new AppError(error.message, 500));
  }
}

export function refreshToken(req: Request, res: Response, next: NextFunction) {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new AppError("Refresh token is missing", 401);
    }
    // Verify the refresh token and generate a new access token
    const payload: any = verifyToken(refreshToken, "refresh");
    const newAccessToken = signToken(payload, { expiresIn: "1h" }, "access");
    logger.info("New access token generated for user:", payload.email);
    res
      .status(200)
      .cookie("token", newAccessToken, {
        expires: new Date(Date.now() + 3600000), // 1 hour
        httpOnly: true, // Prevents client-side access to the cookie
      })
      .json({ message: "Token refreshed successfully" });
  } catch (error: any) {
    next(error instanceof AppError ? error : new AppError(error.message, 500));
  }
}
