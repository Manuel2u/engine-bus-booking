import { Document, Model, Types } from "mongoose";

export interface ITicket {
  Booking: Types.ObjectId;
  QRCode: string;
  user: Types.ObjectId;
  status: "VALID" | "INVALID";
}

export interface IcreateTicketInput extends Omit<ITicket, "QRCode"> {
  QRCodeData: Object;
}

export interface IGetTicket {
  userid: Types.ObjectId;
  ticketid: Types.ObjectId;
}

export interface IcreateTicketRequestBody extends Omit<ITicket, "user"> {}
export interface ITicketSchema extends ITicket, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: string;
}

export interface ITicketModel extends Model<ITicketSchema> {}
