import { Document, model, Schema, Types } from "mongoose";
import { IStation } from "./station.model";
import { IOperatingTime } from "./operatingTime.model";
import { IBus } from "./bus.model";
import { IUserSchema } from "../types/user";

interface ITrip extends Document {
  origin: Types.ObjectId | IStation;
  destination: Types.ObjectId | IStation;
  reportingTime: Types.ObjectId | IOperatingTime;
  departureTime: Types.ObjectId | IOperatingTime;
  arrivalTime: Types.ObjectId | IOperatingTime;
  price: number;
  bus: Types.ObjectId | IBus;
  seatsAvailable: number;
  createdBy: Types.ObjectId | IUserSchema;
  getDuration(): number;
  incrementSeatsAvailable(): void;
  decrementSeatsAvailable(): void;
}

const TripSchema = new Schema<ITrip>(
  {
    origin: {
      type: Schema.Types.ObjectId,
      ref: "Station",
      required: true,
    },
    destination: {
      type: Schema.Types.ObjectId,
      ref: "Station",
      required: true,
    },
    reportingTime: {
      type: Schema.Types.ObjectId,
      ref: "OperatingTime",
      required: true,
    },
    departureTime: {
      type: Schema.Types.ObjectId,
      ref: "OperatingTime",
      required: true,
    },
    arrivalTime: {
      type: Schema.Types.ObjectId,
      ref: "OperatingTime",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    bus: {
      type: Schema.Types.ObjectId,
      ref: "Bus",
      required: true,
    },
    seatsAvailable: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

TripSchema.methods.getDuration = function (): number {
  const departureTime: Date = (this.departureTime as IOperatingTime).time;
  const arrivalTime: Date = (this.arrivalTime as IOperatingTime).time;
  const durationInMilliseconds =
    arrivalTime.getTime() - departureTime.getTime();
  return durationInMilliseconds / (1000 * 60); // Convert milliseconds to minutes
};

TripSchema.methods.incrementSeatsAvailable = function (): void {
  this.seatsAvailable++;
};

TripSchema.methods.decrementSeatsAvailable = function (): void {
  this.seatsAvailable--;
};

const TripModel = model<ITrip>("Trip", TripSchema);

export default TripModel;
export { ITrip };
