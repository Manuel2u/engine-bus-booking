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
  socials: [
    {
      name: string;
      link: string;
    }
  ];
  tagline: string;
  logo: string;
  address: {
    country: string;
    state: string;
    city: string;
    street: string;
  };
  users: Types.ObjectId[];
  Buses: Types.ObjectId[];
  Drivers: Types.ObjectId[];
  status: "APPROVED" | "REJECTED" | "PENDING";
  Trips: Types.ObjectId[];
  Bookings: Types.ObjectId[];
  note: string;
}

export interface ICreateBusCompanyInput
  extends Omit<
    IbusCompany,
    | "users"
    | "Buses"
    | "Drivers"
    | "status"
    | "Trips"
    | "Bookings"
    | "address"
    | "socials"
    | "tagline"
    | "logo"
  > {}

export interface IAcceptBusCompany {
  _id: Types.ObjectId;
}

export interface IUpdateBusCompanyInput {
  _id: Types.ObjectId;
  mobileNumber?: string;
  email?: string;
  socials?: [
    {
      name: string;
      link: string;
    }
  ];
  tagline?: string;
  logo?: string;
  address?: {
    country: string;
    state: string;
    city: string;
    street: string;
  };
  status?: "APPROVED" | "REJECTED" | "PENDING";
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
