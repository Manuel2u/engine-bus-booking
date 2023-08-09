import { IAppContext } from "../types/app";
import UserService from "./user";
import CodeService from "./code";
import Code from "./code";
import FirebaseAuth from "./firebase/auth/auth";
import { DriverService } from "./driver";
import { TripService } from "./trip";
import { BookingService } from "./bookings";
import { TicketService } from "./ticket";
import { BusOperatorService } from "./busOperator";
import { LocationService } from "./location";
import { BusService } from "./bus";

export interface IServices {
  user: UserService;
  code: CodeService;
  driver: DriverService;
  trip: TripService;
  booking: BookingService;
  bus: BusService;
  ticket: TicketService;
  busOperator: BusOperatorService;
  location: LocationService;
  firebaseAuth: FirebaseAuth;
}

export default async function initServices(context: IAppContext) {
  try {
    return {
      user: new UserService(context),
      code: new Code(context),
      driver: new DriverService(context),
      trip: new TripService(context),
      booking: new BookingService(context),
      bus: new BusService(context),
      ticket: new TicketService(context),
      busOperator: new BusOperatorService(context),
      location: new LocationService(context),
      firebaseAuth: new FirebaseAuth(context),
    };
  } catch (e) {
    throw e;
  }
}
