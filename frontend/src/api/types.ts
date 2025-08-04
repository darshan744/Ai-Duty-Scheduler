export type LoginResponse = {
  name: string;
  email: string;
  profileImage: string | null;
  role: "STAFF" | "ADMIN";
};

export type SignUpProps = {
  name: string;
  regNo: string;
  password: string;
  email: string;
};

export type SignUpResponse = {
  name: string;
  regNo: string;
  password: string;
  email: string;
  role: "STAFF" | "ADMIN";
  profileImage: string | null;
};

export type ScheduleRequestProps = {
  scheduleName: string;
  date: Date | string;
  startTime: string;
  endTime: string;
  venue: string;
  users: string[];
};

export type AllVenues = {
  venueName: string;
  location: string;
  capacity: number;
  type?: "hall" | "lab" | "classroom" | "auditorium" | "other";
  isActive: boolean;
  facilities: string[];
  createdAt: Date;
  updatedAt: Date;
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
