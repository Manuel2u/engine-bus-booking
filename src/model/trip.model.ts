import { Document, model, Schema, SchemaTypes, Types } from "mongoose";
import { ITripModel, ITripSchema } from "../types/trips";

const TripSchema = new Schema<ITripSchema>(
  {
    date: {
      type: SchemaTypes.Date,
      required: true,
    },
    origin: {
      type: SchemaTypes.String,
      required: true,
    },
    destination: {
      type: SchemaTypes.String,
      required: true,
    },
    numberOfBusAssigned: {
      type: SchemaTypes.String,
      required: true,
    },
    departureTime: {
      type: SchemaTypes.String,
      required: true,
    },
    arrivalTime: {
      type: SchemaTypes.String,
      required: true,
    },
    tripStatus: {
      type: SchemaTypes.String,
      required: true,
    },
    tripType: {
      type: SchemaTypes.String,
      required: true,
    },
  },
  { timestamps: true }
);

TripSchema.methods.getDuration = function (): string {
  return "";
};

const TripModel = model<ITripSchema, ITripModel>("Trip", TripSchema);

export default TripModel;
