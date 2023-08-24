import { Request, NextFunction, Response } from "express";
import { IAppContext } from "../types/app";
import { IcreateTripRequestBody } from "../types/trips";

declare module "express-serve-static-core" {
  interface Request {
    context: IAppContext;
  }
}

export const CREATE_ONE = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      date,
      arrivalTime,
      departureTime,
      destination,
      numberOfBusAssigned,
      origin,
      tripStatus,
      tripType,
    }: IcreateTripRequestBody = req.body;

    if (
      !date ||
      !arrivalTime ||
      !departureTime ||
      !destination ||
      !numberOfBusAssigned ||
      !origin ||
      !tripStatus ||
      !tripType
    ) {
      return res
        .status(400)
        .json({ message: "Make sure all input fileds are correct" });
    }

    const _trip = await req.context.services?.trip.createOne({
      date,
      arrivalTime,
      departureTime,
      numberOfBusAssigned,
      origin,
      destination,
      tripStatus,
      tripType,
      createdBy: req.user.user._id,
      busCompany: req.user.busCompany,
    });

    return res.status(200).json(_trip);
  } catch (e) {
    next(e);
  }
};

export const GET_ALL = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const skip = parseInt(req.query.skip as string);
    const limit = parseInt(req.query.limit as string);

    const response = await req.context.services?.trip.getAll({ limit, skip });

    return res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

export const GET_ONE = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const skip = parseInt(req.query.skip as string);
    const limit = parseInt(req.query.limit as string);

    const response = await req.context.services?.trip.getOne({ limit, skip });

    return res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

export const CANCEL_ONE = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { tripID } = req.body;

    if (!tripID) {
      return res
        .status(400)
        .json({ message: "make sure all fields are correct" });
    }

    const response = await req.context.services?.trip.cancelOne({
      _id: tripID,
    });

    return res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

export const RESTORE_ONE = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { tripID } = req.body;

    if (!tripID) {
      return res
        .status(400)
        .json({ message: "make sure all fields are correct" });
    }

    const response = await req.context.services?.trip.restoreOne({
      _id: tripID,
    });

    return res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

export const UPDATE_ONE = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (e) {
    next(e);
  }
};

export const DELETE_ONE = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (e) {
    next(e);
  }
};
