import { Router } from "express";
import { createVenue, getVenues } from "../Controllers/Admin.controller";
const router = Router();
router.post("/venue", createVenue);
router.get("/venue", getVenues);
export default router;
