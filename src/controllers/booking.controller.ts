import { NextFunction, Request, Response } from "express";
import { IAppContext } from "../types/app";
import crypto from "crypto";
import {
  IcreateBookingRequestBody,
  IcreateBookingsInput,
} from "../types/bookings";
import { generateSignature } from "../utils/generateSignature";
import { IcreateTicketInput } from "../types/tickets";
import { config } from "../config";

declare module "express-serve-static-core" {
  interface Request {
    context: IAppContext;
  }
}

export const CREATE_ONE = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { Trip, amount }: IcreateBookingRequestBody = req.body;

    if (!Trip || !amount) {
      return res
        .status(400)
        .json({ message: "Make sure all input fileds are correct" });
    }

    const _booking = await req.context.services?.booking.createOne({
      Trip,
      User: req.user._id,
      amount,
    });

    return res.status(200).json({ success: true, data: _booking });
  } catch (e) {
    next(e);
  }
};

export const MAKE_PAYMENT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { amount, email, reference } = req.body;

    const paymentUrl = await req.context.services?.booking.makePayment({
      amount,
      email,
      reference,
    });

    return res.status(200).json({ success: true, data: paymentUrl });
  } catch (e) {
    next(e);
  }
};

export const VERIFY_PAYMENT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hash = crypto
      .createHmac("sha512", config.payment.secret_key)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (hash == req.headers["x-paystack-signature"]) {
      const event = req.body;

      const message = await req.context.services?.booking.verifyPayment(
        event,
        req
      );

      return res.status(200).json({ status: true, message });
    }

    return res.status(400).json({ status: false, message: "Invalid request" });
  } catch (e) {
    next(e);
  }
};
