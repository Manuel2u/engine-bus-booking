import { Document, Model, Types } from "mongoose";

export interface IBookings {
  Bus: Types.ObjectId;
  Trip: Types.ObjectId;
  User: Types.ObjectId;
  numOfSeats: number;
}

export interface IcreateBookingsInput extends IBookings {}

export interface IBookATrip {
  userid: Types.ObjectId;
  bookingid: Types.ObjectId;
}

export interface IcreateBookingRequestBody extends Omit<IBookings, "user"> {}

export interface IBookingsSchema extends IBookings, Document {
  _id: Types.ObjectId;
  createdAt: string;
  updatedAt: string;
}

export interface IBookingsModel extends Model<IBookingsSchema> {}
