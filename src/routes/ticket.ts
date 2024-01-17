import { Router } from "express";
import {
  isPhoneNumberVerified,
  verifyAccessToken,
} from "../middlewares/verification";
import { GET_ONE } from "../controllers/ticket.controller";

const router = Router();

router.get("/ticket", verifyAccessToken, isPhoneNumberVerified, GET_ONE);

export default router;
