import { Schema, model, Document } from "mongoose";

interface IVenue extends Document {
  venueName: string;
  location: string;
  capacity: number;
  type?: "hall" | "lab" | "classroom" | "auditorium" | "other";
  isActive: boolean;
  facilities: string[];
  createdAt: Date;
  updatedAt: Date;
}

const VenueSchema = new Schema<IVenue>(
  {
    venueName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be at least 1"],
    },
    type: {
      type: String,
      enum: ["hall", "lab", "classroom", "auditorium", "other"],
      default: "other",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    facilities: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }, // adds createdAt and updatedAt automatically
);

const VenueModel = model<IVenue>("Venue", VenueSchema);

export { IVenue, VenueModel };
