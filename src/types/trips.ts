import { Document, Model, PopulatedDoc, Types } from "mongoose";
import { IBus } from "./bus";

export interface ITrip {
  date: Date;
  origin: Types.ObjectId;
  destination: Types.ObjectId;
  numberOfBusAssigned: string;
  TimeScheduled: {
    startTime: string;
    endTime: string;
  };
  tripStatus: "CANCELLED" | "ACTIVE";
  tripType: string;
  busCompany: Types.ObjectId;
  bus: PopulatedDoc<IBus>;
  price: String;
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
  options?: any;
  query?: any;
  fields?: any;
  busCompany?: Types.ObjectId;
}

export interface ISearchTrips {
  origin: any;
  destination: any;
  date: any;
  populate: any;
  skip: number;
  limit: number;
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
