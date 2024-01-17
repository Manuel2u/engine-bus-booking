import { Document, Model, PopulatedDoc, Types } from "mongoose";
import { ITrip } from "./trips";

export interface IBookings {
  Trip: Types.ObjectId;
  User: Types.ObjectId;
  seatNumber: number;
  status: string;
  amount: number;
  paymentStatus: string;
  paymentMethod: string;
  paymentChannel: string;
  paymentDate: Date;
  paymentMetadata: any;
  paymentReference: string;
}

export interface IcreateBookingsInput {
  Trip: Types.ObjectId;
  User: Types.ObjectId;
  amount: number;
}

export interface IcreateBookingRequestBody extends Omit<IBookings, "user"> {}

export interface IBookingsSchema extends IBookings, Document {
  _id: Types.ObjectId;
  createdAt: string;
  updatedAt: string;
}

export interface IBookingsModel extends Model<IBookingsSchema> {}

export interface IInitializePayment {
  amount: number;
  email: string;
  reference: Types.ObjectId;
  metadata?: any;
}
