import { Router } from "express";
import {
  ACCEPT_BUS_COMPANY,
  CREATE_BUS_COMPANY,
  REJECT_BUS_COMPANY,
} from "../controllers/busCompany.controller";
import { isSudoAdmin, isSuperAdmin } from "../middlewares/verification";
import multer from "multer";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/create-bus-company",
  upload.single("companyDocs"),
  CREATE_BUS_COMPANY
);

router.post("/accept-bus-company", isSudoAdmin, ACCEPT_BUS_COMPANY);

router.post("/reject-bus-company", isSudoAdmin, REJECT_BUS_COMPANY);

export default router;
