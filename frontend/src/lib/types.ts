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

export interface VenueFormData {
  venueName: string;
  location: string;
  capacity: number;
  type?: "hall" | "lab" | "classroom" | "auditorium" | "other";
  facilities: string;
}

export interface VenueCreationResponse {
  venueName: string;
  location: string;
  capacity: number;
  type?: "hall" | "lab" | "classroom" | "auditorium" | "other";
  isActive: boolean;
  facilities: string[];
  createdAt: Date;
  updatedAt: Date;
}
