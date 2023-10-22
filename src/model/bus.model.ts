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
      required: [true, "number of seats is required"],
      validate: {
        validator: Number.isInteger,
        message: "Number of seats must be an integer",
      },
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
    createdBy: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: "Admin",
    },
    updatedBy: {
      type: SchemaTypes.ObjectId,
      ref: "Admin",
    },
    busCompany: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: "BusCompany",
    },
  },
  { timestamps: true }
);

// Create and export the Bus model
const BusModel = model<IBusSchema, IBusModel>("Bus", BusSchema);

export default BusModel;
