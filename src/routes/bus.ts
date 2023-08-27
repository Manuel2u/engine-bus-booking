import { Router } from "express";
import {
  CREATE_ONE,
  DECOMMISSION_ONE,
  GET_ALL,
  GET_ONE,
  UPDATE_ONE,
} from "../controllers/bus.controller";
import {
  isAdminOrSuperAdmin,
  verifyAccessToken,
} from "../middlewares/verification";

import multer from "multer";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/create-one",
  upload.fields([
    { name: "insurance", maxCount: 1 },
    { name: "roadWorthy", maxCount: 1 },
  ]),
  verifyAccessToken,
  isAdminOrSuperAdmin,
  CREATE_ONE
);

router.get("/get-one", verifyAccessToken, isAdminOrSuperAdmin, GET_ONE);

router.get("/get-all", verifyAccessToken, isAdminOrSuperAdmin, GET_ALL);

router.post("/update-one", verifyAccessToken, isAdminOrSuperAdmin, UPDATE_ONE);

router.post(
  "/decomission-one",
  verifyAccessToken,
  isAdminOrSuperAdmin,
  DECOMMISSION_ONE
);

export default router;
