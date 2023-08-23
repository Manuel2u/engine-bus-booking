import { Router } from "express";
import {
  isPhoneNumberVerified,
  verifyAccessToken,
} from "../middlewares/verification";

const router = Router();

export default router;
