import { Document, model, Schema, Types } from "mongoose";
import { IUserSchema } from "../types/user";

// Interface representing the Bus document in MongoDB
interface IBus extends Document {
  busNumber: string;
  capacity: number;
  createdBy: Types.ObjectId | IUserSchema; // Reference to the User model
}

// Define the schema for the Bus model
const BusSchema = new Schema<IBus>(
  {
    busNumber: {
      type: String,
      required: true,
      unique: true, // Ensure that the bus number is unique in the collection
    },
    capacity: {
      type: Number,
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

// Create and export the Bus model
const BusModel = model<IBus>("Bus", BusSchema);

export default BusModel;
export { IBus };
