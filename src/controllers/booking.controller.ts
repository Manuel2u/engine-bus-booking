import { NextFunction, Request, Response } from "express";
import { IAppContext } from "../types/app";
import {
  IcreateBookingRequestBody,
  IcreateBookingsInput,
} from "../types/bookings";
import { generateSignature } from "../utils/generateSignature";
import { IcreateTicketInput } from "../types/tickets";

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
    const { Trip, numOfSeats }: IcreateBookingRequestBody = req.body;

    if (!Trip || !numOfSeats) {
      return res
        .status(400)
        .json({ message: "Make sure all input fileds are correct" });
    }

    const _booking = await req.context.services?.booking.createOne({
      Trip,
      numOfSeats,
      User: req.user._id,
    });

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 5);

    const qrCodeData = {
      ticketId: _booking._id, // Unique identifier for the ticket
      expirationDate: expirationDate.toISOString(), // Expiration date
      eventInfo: "Bus Ticket", // Event information
      status: "VALID", // Initial status
      signature: null,
    };

    // Sign the QR code data with a secret key (keep the key secure)
    const secretKey = "YourSecretKey";
    const signature = generateSignature(qrCodeData, secretKey);
    qrCodeData.signature = signature;

    // Create a new ticket associated with the booking
    const ticketData: IcreateTicketInput = {
      Booking: _booking._id,
      user: req.user._id, // Use the user associated with the booking
      QRCodeData: qrCodeData,
      status: "VALID", // Initial status
    };

    // Create the ticket with the QR code
    const ticket = await req.context.services.ticket.createOne({
      ...ticketData,
    });

    return res.status(200).json({ success: true, data: ticket });
  } catch (e) {
    next(e);
  }
};
