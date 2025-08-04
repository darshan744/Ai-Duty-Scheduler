import { Document, ObjectId, Schema, model } from "mongoose";

interface ISchedule extends Document {
  user: ObjectId;
  scheduleName: string;
  startTime: Date;
  date: Date;
  endTime: Date;
  venue: ObjectId;
}

const scheduleSchema = new Schema<ISchedule>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    scheduleName: { type: String, required: true },
    date: { type: Schema.Types.Date, requird: true },
    startTime: { type: Schema.Types.Date, required: true },
    endTime: { type: Schema.Types.Date, required: true },
    venue: { type: Schema.Types.ObjectId, required: true, ref: "Venue" },
  },
  { timestamps: true },
);

const SchemaModel = model<ISchedule>("Schedule", scheduleSchema);

export { SchemaModel, ISchedule };
