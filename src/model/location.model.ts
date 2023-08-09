import { Document, model, Schema, Types } from "mongoose";
import { IUserSchema } from "../types/user";

// Define the valid country codes as an enum
enum CountryCode {
  GH = "GH",
  RW = "RW",
}

// Interface representing the Location document in MongoDB
interface ILocation extends Document {
  country: CountryCode;
  name: string;
  createdBy: Types.ObjectId | IUserSchema; // Reference to the User model
}

// Define the schema for the Location model
const LocationSchema = new Schema<ILocation>(
  {
    country: {
      type: String,
      enum: Object.values(CountryCode), // Ensures that the value is one of the specified enum values
      required: true,
    },
    name: {
      type: String,
      required: true,
      unique: true, // Ensure that the name is unique in the collection
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

// Create and export the Location model
const LocationModel = model<ILocation>("Location", LocationSchema);

export default LocationModel;
export { ILocation };
