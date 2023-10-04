import { Document, Model, Types } from "mongoose";

export interface IBus {
  vehicleNumber: string;
  model: string;
  yearOfMake: number;
  colour: string;
  numberOfSeats: string;
  status: "ACTIVE" | "INACTIVE" | "DECOMMISSIONED";
  insurance: string;
  createdBy: Types.ObjectId;
  updatedBy: Types.ObjectId;
  busCompany: Types.ObjectId;
  roadWorthy: string;
}

export interface IAddBusInput extends Omit<IBus, "updatedBy"> {}

export interface IQueryBus {
  skip: number;
  limit: number;
  populate?: any;
  sort?: any;
  filter?: any;
  query?: string;
  fields?: string[];
  options?: any[];
  busCompany: Types.ObjectId;
}
export interface IUpdateBus extends Omit<IBus, "busCompany" | "createdBy"> {
  _id: Types.ObjectId;
}

export interface IDecomissionBus {
  _id: Types.ObjectId;
}

export interface IcreateBusRequestBody extends Omit<IBus, ""> {
  roadWorthyFileUrl: string;
  insuranceFileUrl: string;
}

export interface IupdateBusRequestBody
  extends Omit<IBus, "busCompany" | "createdBy" | "status"> {
  busID: Types.ObjectId;
  roadWorthyFileUrl: string;
  insuranceFileUrl: string;
}

export interface IBusSchema extends IBus, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: string;
}

export interface IBusModel extends Model<IBusSchema> {}
