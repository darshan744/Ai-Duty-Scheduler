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
