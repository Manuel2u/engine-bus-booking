import { Model, Document, Types, PopulatedDoc } from "mongoose";
import { IBookings } from "./bookings";
import { ITicket } from "./tickets";

/*********************** User **********************/
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
  comparePasswords(password: string): Promise<boolean>;
}

export interface IUserSchema extends IUser, Document {
  _id: Types.ObjectId;
  comparePasswords(password: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserModel extends Model<IUserSchema> {}

export interface IGetPhoneInput {
  phone: string;
  id: string;
}

export interface IVerifyPhoneInput {
  id: Types.ObjectId;
  code: number;
}

export interface IUserwithoutPassWord extends Omit<IUserSchema, "password"> {}

export interface IUserAuth {
  user:
    | IUserwithoutPassWord
    | IAdminwithoutPassWord
    | ISudoAdminwithoutPassWord;
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

/*********************** Admin **********************/

export interface IAdmin {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  profilePicture: string;
  busCompany: Types.ObjectId;
  role: "ADMIN" | "BUS_COMPANY";
  comparePasswords(password: string): Promise<boolean>;
}

export interface IAdminwithoutPassWord extends Omit<IAdminSchema, "password"> {}

export interface ICreateAdminInput {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  busCompany: Types.ObjectId;
}

export interface IAdminSchema extends IAdmin, Document {
  _id: Types.ObjectId;
  comparePasswords(password: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAdminModel extends Model<IAdminSchema> {}

/*********************** SUDOADMIN **********************/

export interface ISudoAdmin {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  profilePicture: string;
  role: "SUDOADMIN";
  comparePasswords(password: string): Promise<boolean>;
}

export interface ICreateSudoAdminInput {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}

export interface ISudoAdminwithoutPassWord
  extends Omit<ISudoAdminSchema, "password"> {}

export interface ISudoAdminSchema extends ISudoAdmin, Document {
  _id: Types.ObjectId;
  comparePasswords(password: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISudoAdminModel extends Model<ISudoAdminSchema> {}

export interface IJWT {
  user: IUserSchema;
  admin: IAdminSchema;
  sudoadmin: ISudoAdminSchema;
}
