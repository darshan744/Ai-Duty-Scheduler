import { IUser, Role, UserModel } from "./Models/User";
import { VenueModel } from "./Models/Venue";
import { VenueBody } from "./Types/Types";

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
