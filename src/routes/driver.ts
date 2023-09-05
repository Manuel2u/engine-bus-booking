import { Router } from "express";
import {
  isAdminOrSuperAdmin,
  isPhoneNumberVerified,
  verifyAccessToken,
} from "../middlewares/verification";
import {
  CREATE_ONE,
  GET_ALL,
  GET_ONE,
  RETIRE_ONE,
  UPDATE_ONE,
} from "../controllers/driver.controller";

import multer from "multer";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/create-one",
  upload.fields([
    { name: "license", maxCount: 1 },
    { name: "profilePic", maxCount: 1 },
  ]),
  verifyAccessToken,
  isAdminOrSuperAdmin,
  CREATE_ONE
);

router.post("/get-one", verifyAccessToken, isAdminOrSuperAdmin, GET_ONE);

router.post("/get-all", verifyAccessToken, isAdminOrSuperAdmin, GET_ALL);

router.patch("/update-one", verifyAccessToken, isAdminOrSuperAdmin, UPDATE_ONE);

router.post("/retire-one", verifyAccessToken, isAdminOrSuperAdmin, RETIRE_ONE);

export default router;
