import { Router } from "express";

import {
  SIGNUP,
  SIGNIN,
  VERIFY,
} from "../controllers/user.controller";
import { verifyAccessToken } from "../middlewares/verification";

const router = Router();

router.post("/signup", SIGNUP);

router.post("/signin", SIGNIN);

router.post("/verify", verifyAccessToken, VERIFY);

export default router;
