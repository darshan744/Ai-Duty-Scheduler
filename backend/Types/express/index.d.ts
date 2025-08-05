import { Request } from "express";
import { ObjectId } from "mongoose";

declare module "express" {
  interface Request {
    user?: {
      id: ObjectId;
      email: string;
    };
  }
}
