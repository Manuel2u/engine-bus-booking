import { Document, Model, Types } from "mongoose";

export interface ITrip {
  date: Date;
  origin: string;
  destination: string;
  numberOfBusAssigned: string;
  departureTime: string;
  arrivalTime: string;
  tripStatus: string;
  tripType: string;
}

export interface ITripSchema extends ITrip, Document {
  _id: Types.ObjectId;
  getDuration(): string;
  createdAt: Date;
  updatedAt: string;
}

export interface ITripModel extends Model<ITripSchema> {}
