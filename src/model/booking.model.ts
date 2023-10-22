import { Schema, SchemaTypes, model } from "mongoose";
import { IBookingsModel, IBookingsSchema } from "../types/bookings";

const BookingSchema = new Schema<IBookingsSchema>({
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
  numOfSeats: {
    type: SchemaTypes.Number,
    required: [true, "number of seats is required"],
    validate: {
      validator: Number.isInteger,
      message: "Number of seats must be an integer",
    },
  },
});

const BookingModel = model<IBookingsSchema, IBookingsModel>(
  "Booking",
  BookingSchema
);

export default BookingModel;
