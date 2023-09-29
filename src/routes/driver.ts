import { Router } from "express";
import {
  isAdminOrSuperAdmin,
  verifyAccessToken,
} from "../middlewares/verification";
import {
  CREATE_ONE,
  GET_ALL,
  GET_ONE,
  RETIRE_ONE,
  UPDATE_ONE,
} from "../controllers/driver.controller";

const router = Router();

router.post("/driver", verifyAccessToken, isAdminOrSuperAdmin, CREATE_ONE);

router.post("/get-one", verifyAccessToken, isAdminOrSuperAdmin, GET_ONE);

router.post("/get-all", verifyAccessToken, isAdminOrSuperAdmin, GET_ALL);

router.patch("/update-one", verifyAccessToken, isAdminOrSuperAdmin, UPDATE_ONE);

router.post("/retire-one", verifyAccessToken, isAdminOrSuperAdmin, RETIRE_ONE);

export default router;
