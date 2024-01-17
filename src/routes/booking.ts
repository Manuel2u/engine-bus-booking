import { Router } from "express";
import {
  isPhoneNumberVerified,
  verifyAccessToken,
} from "../middlewares/verification";
import {
  CREATE_ONE,
  MAKE_PAYMENT,
  VERIFY_PAYMENT,
} from "../controllers/booking.controller";

const router = Router();

router.post("/booking", verifyAccessToken, isPhoneNumberVerified, CREATE_ONE);

router.post("/payment", verifyAccessToken, isPhoneNumberVerified, MAKE_PAYMENT);

router.post("/payment/verify", VERIFY_PAYMENT);

export default router;
