export interface IUser {
  name: string;
  regNo: string;
  email: string;
  role: "STAFF" | "ADMIN";
  profileImage: string | null;
  phoneNumber: string;
  createdAt: Date;
}

export type IBaseResponse<T> = {
  message: string;
  data: T;
};

export type EditableInputs = {
  name: string;
  email: string;
  phoneNumber: string;
};
