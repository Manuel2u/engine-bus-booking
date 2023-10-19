import { Router } from "express";
import {
  isPhoneNumberVerified,
  verifyAccessToken,
} from "../middlewares/verification";
import { CREATE_ONE } from "../controllers/booking.controller";

const router = Router();

router.post("/", verifyAccessToken, isPhoneNumberVerified, CREATE_ONE);

export default router;
