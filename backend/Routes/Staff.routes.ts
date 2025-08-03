import { Router } from "express";
import { getProfile, patchProfile } from "../Controllers/Staff.controller";

const router = Router();

router.get("/profile", getProfile);
router.patch("/profile", patchProfile);
export default router;
