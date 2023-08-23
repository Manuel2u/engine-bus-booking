import { Router } from "express";

import {
  SIGNUP,
  SIGNIN,
  VERIFYPHONE,
  RESEND,
  CREATEADMIN,
  CREATESUDOADMIN,
  GOOGLE,
} from "../controllers/user.controller";
import { verifyAccessToken } from "../middlewares/verification";
import passport from "passport";
import { initializeGoogleStrategy } from "../middlewares/initializeOAuth";

const router = Router();

router.post("/signup", SIGNUP);

router.post("/createadmin", CREATEADMIN);

router.post("/createsudoadmin", CREATESUDOADMIN);

router.post("/signinuser", SIGNIN);

router.post("/signin-admin", SIGNIN);

router.post("/signin-sudo-admin", SIGNIN);

router.post("/verifyphone", verifyAccessToken, VERIFYPHONE);

router.get("/resendsms", verifyAccessToken, RESEND);

router.get(
  "/google/redirect",
  initializeGoogleStrategy,
  passport.authenticate("google"),
  GOOGLE
);

router.get(
  "/google",
  initializeGoogleStrategy,
  passport.authenticate("google", { scope: ["profile"] })
);

export default router;
