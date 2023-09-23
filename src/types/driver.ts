import { Document, Model, Types } from "mongoose";

export interface IDriver {
  fullName: string;
  email: string;
  mobileNumber: string;
  postalAddress: string;
  digitalAddress: string;
  license: string;
  licenseClass: string;
  busCompany: Types.ObjectId;
  createdBy: Types.ObjectId;
  status: "ACTIVE" | "INACTIVE" | "RETIRED";
  profilePicture: string;
}

export interface ICreateDriverInput extends IDriver {}

export interface IUpdateDriverInput {
  _id: Types.ObjectId;
}

export interface IcreateDriverRequestBody
  extends Omit<IDriver, "busCompany" | "createdBy"> {}
export interface IQueryDriver {
  skip: number;
  limit: number;
  populate?: any;
  sort?: any;
  filter?: any;
}
export interface IDriverSchema extends IDriver, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDriverModel extends Model<IDriverSchema> {}
