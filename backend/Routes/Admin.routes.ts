import { Router } from "express";
import {
  createVenue,
  getStaffs,
  getVenues,
  createSchedule
} from "../Controllers/Admin.controller";
const router = Router();
router.post("/venue", createVenue);
router.get("/venue", getVenues);
router.get("/staffs", getStaffs);
router.post("/schedule" , createSchedule)
export default router;
