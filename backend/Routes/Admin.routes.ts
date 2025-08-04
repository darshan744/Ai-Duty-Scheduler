import { Router } from "express";
import {
  createVenue,
  getStaffs,
  getVenues,
} from "../Controllers/Admin.controller";
const router = Router();
router.post("/venue", createVenue);
router.get("/venue", getVenues);
router.get("/staffs", getStaffs);
export default router;
