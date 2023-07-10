import { Router } from "express";

import {
  SIGNUP,
  SIGNIN,
  VERIFYPHONE,
  RESEND,
  CREATEADMIN,
  CREATESUPERADMIN,
} from "../controllers/user.controller";
import { verifyAccessToken } from "../middlewares/verification";

const router = Router();

router.post("/signup", SIGNUP);

router.post("/createadmin", CREATEADMIN);

router.post("/createsuperadmin", CREATESUPERADMIN);

router.post("/signin", SIGNIN);

router.post("/verifyphone", verifyAccessToken, VERIFYPHONE);

router.get("/resendsms", verifyAccessToken, RESEND);

export default router;
