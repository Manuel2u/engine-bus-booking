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

router.post("/create-one", verifyAccessToken, isAdminOrSuperAdmin, CREATE_ONE);

router.post("/get-one", verifyAccessToken, isAdminOrSuperAdmin, GET_ONE);

router.post("/get-all", verifyAccessToken, isAdminOrSuperAdmin, GET_ALL);

router.patch("/update-one", verifyAccessToken, isAdminOrSuperAdmin, UPDATE_ONE);

router.post("/cancel-one", verifyAccessToken, isAdminOrSuperAdmin, CANCEL_ONE);

router.post(
  "/restore-one",
  verifyAccessToken,
  isAdminOrSuperAdmin,
  RESTORE_ONE
);

router.post("/delete-one", verifyAccessToken, isAdminOrSuperAdmin, DELETE_ONE);

export default router;
