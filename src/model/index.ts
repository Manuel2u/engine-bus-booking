import mongoose, { connect } from "mongoose";
import UserModel from "./user.model";
import CodeModel from "./code.model";
import { Config } from "../config";
import { IAdminModel, ISudoAdminModel, IUserModel } from "../types/user";

import { ICode, ICodeModel } from "../types/code";
import { IDriverModel } from "../types/driver";
import { IBusModel } from "../types/bus";
import { ITicketModel } from "../types/tickets";
import { IBookingsModel } from "../types/bookings";
import { IbusCompanyModel } from "../types/busCompany";
import { ITripModel } from "../types/trips";
import DriverModel from "./driver.model";
import BusModel from "./bus.model";
import TripModel from "./trip.model";
import TicketModel from "./ticket.model";
import BookingModel from "./booking.model";
import BusCompanyModel from "./busCompany.model";
import AdminModel from "./admin.model";
import SudoAdminModel from "./sudoadmin.model";

export interface IDb {
  AdminModel: IAdminModel;
  SudoAdminModel: ISudoAdminModel;
  UserModel: IUserModel;
  CodeModel: ICodeModel;
  DriverModel: IDriverModel;
  BusModel: IBusModel;
  TripModel: ITripModel;
  TicketModel: ITicketModel;
  BookingModel: IBookingsModel;
  BusCompanyModel: IbusCompanyModel;
}

export default async function InitDB(config: Config["db"]): Promise<IDb> {
  try {
    await connect(config.uri);
    console.log("Database connected");

    await AdminModel.createCollection();
    await SudoAdminModel.createCollection();
    await UserModel.createCollection();
    await CodeModel.createCollection();
    await DriverModel.createCollection();
    await BusModel.createCollection();
    await TripModel.createCollection();
    await TicketModel.createCollection();
    await BookingModel.createCollection();
    await BusCompanyModel.createCollection();

    return {
      AdminModel,
      SudoAdminModel,
      UserModel,
      CodeModel,
      DriverModel,
      BusModel,
      BusCompanyModel,
      BookingModel,
      TicketModel,
      TripModel,
    };
  } catch (e) {
    throw e;
  }
}
