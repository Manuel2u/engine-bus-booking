import { Schema, SchemaTypes, model } from "mongoose";
import { ITicketModel, ITicketSchema } from "../types/tickets";

const TicketsSchema = new Schema<ITicketSchema>(
  {
    Booking: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: "Booking",
    },
    QRCode: {
      type: SchemaTypes.String,
      required: true,
    },
    user: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: SchemaTypes.String,
      enum: ["VALID", "INVALID"],
      required: true,
    },
  },
  { timestamps: true }
);

const TicketModel = model<ITicketSchema, ITicketModel>("Ticket", TicketsSchema);

export default TicketModel;
