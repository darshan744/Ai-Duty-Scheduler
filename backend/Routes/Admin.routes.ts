import { Router } from "express";
import {
  createVenue,
  getStaffs,
  getVenues,
  createSchedule,
  getAllVenues,
  getAllSchedules,
} from "../Controllers/Admin.controller";
const router = Router();
router.post("/venue", createVenue);
router.get("/venue", getVenues);
router.get("/venues", getAllVenues);
router.get("/staffs", getStaffs);
router.post("/schedule", createSchedule);
router.get("/schedules", getAllSchedules);
export default router;
