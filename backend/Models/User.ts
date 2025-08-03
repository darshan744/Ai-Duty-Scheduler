import { Document, model, Schema } from "mongoose";

import { compare, genSalt, hash } from "bcrypt";
enum Role {
  STAFF = "STAFF",
  ADMIN = "ADMIN",
}

interface IUser extends Document {
  name: string;
  regNo: string;
  password: string;
  email: string;
  role: Role;
  profileImage: string | null;
  phoneNumber: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    regNo: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    email: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), required: true },
    profileImage: { type: String, required: false },
    phoneNumber: { type: String, required: false },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await genSalt(10);

  this.password = await hash(this.password, salt);
});
userSchema.methods.comparePassword = function(candidatePassword: string) {
  return compare(candidatePassword, this.password);
};

const UserModel = model<IUser>("User", userSchema);

export { UserModel, IUser, Role };
