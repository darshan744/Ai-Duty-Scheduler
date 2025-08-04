import { ScheduleModel } from "./Models/Schedule";
import { IUser, Role, UserModel } from "./Models/User";
import { VenueModel } from "./Models/Venue";
import { StaffRetrieval, VenueBody } from "./Types/Types";

export function getUserWithEmail(email: string) {
  return UserModel.findOne({ email: email }).select("+password");
}

export function userExist(email: string) {
  return UserModel.findOne({ email }).select("email");
}

export function createUser({
  email,
  name,
  regNo,
  profileImage,
  password,
  role,
}: {
  email: string;
  name: string;
  regNo: string;
  profileImage: string | null;
  password: string;
  role: Role;
}) {
  return UserModel.create({ email, name, regNo, profileImage, password, role });
}

export function getUser(email: string) {
  return UserModel.findOne({ email });
}

type ProfileEdits = {
  name?: string;
  email?: string;
  phoneNumber?: string;
};

export async function patchUserProfileData(
  profileEdits: ProfileEdits,
  email: string,
) {
  if (Object.keys(profileEdits).length === 0) {
    return;
  }
  const result = await UserModel.findOneAndUpdate(
    { email },
    { $set: profileEdits },
    { new: true },
  ).exec();
  return result;
}

export async function createVenue(
  venueData: Omit<VenueBody, "facilities"> & {
    facilities: string[];
    isActive: boolean;
  },
) {
  const venueModel = new VenueModel(venueData);

  await venueModel.save();

  return venueModel;
}
export async function getVenues() {
  return VenueModel.find();
}

export async function getStaffs({
  date,
  fromDate,
  toDate,
}: {
  date: Date;
  fromDate: Date;
  toDate: Date;
}) {
  console.log(date, fromDate, toDate);
  const scheduledUser = await ScheduleModel.find({
    date,
    startTime: { $lt: fromDate },
    endTime: { $gt: toDate },
  })
    .select("user")
    .lean();
  console.log(scheduledUser);
  const userIds = scheduledUser.map((user) => user.user);
  const users = await UserModel.find({ _id: { $nin: userIds } })
    .select("name regNo email")
    .lean<StaffRetrieval>()
    .exec();
  return users;
}

type AllVenues = {
  venueName: string;
  location: string;
  capacity: number;
  type?: "hall" | "lab" | "classroom" | "auditorium" | "other";
  isActive: boolean;
  facilities: string[];
  createdAt: Date;
  updatedAt: Date;
};

export async function getAllVenues() {
  return VenueModel.find().lean<AllVenues[]>();
}

type AllSchedules = {
  user: { name: string; regNo: string };
  scheduleName: string;
  startTime: Date;
  date: Date;
  endTime: Date;
  venue: { venueName: string };
};

export async function getAllSchedules() {
  return ScheduleModel.find()
    .populate("user", "regNo name")
    .populate("venue", "venueName")
    .lean<AllSchedules[]>();
}
