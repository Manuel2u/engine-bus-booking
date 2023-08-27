import { IAppContext } from "../types/app";

declare module "express-serve-static-core" {
  interface Request {
    context: IAppContext;
  }
}

import { NextFunction, Request, Response } from "express";
import { IcreateTicketRequestBody } from "../types/tickets";

export const CREATE_ONE = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { Booking, QRCode }: IcreateTicketRequestBody = req.body;

    if (!Booking || !QRCode) {
      return res
        .status(400)
        .json({ message: "Make sure all input fileds are correct" });
    }

    const _ticket = await req.context.services?.ticket.createOne({
      QRCode,
      Booking,
      user: req.user._id,
    });

    // Update user's Bookings array with the booking's ID
    const updatedUser = await req.context.db?.UserModel.findOneAndUpdate(
      { _id: req.user.user._id },
      { $push: { Tickets: _ticket?._id } },
      { new: true }
    );

    return res.status(200).json(_ticket);
  } catch (e) {
    next(e);
  }
};
