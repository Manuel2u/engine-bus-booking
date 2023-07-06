import { Types, Model, Document } from "mongoose";

export interface ICode {
  user: Types.ObjectId;
  code: number;
}

export interface ICodeSchema extends ICode, Document {
  _id: Types.ObjectId;
  expiresAt : Date
  createdAt: Date;
  updatedAt: Date;
}

export interface ICodeModel extends Model<ICodeSchema> {}
