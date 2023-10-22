import { Router } from "express";
import {
  CREATE_ONE,
  DECOMMISSION_ONE,
  GET_ALL,
  GET_ALL_VEHICLE_NUMBERS,
  GET_ONE,
  UPDATE_ONE,
} from "../controllers/bus.controller";
import {
  isAdminOrSuperAdmin,
  verifyAccessToken,
} from "../middlewares/verification";

import multer from "multer";

const router = Router();

router.post("/bus", verifyAccessToken, isAdminOrSuperAdmin, CREATE_ONE);

router.get("/bus", verifyAccessToken, isAdminOrSuperAdmin, GET_ONE);

router.get("/buses", verifyAccessToken, isAdminOrSuperAdmin, GET_ALL);

router.patch("/bus", verifyAccessToken, isAdminOrSuperAdmin, UPDATE_ONE);

router.get(
  "/busnumbers",
  verifyAccessToken,
  isAdminOrSuperAdmin,
  GET_ALL_VEHICLE_NUMBERS
);

router.post(
  "/decomission-one",
  verifyAccessToken,
  isAdminOrSuperAdmin,
  DECOMMISSION_ONE
);

export default router;
