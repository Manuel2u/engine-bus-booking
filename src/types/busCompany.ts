import { Document, Model, Types } from "mongoose";

export interface IbusCompany {
  name: string;
  mobileNumber: string;
  email: string;
  companyDocuments: string;
  contactPersonName: string;
  contactPersonPhone: string;
  contactPersonEmail: string;
  contactPersonPosition: string;
  users: Types.ObjectId[];
  Buses: Types.ObjectId[];
  Drivers: Types.ObjectId[];
  status: "ACCEPTED" | "REJECTED" | "PENDING";
  Trips: Types.ObjectId[];
  Bookings: Types.ObjectId[];
  note: string;
}

export interface ICreateBusCompanyInput
  extends Omit<
    IbusCompany,
    "users" | "Buses" | "Drivers" | "status" | "Trips" | "Bookings"
  > {}

export interface IAcceptBusCompany {
  _id: Types.ObjectId;
}

export interface IGetBusCompany {
  _id: Types.ObjectId;
  skip: number;
  limit: number;
}
export interface IbusCompanySchema extends IbusCompany, Document {
  _id: Types.ObjectId;
  comparePasswords(password: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: string;
}

export interface IbusCompanyModel extends Model<IbusCompanySchema> {}
