import express, { NextFunction, Request, Response } from "express";
import customError from "../middlewares/customError";
const app = express();
import authRouter from "../routes/user";
import locationRouter from "../routes/location.router";
import stationRouter from "../routes/station.router";
import { Config } from "../config";
import { IAppContext } from "../types/app";
import InitDB from "../model";
import initServices from "../services";
import cookieParser from "cookie-parser";
import operatingTimeRouter from "../routes/operatingTime.router";
import busRouter from "../routes/bus.router"; // Import the bus router
import tripRouter from "../routes/trip.router"; // Import the bus router
// Use the operating time router with a base path
export const start = async (config: Config) => {
  try {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    const appContext: IAppContext = {};

    appContext.db = await InitDB(config.db);

    appContext.services = await initServices(appContext);

    app.use((req: Request, res: Response, next: NextFunction) => {
      req.context = appContext; // Set the appContext on the request object
      next();
    });
    //use routes
    app.use("/api/v1/auth", authRouter);
    app.use("/api/locations", locationRouter);
    app.use("/api/stations", stationRouter);
    app.use("/api/operating-time", operatingTimeRouter);
    app.use("/api/buses", busRouter); // Use the bus router
    app.use("/api/trips", tripRouter); //Use the bus router

    //use custom error middleware
    app.use(customError);

    app.listen(config.app.port, () => {
      console.log(`🚀 server is running on ${config.app.port}`);
    });
  } catch (e) {
    throw e;
  }
};
