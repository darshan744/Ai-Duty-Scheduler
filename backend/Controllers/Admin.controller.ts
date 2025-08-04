import { NextFunction, Request, Response } from "express";
import AppError from "../Utils/AppError";
import * as db from "../Repository";
import { ScheduleRequestBody, VenueBody } from "../Types/Types";
import { IVenue } from "../Models/Venue";
import { ScheduleModel } from "../Models/Schedule";
import { UserModel } from "../Models/User";
import mongoose, { ObjectId } from "mongoose";
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
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const {
      date,
      fromTime,
      toTime,
    }: { date: string; fromTime: string; toTime: string } = req.query as {
      date: string;
      fromTime: string;
      toTime: string;
    };

    console.log("Base Date", date);
    const baseDate = parseLocalDate(date);

    console.log("Converted Date", baseDate);
    // converts 16:15 -> Date formatted with time
    const fromDate = converFromTimeToDate(baseDate, fromTime);

    const toDate = converFromTimeToDate(baseDate, toTime);

    const staffs = await db.getStaffs({ date: baseDate, fromDate, toDate });
    if (!staffs) {
      throw new AppError("No staffs found", 404);
    }
    res.json({ message: "Staff", data: staffs });
  } catch (error: any) {
    next(error instanceof AppError ? error : new AppError(error.message, 500));
  }
}

export async function createSchedule(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const schedule: ScheduleRequestBody = req.body;
    const baseDate = parseLocalDate(schedule.date);
    const users = await UserModel.find({
      regNo: { $in: schedule.users },
    })
      .select("_id regNo")
      .lean<{ _id: ObjectId; regNo: string }[]>();
    const userIds = users.map((u) => u._id);
    const schedulePromises = userIds.map((user) =>
      new ScheduleModel({
        scheduleName: schedule.scheduleName,
        date: baseDate,
        endTime: converFromTimeToDate(baseDate, schedule.endTime),
        startTime: converFromTimeToDate(baseDate, schedule.startTime),
        venue: new mongoose.Types.ObjectId(schedule.venue),
        user,
      }).save(),
    );
    const allPromies = await Promise.all(schedulePromises);
    res.json({ message: "Done bro", data: allPromies });
  } catch (error: any) {
    next(error instanceof AppError ? error : new AppError(error.message, 500));
  }
}

function converFromTimeToDate(baseDate: Date, time: string): Date {
  const [hours, minutes] = time.split(":").map(Number);
  console.log(hours, minutes);
  const date = new Date(baseDate);
  date.setHours(hours, minutes, 0, 0);
  return date;
}

function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split("-").map(Number);
  return new Date(year, month - 1, day); // local date
}
