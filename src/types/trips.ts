import { Document, Model, Types } from "mongoose";

export interface ITrip {
  date: Date;
  origin: string;
  destination: string;
  numberOfBusAssigned: string;
  departureTime: string;
  arrivalTime: string;
  tripStatus: "CANCELLED" | "ACTIVE";
  tripType: string;
  busCompany: Types.ObjectId;
  createdBy: Types.ObjectId;
}

export interface ITripSchema extends ITrip, Document {
  _id: Types.ObjectId;
  getDuration(): string;
  createdAt: Date;
  updatedAt: string;
}

export interface IQueryTrip {
  skip: number;
  limit: number;
  populate?: any;
  sort?: any;
  filter?: any;
}

export interface IUpdateTripInput {
  _id: Types.ObjectId;
}
export interface IDeleteTripInput {
  _id: Types.ObjectId;
}

export interface IcreateTripInput extends ITrip {}
export interface IcreateTripRequestBody
  extends Omit<ITrip, "createdBy" | "busCompany"> {}

export interface ITripModel extends Model<ITripSchema> {}