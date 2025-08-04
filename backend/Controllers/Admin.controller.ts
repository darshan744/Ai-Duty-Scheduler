import { NextFunction, Request, Response } from "express";
import AppError from "../Utils/AppError";
import * as db from "../Repository";
import { VenueBody } from "../Types/Types";
import { IVenue } from "../Models/Venue";
export async function createVenue(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const venueData: VenueBody & { isActive: boolean } = req.body;
    const formatedData = {
      ...venueData,
      facilities: venueData.facilities.split(",").map((f: string) => f.trim()),
      isActive: true,
    };
    const newVenue: IVenue | null = await db.createVenue(formatedData);
    if (!newVenue) {
      throw new AppError("Insertion Failed", 500);
    }
    res.json({ message: "Inserted Successfully", data: newVenue });
  } catch (error: any) {
    next(error instanceof AppError ? error : new AppError(error.message, 500));
  }
}

export async function getVenues(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const venues = await db.getVenues();
    const venueStringsArray = venues.map((v) => ({
      name: v.venueName,
      id: v._id?.toString(),
    }));

    res.json({ message: "Venues", data: venueStringsArray });
  } catch (error: any) {
    next(error instanceof AppError ? error : new AppError(error.message, 500));
  }
}

export async function getStaffs(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const staffs = await db.getStaffs();
    if (!staffs) {
      throw new AppError("No staffs found", 404);
    }
    res.json({ message: "Staff", data: staffs });
  } catch (error: any) {
    next(error instanceof AppError ? error : new AppError(error.message, 500));
  }
}
