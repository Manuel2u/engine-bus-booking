import { Router } from "express";
import {
  ACCEPT_BUS_COMPANY,
  CREATE_BUS_COMPANY,
  GET_ALL,
  GET_DASHBOARD_STAT,
  REJECT_BUS_COMPANY,
  UPDATE_BUS_COMPANY,
} from "../controllers/busCompany.controller";
import {
  isAdminOrSuperAdmin,
  isSudoAdmin,
  isSuperAdmin,
  verifyAccessToken,
} from "../middlewares/verification";

const router = Router();

router.post("/bus-company", CREATE_BUS_COMPANY);

router.post(
  "/accept-bus-company",
  verifyAccessToken,
  isSudoAdmin,
  ACCEPT_BUS_COMPANY
);

router.post("/reject-bus-company", isSudoAdmin, REJECT_BUS_COMPANY);

router.get("/all", verifyAccessToken, isSudoAdmin, GET_ALL);

router.get(
  "/dashboard",
  verifyAccessToken,
  isAdminOrSuperAdmin,
  GET_DASHBOARD_STAT
);

router.patch(
  "/update-bus-company",
  verifyAccessToken,
  isSuperAdmin,
  UPDATE_BUS_COMPANY
);

export default router;
