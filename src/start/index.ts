import express, { NextFunction, Request, Response } from "express";
import customError from "../middlewares/customError";
import passport from "passport";
const app = express();

/************ Import Routes *************/
import authRouter from "../routes/user";
import bookingRouter from "../routes/booking";
import busRouter from "../routes/bus";
import busCompanyRouter from "../routes/busCompany";
import driverRouter from "../routes/driver";
import locationRouter from "../routes/location";
import ticketRouter from "../routes/ticket";
import tripRouter from "../routes/trip";
import assetRouter from "../routes/file";
import cors from "cors";
/*************************************/

import { Config } from "../config";
import { IAppContext } from "../types/app";
import InitDB from "../model";
import initServices from "../services";
import cookieParser from "cookie-parser";
// Use the operating time router with a base path
export const start = async (config: Config) => {
  try {
    app.use(express.json());
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));
    // app.use(passport.initialize());
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
    app.use("/api/v1/booking", bookingRouter);
    app.use("/api/v1/bus", busRouter);
    app.use("/api/v1/busCompany", busCompanyRouter);
    app.use("/api/v1/driver", driverRouter);
    app.use("/api/v1/location", locationRouter);
    app.use("/api/v1/ticket", ticketRouter);
    app.use("/api/v1/trip", tripRouter);
    app.use("/api/v1/assets", assetRouter);

    //use custom error middleware
    app.use(customError);

    app.listen(config.app.port, () => {
      console.log(`🚀 server is running on ${config.app.port}`);
    });
  } catch (e) {
    throw e;
  }
};
