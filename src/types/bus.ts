import { Document, Model, Types } from "mongoose";

export interface IBus {
  vehicleNumber: string;
  model: string;
  yearOfMake: number;
  colour: string;
  numberOfSeats: string;
  status: "ACTIVE" | "INACTIVE";
  insurance: string;
  createdBy: Types.ObjectId;
  busCompany: Types.ObjectId;
  roadWorthy: string;
}

export interface IAddBusInput extends IBus {}

export interface IQueryBus {
  skip: number;
  limit: number;
  populate?: any;
  sort?: any;
  filter?: any;
}
export interface IUpdateBus extends IBus {
  _id: Types.ObjectId;
}

export interface IDecomissionBus {
  _id: Types.ObjectId;
}

export interface IcreateBusRequestBody extends Omit<IBus, "user"> {
  roadWorthyFileUrl: string;
  insuranceFileUrl: string;
}

export interface IBusSchema extends IBus, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: string;
}

export interface IBusModel extends Model<IBusSchema> {}
