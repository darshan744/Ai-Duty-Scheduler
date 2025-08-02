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
  comparePassword(candidatePassword: string): Promise<boolean>;
}
const userSchema = new Schema(
  {
    name: { type: String, required: true },
    regNo: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    email: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), required: true },
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

userSchema.methods.comparePassword = async function(
  candidatePassword: string,
) {
  return await compare(candidatePassword, this.password);
};

const userModel = model("User", userSchema);

export { userModel, IUser, Role };
