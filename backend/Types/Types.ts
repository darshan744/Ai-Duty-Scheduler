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
