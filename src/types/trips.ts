import { Document, Model, PopulatedDoc, Types } from "mongoose";
import { IBus } from "./bus";

export interface ITrip {
  date: Date;
  origin: Types.ObjectId;
  destination: Types.ObjectId;
  numberOfBusAssigned: string;
  timeScheduled: {
    startTime: string;
    endTime: string;
  };
  tripStatus: "CANCELLED" | "ACTIVE" | "NOT_ACTIVE | DELETED";
  tripType: string;
  busCompany: Types.ObjectId;
  bus: PopulatedDoc<IBus>;
  price: String;
  slots: [string];
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
export interface ITripSearchResult {
  trips: [ITripSchema];
  tripsCount: number;
}

export interface IUpdateTripInput {
  tripId?: Types.ObjectId;
  date?: Date;
  origin?: Types.ObjectId;
  destination?: Types.ObjectId;
  TimeScheduled?: { startTime: string; endTime: string };
  tripType?: string;
  price?: string;
  numberOfBusAssigned?: string;
  bus?: Types.ObjectId;
}
export interface IDeleteTripInput {
  _id: Types.ObjectId;
}

export interface IcreateTripInput extends Omit<ITrip, "slots"> {}
export interface IcreateTripRequestBody
  extends Omit<ITrip, "createdBy" | "busCompany" | "slots"> {}

export interface ITripModel extends Model<ITripSchema> {}
