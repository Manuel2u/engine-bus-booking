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

router.get("/driver", verifyAccessToken, isAdminOrSuperAdmin, GET_ONE);

router.get("/drivers", verifyAccessToken, isAdminOrSuperAdmin, GET_ALL);

router.patch("/driver", verifyAccessToken, isAdminOrSuperAdmin, UPDATE_ONE);

router.post(
  "/driver/retire",
  verifyAccessToken,
  isAdminOrSuperAdmin,
  RETIRE_ONE
);

export default router;
