import { Document, model, Schema, Types } from "mongoose";
import { ILocationModel, ILocationSchema } from "../types/locations";

const LocationSchema = new Schema<ILocationSchema>(
  {
    country: {
      type: String,
      enum: ["GH", "RW"],
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Create and export the Location model
const LocationModel = model<ILocationSchema, ILocationModel>(
  "Location",
  LocationSchema
);

export default LocationModel;
