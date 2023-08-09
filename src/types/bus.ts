import { Document, Model, Types } from "mongoose";

export interface IBus {
  vehicleNumber: string;
  model: string;
  yearOfMake: number;
  colour: string;
  numberOfSeats: string;
  status: "ACTIVE" | "INACTIVE";
  insurance: string;
  roadWorthy: string;
}

export interface IAddBusInput extends IBus {}

export interface IQueryBus {}
export interface IUpdateBus extends IBus {}

export interface IDeleteBus extends IBus {}

export interface IBusSchema extends IBus, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: string;
}

export interface IBusModel extends Model<IBusSchema> {}
