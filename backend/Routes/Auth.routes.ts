import { Router } from "express";
import { login, signUp } from "../Controllers/Auth.controller";

const router = Router();
router.post("/login", login);
router.post("/signUp", signUp);
export default router;
