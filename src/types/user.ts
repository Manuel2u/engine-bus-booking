import { Model, Document, Types } from "mongoose";

export interface IUser {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  isPhoneNumberVerified: boolean;
  verificationCode?: Types.ObjectId;
  comparePasswords(password: string): Promise<boolean>;
}

export interface IUserwithoutPassWord {
  _id : Types.ObjectId;
  fullName: string;
  phone: string;
  email: string;
  isPhoneNumberVerified: boolean;
  verificationCode?: Types.ObjectId;
  comparePasswords(password: string): Promise<boolean>;
}

export interface IUserAuth {
  user: IUserwithoutPassWord;
  token?: string;
}

export interface IUserInput {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}
export interface ISigninInput {
  email: string;
  password: string;
}

export interface IGetPhoneInput {
  phone: string;
  id: string;
}

export interface IVerifyPhoneInput {
  id: Types.ObjectId;
  code: number;
}

export interface IUserSchema extends IUser, Document {
  _id: Types.ObjectId;
  comparePasswords(password: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserModel extends Model<IUserSchema> {}

export interface IUserInfo {
  id: string;
  email: string;
  isAdmin: boolean;
  accountNumber: number;
}
