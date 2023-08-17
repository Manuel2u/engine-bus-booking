import { Schema, SchemaTypes, model } from "mongoose";
import { IbusCompanyModel, IbusCompanySchema } from "../types/busCompany";

const busCompanySchema = new Schema<IbusCompanySchema>({
  name: {
    type: SchemaTypes.String,
    required: true,
  },
  mobileNumber: {
    type: SchemaTypes.String,
    required: true,
  },
  email: {
    type: SchemaTypes.String,
    required: true,
  },
  users: [
    {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: "User",
    },
  ],
  companyDocuments: {
    type: SchemaTypes.String,
    required: true,
  },
  Buses: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Bus",
      required: true,
    },
  ],
  Drivers: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Driver",
      required: true,
    },
  ],
  role: {
    type: SchemaTypes.String,
    required: true,
  },

  Trips: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Trip",
      required: true,
    },
  ],
  Bookings: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Booking",
      required: true,
    },
  ],
  status: {
    type: SchemaTypes.String,
    enum: ["ACCEPTED", "REJECTED", "PENDING"],
    required: true,
  },
});

const busCompanyModel = model<IbusCompanySchema, IbusCompanyModel>(
  "BusCompany",
  busCompanySchema
);

export default busCompanyModel;
