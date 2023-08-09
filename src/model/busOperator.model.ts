import { Schema, SchemaTypes, model } from "mongoose";
import { IbusOperatorModel, IbusOperatorSchema } from "../types/busOperator";

const BusOperatorSchema = new Schema<IbusOperatorSchema>({
  fullName: {
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
  numberOfBuses: {
    type: SchemaTypes.Number,
    required: true,
  },
  Buses: [
    {
      type: SchemaTypes.ObjectId,
      ref: "Bus",
      required: true,
    },
  ],

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
});

const busOperatorModel = model<IbusOperatorSchema, IbusOperatorModel>(
  "BusOperator",
  BusOperatorSchema
);

export default busOperatorModel;
