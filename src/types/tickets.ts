import { Document, Model, Types } from "mongoose";

export interface ITicket {
  Booking: Types.ObjectId;
  QRCode: string;
}

export interface ITicketSchema extends ITicket, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: string;
}

export interface ITicketModel extends Model<ITicketSchema> {}
