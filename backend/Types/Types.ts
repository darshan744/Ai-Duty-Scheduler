import { ObjectId } from "mongoose";

export type ProfileEdits = {
  name?: string;
  email?: string;
  phoneNumber?: string;
};

export type VenueBody = {
  venueName: string;
  location: string;
  capacity: number;
  type?: "hall" | "lab" | "classroom" | "auditorium" | "other";
  facilities: string;
};

export type StaffRetrieval = {
  name: string;
  email: string;
  regNo: string;
};

export type ScheduleRequestBody = {
  scheduleName: string;
  users: string[];
  startTime: string;
  endTime: string;
  venue: string;
  date: string;
};

export type AllSchedules = {
  user: { name: string; regNo: string };
  scheduleName: string;
  startTime: Date;
  date: Date;
  endTime: Date;
  venue: { venueName: string };
};
export type GroupedAllSchedules = {
  user: { name: string; regNo: string }[];
  scheduleName: string;
  startTime: Date;
  date: Date;
  endTime: Date;
  venue: string;
};
