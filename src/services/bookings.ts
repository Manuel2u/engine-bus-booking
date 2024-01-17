import { Request } from "express";
import { IAppContext, IService } from "../types/app";
import {
  IBookingsSchema,
  IInitializePayment,
  IcreateBookingsInput,
} from "../types/bookings";
import createError from "../utils/error";
import generateRandomSeatNumber from "../utils/generateRandomSeatNumber";
import { generateSignature } from "../utils/generateSignature";
import { __initializePayment, __verifyPayment } from "../utils/payments";

export class BookingService extends IService {
  constructor(context: IAppContext) {
    super(context);
  }

  async createOne(input: IcreateBookingsInput) {
    try {
      const { Trip, User, amount } = input;

      const alreadyExistingBookingForATrip = await this.db.BookingModel.findOne(
        { Trip, User }
      );

      if (alreadyExistingBookingForATrip) {
        throw createError("You have already booked this trip", 400);
      }

      const booking = new this.db.BookingModel({
        Trip,
        User,
        amount,
        paymentStatus: "pending",
        status: "pending",
      });

      await booking.save();

      return { booking };
    } catch (e) {
      throw e;
    }
  }

  async makePayment(input: IInitializePayment): Promise<any> {
    try {
      const { amount, email, reference } = input;

      const paymentUrl = await __initializePayment({
        amount,
        email,
        reference,
      });

      return paymentUrl;
    } catch (e) {
      throw e;
    }
  }

  async verifyPayment(event: any, req: Request): Promise<any> {
    try {
      if (event?.event !== "charge.success") {
        return "Not a charge success event";
      }

      console.log("we are here");

      const payment: any = await __verifyPayment({
        reference: event?.data.reference,
      });

      const booking = await this.db.BookingModel.findByIdAndUpdate(
        payment?.data.reference
      );
      const Trip = await this.db.TripModel.findById(booking?.Trip);
      const bus = await this.db.BusModel.findById(Trip?.bus);

      if (!booking) {
        return createError("Booking not found", 404);
      }

      if (booking.paymentStatus === "success") {
        return createError("Booking already paid for", 400);
      }

      // Check if the bus is full
      if (Trip.slots.length === bus.numberOfSeats) {
        throw createError("Bus is full", 400);
      }

      // Generate a random seat number
      const randomSeatNumber = generateRandomSeatNumber(bus, Trip.slots);

      // Add the seat number to the booking

      await booking.updateOne({
        $set: {
          seatNumber: randomSeatNumber,
          paymentStatus: "success",
          status: "success",
          paymentReference: payment.data.reference,
          paymentChannel: payment.data.authorization.channel,
          paymentMethod: payment.data.authorization.channel,
          paymentDate: payment.data.paidAt,
        },
      });

      await req.context.services.ticket.createOne(
        {
          Booking: booking._id,
          user: booking.User,
          QRCodeData: {
            bookingId: booking._id,
          },
          status: "VALID",
        },
        req
      );

      return "Payment verified";
    } catch (e) {
      throw e;
    }
  }
}
