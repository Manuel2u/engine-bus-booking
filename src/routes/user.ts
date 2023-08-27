import { Router } from "express";

import {
  SIGNUP,
  VERIFYPHONE,
  RESEND,
  CREATEADMIN,
  CREATESUDOADMIN,
  GOOGLE,
  SIGNIN_USER,
  SIGNIN_ADMIN,
  SIGNIN_SUDOADMIN,
} from "../controllers/user.controller";
import { isSuperAdmin, verifyAccessToken } from "../middlewares/verification";
import passport from "passport";
import { initializeGoogleStrategy } from "../middlewares/initializeOAuth";

const router = Router();

router.post("/signup", SIGNUP);

router.post("/createadmin", verifyAccessToken, isSuperAdmin, CREATEADMIN);

router.post("/createsudoadmin", CREATESUDOADMIN);

router.post("/signinuser", SIGNIN_USER);

router.post("/signin-admin", SIGNIN_ADMIN);

router.post("/signin-sudo-admin", SIGNIN_SUDOADMIN);

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
