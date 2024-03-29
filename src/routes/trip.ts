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
  SEARCH_TRIP,
  UPDATE_ONE,
} from "../controllers/trip.controller";

const router = Router();

router.post("/trip", verifyAccessToken, isAdminOrSuperAdmin, CREATE_ONE);

router.get("/trip", verifyAccessToken, isPhoneNumberVerified, GET_ONE);

router.get("/trips", verifyAccessToken, isAdminOrSuperAdmin, GET_ALL);

router.get("/trips/search", SEARCH_TRIP);

router.patch("/trip", verifyAccessToken, isAdminOrSuperAdmin, UPDATE_ONE);

router.patch(
  "/trip/cancel",
  verifyAccessToken,
  isAdminOrSuperAdmin,
  CANCEL_ONE
);

router.patch("/restore", verifyAccessToken, isAdminOrSuperAdmin, RESTORE_ONE);

router.delete(
  "/trip/delete/:tripId",
  verifyAccessToken,
  isAdminOrSuperAdmin,
  DELETE_ONE
);

export default router;
