import { Model, Document, Types } from "mongoose";

export interface IUser {
  fullName: string;
  phone: string;
  email: string;
  profilePic: string;
  password: string;
  isPhoneNumberVerified: boolean;
  isEmailVerified: boolean;
  role: "USER";
  googleID?: string;
  appleID?: string;
  faceBookID?: string;
  busCompany?: string;
  Bookings: Types.ObjectId[];
  Tickets: Types.ObjectId[];
  comparePasswords(password: string): Promise<boolean>;
}

export interface IAdmin {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  busCompany: Types.ObjectId;
  role: "ADMIN" | "BUS_COMPANY";
  comparePasswords(password: string): Promise<boolean>;
}

export interface ISudoAdmin {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  role: "SUDOADMIN";
  comparePasswords(password: string): Promise<boolean>;
}

export interface IUserwithoutPassWord {
  _id: Types.ObjectId;
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

export interface IAdminSchema extends IAdmin, Document {
  _id: Types.ObjectId;
  comparePasswords(password: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISudoAdminSchema extends ISudoAdmin, Document {
  _id: Types.ObjectId;
  comparePasswords(password: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISudoAdminModel extends Model<ISudoAdminSchema> {}
export interface IAdminModel extends Model<IAdminSchema> {}
export interface IUserModel extends Model<IUserSchema> {}

export interface IUserInfo {
  id: string;
  email: string;
  isAdmin: boolean;
  accountNumber: number;
}
