import { Router } from "express";
import {
  ACCEPT_BUS_COMPANY,
  CREATE_BUS_COMPANY,
  REJECT_BUS_COMPANY,
} from "../controllers/busCompany.controller";
import {
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

export default router;
