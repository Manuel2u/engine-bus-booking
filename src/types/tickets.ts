import { Document, Model, Types } from "mongoose";

export interface ITicket {
  Booking: Types.ObjectId;
  QRCode: string;
  user: Types.ObjectId;
  status: "VALID" | "INVALID";
}

export interface IcreateTicketInput extends Omit<ITicket, "QRCode"> {
  QRCodeData: {
    bookingId: Types.ObjectId;
  };
}

export interface IGetTicket {
  bookingId: Types.ObjectId;
  skip: number;
  limit: number;
  populate?: any;
  sort?: any;
  filter?: any;
  query?: string;
  fields?: string[];
  options?: any[];
}

export interface IcreateTicketRequestBody extends Omit<ITicket, "user"> {}

export interface IGetTicketRequestBody {
  bookingId: Types.ObjectId;
}
export interface ITicketSchema extends ITicket, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: string;
}

export interface ITicketModel extends Model<ITicketSchema> {}
