import { Document, Model, Types } from "mongoose";

export interface IDriver {
  fullName: string;
  email: string;
  mobileNumber: string;
  postalAddress: string;
  digitalAddress: string;
  license: string;
  licenseClass: string;
  profilePicture: string;
}

export interface IDriverSchema extends IDriver, Document {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDriverModel extends Model<IDriverSchema> {}
