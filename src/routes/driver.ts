import { Router } from "express";
import {
  isAdmin,
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
  isAdmin,
  CREATE_ONE
);

router.post("/get-one", verifyAccessToken, isAdmin, GET_ONE);

router.post("/get-all", verifyAccessToken, isAdmin, GET_ALL);

router.post("/update-one", verifyAccessToken, isAdmin, UPDATE_ONE);

router.post("/decomission-one", verifyAccessToken, isAdmin, RETIRE_ONE);

export default router;
