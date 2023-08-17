import { Document, model, Schema, SchemaTypes } from "mongoose";
import { IBusModel, IBusSchema } from "../types/bus";

// Define the schema for the Bus model
const BusSchema = new Schema<IBusSchema>(
  {
    vehicleNumber: {
      type: SchemaTypes.String,
      required: true,
    },
    model: {
      type: SchemaTypes.String,
      required: true,
    },
    yearOfMake: {
      type: SchemaTypes.Number,
      required: true,
    },
    colour: {
      type: SchemaTypes.String,
      required: true,
    },
    numberOfSeats: {
      type: SchemaTypes.String,
      required: true,
    },
    status: {
      type: SchemaTypes.String,
      enum: ["ACTIVE", "INACTIVE", "DECOMMISSIONED"],
      required: true,
    },
    insurance: {
      type: SchemaTypes.String,
      required: true,
    },
    roadWorthy: {
      type: SchemaTypes.String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create and export the Bus model
const BusModel = model<IBusSchema, IBusModel>("Bus", BusSchema);

export default BusModel;
