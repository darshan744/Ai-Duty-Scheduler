import { IUser, Role, UserModel } from "./Models/User";

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
