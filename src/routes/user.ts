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
  RESETPASSWORD,
  UPDATEADMIN,
  ADD_ADMIN,
  GETALL,
  EDIT_ADMIN_ROLE,
} from "../controllers/user.controller";
import {
  isAdminOrSuperAdmin,
  isSuperAdmin,
  verifyAccessToken,
} from "../middlewares/verification";
import passport from "passport";
import { initializeGoogleStrategy } from "../middlewares/initializeOAuth";

const router = Router();

router.post("/signup", SIGNUP);

router.post("/admin", verifyAccessToken, isSuperAdmin, CREATEADMIN);

router.post("/sudoadmin", CREATESUDOADMIN);

router.post("/signin-user", SIGNIN_USER);

router.post("/signin-admin", SIGNIN_ADMIN);

router.post("/signin-sudo-admin", SIGNIN_SUDOADMIN);

router.post("/verifyphone", verifyAccessToken, VERIFYPHONE);

router.get("/resendsms", verifyAccessToken, RESEND);

router.post("/addadmins", verifyAccessToken, isSuperAdmin, ADD_ADMIN);

router.patch(
  "/updateadmin",
  verifyAccessToken,
  isAdminOrSuperAdmin,
  UPDATEADMIN
);

router.post(
  "/resetpassword",
  verifyAccessToken,
  isAdminOrSuperAdmin,
  RESETPASSWORD
);

router.get("/alladmins", verifyAccessToken, isAdminOrSuperAdmin, GETALL);

router.post("/editadminrole", verifyAccessToken, isSuperAdmin, EDIT_ADMIN_ROLE);

router.delete(
  "/deleteadmin/:adminID",
  verifyAccessToken,
  isSuperAdmin,
  EDIT_ADMIN_ROLE
);

router.post("/google", GOOGLE);

router.get(
  "/google/redirect",
  initializeGoogleStrategy,
  passport.authenticate("google", { session: false }),
  GOOGLE
);

router.get(
  "/google",
  initializeGoogleStrategy,
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
  })
);

export default router;
