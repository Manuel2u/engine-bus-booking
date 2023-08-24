import { Router } from "express";
import {
  isAdmin,
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

router.post("/create-one", verifyAccessToken, isAdmin, CREATE_ONE);

router.post("/get-one", verifyAccessToken, isAdmin, GET_ONE);

router.post("/get-all", verifyAccessToken, isAdmin, GET_ALL);

router.post("/update-one", verifyAccessToken, isAdmin, UPDATE_ONE);

router.post("/cancel-one", verifyAccessToken, isAdmin, CANCEL_ONE);

router.post("/restore-one", verifyAccessToken, isAdmin, RESTORE_ONE);

router.post("/delete-one", verifyAccessToken, isAdmin, DELETE_ONE);

export default router;
