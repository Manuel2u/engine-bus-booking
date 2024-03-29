import { Document, model, Schema, SchemaTypes, Types } from "mongoose";
import { ITripModel, ITripSchema } from "../types/trips";

const TripSchema = new Schema<ITripSchema>(
  {
    date: {
      type: SchemaTypes.Date,
      required: true,
    },
    origin: {
      type: SchemaTypes.ObjectId,
      ref: "Location",
      required: true,
    },
    destination: {
      type: SchemaTypes.ObjectId,
      ref: "Location",
      required: true,
    },
    numberOfBusAssigned: {
      type: SchemaTypes.String,
      required: true,
    },
    timeScheduled: {
      type: new Schema({
        startTime: {
          type: SchemaTypes.String,
          required: true,
        },
        endTime: {
          type: SchemaTypes.String,
          required: true,
        },
      }),
      required: true,
    },
    tripStatus: {
      type: SchemaTypes.String,
      enum: ["CANCELLED", "ACTIVE", "DELETED", "IN_ACTIVE"],
      required: true,
    },
    tripType: {
      type: SchemaTypes.String,
      required: true,
    },
    busCompany: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: "BusCompany",
    },
    bus: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: "Bus",
    },
    price: {
      type: SchemaTypes.Number,
      required: true,
    },
    slots: {
      type: [SchemaTypes.String],
      required: false,
      default: [],
    },
    createdBy: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: "Admin",
    },
  },
  { timestamps: true }
);

TripSchema.methods.getDuration = function (): string {
  return "";
};

const TripModel = model<ITripSchema, ITripModel>("Trip", TripSchema);

export default TripModel;
