import mongoose, { connect } from "mongoose";
import UserModel from "./user.model";
import CodeModel from "./code.model";
import { Config } from "../config";
import { IUserModel } from "../types/user";

import { ICode, ICodeModel } from "../types/code";
import { IDriverModel } from "../types/driver";
import { IBusModel } from "../types/bus";
import { ITicketModel } from "../types/tickets";
import { IBookingsModel } from "../types/bookings";
import { IbusOperatorModel } from "../types/busOperator";
import { ITripModel } from "../types/trips";
import DriverModel from "./driver.model";
import BusModel from "./bus.model";
import TripModel from "./trip.model";
import TicketModel from "./ticket.model";
import BookingModel from "./booking.model";
import BusOperatorModel from "./busOperator.model";

export interface IDb {
  UserModel: IUserModel;
  CodeModel: ICodeModel;
  DriverModel: IDriverModel;
  BusModel: IBusModel;
  TripModel: ITripModel;
  TicketModel: ITicketModel;
  BookingModel: IBookingsModel;
  BusOperatorModel: IbusOperatorModel;
}

export default async function InitDB(config: Config["db"]): Promise<IDb> {
  try {
    await connect(config.uri);
    console.log("Database connected");

    await UserModel.createCollection();
    await CodeModel.createCollection();
    await DriverModel.createCollection();
    await BusModel.createCollection();
    await TripModel.createCollection();
    await TicketModel.createCollection();
    await BookingModel.createCollection();
    await BusOperatorModel.createCollection();

    return {
      UserModel,
      CodeModel,
      DriverModel,
      BusModel,
      BusOperatorModel,
      BookingModel,
      TicketModel,
      TripModel,
    };
  } catch (e) {
    throw e;
  }
}
