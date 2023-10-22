import { Document, Model, Types } from "mongoose";

export interface ILocation {
  country: "GH" | "RW";
  createdBy: Types.ObjectId;
  name: string;
}

export interface IQueryLocation {
  skip: number;
  limit: number;
  populate?: any;
  sort?: any;
  filter?: any;
  query?: string;
  fields?: string[];
  options?: any[];
}

export interface IAddLocationInput extends ILocation {}

export interface IcreateLocationRequestBody extends Omit<ILocation, "user"> {}

export interface ILocationSchema extends ILocation, Document {
  _id: Types.ObjectId;
  createdAt: string;
  updatedAt: string;
}

export interface ILocationModel extends Model<ILocationSchema> {}
