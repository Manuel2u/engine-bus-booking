import { Router } from "express";

import { SIGNUP, SIGNIN, VERIFY, RESEND } from "../controllers/user.controller";
import { verifyAccessToken } from "../middlewares/verification";

const router = Router();

router.post("/signup", SIGNUP);

router.post("/signin", SIGNIN);

router.post("/verify", verifyAccessToken, VERIFY);

router.get("/resend", verifyAccessToken, RESEND);

export default router;
