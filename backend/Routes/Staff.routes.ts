import { Router } from "express";
import {
  getProfile,
  patchProfile,
  getUserSchedules,
} from "../Controllers/Staff.controller";

const router = Router();

router.get("/profile", getProfile);
router.patch("/profile", patchProfile);
router.get("/schedules", getUserSchedules);
export default router;
