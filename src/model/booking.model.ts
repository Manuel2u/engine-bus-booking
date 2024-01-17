import { Schema, SchemaTypes, model } from "mongoose";
import { IBookingsModel, IBookingsSchema } from "../types/bookings";

const BookingSchema = new Schema<IBookingsSchema>(
  {
    Trip: {
      type: SchemaTypes.ObjectId,
      ref: "Trip",
      required: [true, "Trip is required"],
    },
    User: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: [true, "User Id is required"],
    },
    seatNumber: {
      type: SchemaTypes.Number,
      required: [false, "number of seats is required"],
      validate: {
        validator: Number.isInteger,
        message: "Number of seats must be an integer",
      },
    },
    paymentReference: {
      type: SchemaTypes.String,
      required: [false, "Payment reference is required"],
    },
    status: {
      type: SchemaTypes.String,
      enum: ["pending", "paid", "cancelled", "failed"],
      default: "pending",
    },
    amount: {
      type: SchemaTypes.Number,
      required: [true, "Amount is required"],
    },
    paymentStatus: {
      type: SchemaTypes.String,
      enum: ["pending", "paid", "cancelled", "failed"],
      default: "pending",
    },
    paymentMethod: {
      type: SchemaTypes.String,
      enum: ["card", "mobile_money"],
    },
    paymentChannel: {
      type: SchemaTypes.String,
      enum: ["visa", "mastercard", "mobile_money"],
    },
    paymentDate: {
      type: SchemaTypes.Date,
    },
  },
  { timestamps: true }
);

const BookingModel = model<IBookingsSchema, IBookingsModel>(
  "Booking",
  BookingSchema
);

export default BookingModel;
