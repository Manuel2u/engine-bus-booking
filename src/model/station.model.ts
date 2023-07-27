import { Document, model, Schema, Types } from "mongoose";
import { IUserSchema } from "../types/user";
import LocationModel, { ILocation } from "./location.model";

// Interface representing the Station document in MongoDB
interface IStation extends Document {
  name: string;
  location: Types.ObjectId | ILocation; // Reference to the Location model
  createdBy: Types.ObjectId | IUserSchema; // Reference to the User model
}

// Define the schema for the Station model
const StationSchema = new Schema<IStation>(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: "Location", // Reference to the Location model
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create and export the Station model
const StationModel = model<IStation>("Station", StationSchema);

export default StationModel;
export { IStation };
