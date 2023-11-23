import { Router } from "express";
import {
  isAdminOrSuperAdmin,
  isPhoneNumberVerified,
  verifyAccessToken,
} from "../middlewares/verification";
import {
  CANCEL_ONE,
  CREATE_ONE,
  DELETE_ONE,
  GET_ALL,
  GET_ONE,
  RESTORE_ONE,
  UPDATE_ONE,
} from "../controllers/trip.controller";

const router = Router();

router.post("/trip", verifyAccessToken, isAdminOrSuperAdmin, CREATE_ONE);

router.get("/trip", verifyAccessToken, isPhoneNumberVerified, GET_ONE);

router.get("/trips", verifyAccessToken, isPhoneNumberVerified, GET_ALL);

router.patch("/trip", verifyAccessToken, isAdminOrSuperAdmin, UPDATE_ONE);

router.post("/trip/cancel", verifyAccessToken, isAdminOrSuperAdmin, CANCEL_ONE);

router.post(
  "/restore-one",
  verifyAccessToken,
  isAdminOrSuperAdmin,
  RESTORE_ONE
);

router.post("/delete-one", verifyAccessToken, isAdminOrSuperAdmin, DELETE_ONE);

export default router;
