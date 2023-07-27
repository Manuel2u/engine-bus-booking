import { Document, model, Schema, Types } from "mongoose";
import { IUserSchema } from "../types/user";

// Interface representing the OperatingTime document in MongoDB
interface IOperatingTime extends Document {
  time: Date;
  createdBy: Types.ObjectId | IUserSchema; // Reference to the User model
}

// Define the schema for the OperatingTime model
const OperatingTimeSchema = new Schema<IOperatingTime>(
  {
    time: {
      type: Date,
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

// Create and export the OperatingTime model
const OperatingTimeModel = model<IOperatingTime>(
  "OperatingTime",
  OperatingTimeSchema
);

export default OperatingTimeModel;
export { IOperatingTime };
