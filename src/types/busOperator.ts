import { Document, Model, Types } from "mongoose";

export interface IbusOperator {
  fullName: string;
  mobileNumber: string;
  email: string;
  users: Types.ObjectId[];
  companyDocuments: string;
  numberOfBuses: number;
  Buses: Types.ObjectId[];
  Trips: Types.ObjectId[];
  Bookings: Types.ObjectId[];
}

export interface IbusOperatorSchema extends IbusOperator, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: string;
}

export interface IbusOperatorModel extends Model<IbusOperatorSchema> {}
