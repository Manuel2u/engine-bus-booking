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
      TimeScheduled,
      destination,
      numberOfBusAssigned,
      origin,
      tripType,
      bus,
      price,
    }: IcreateTripRequestBody = req.body;

    if (
      !date ||
      !TimeScheduled ||
      !destination ||
      !numberOfBusAssigned ||
      !origin ||
      !tripType ||
      !price ||
      !bus
    ) {
      return res.status(400).json({
        status: "failed",
        message: "Make sure all input fileds are correct",
      });
    }

    const _trip = await req.context.services?.trip.createOne({
      date,
      TimeScheduled,
      numberOfBusAssigned,
      origin,
      destination,
      tripStatus: "ACTIVE",
      tripType,
      price,
      bus,
      createdBy: req.user._id,
      busCompany: req.user.busCompany,
    });

    return res.status(200).json({ status: "success", data: _trip });
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

    let populate: string[] = req.query.populate
      ? (req.query.populate as string).split(",").map((item) => item.trim())
      : [];

    const query: string = req.query.query ? (req.query.query as string) : "";

    let fields: string[] = req.query.fields
      ? (req.query.fields as string).split(",").map((field) => field.trim())
      : [];

    let options: any[] = req.query.options
      ? Array.isArray(req.query.options)
        ? req.query.options
        : ([req.query.options] as any[])
      : [];

    console.log(populate);

    const response = await req.context.services?.trip.getAll({
      limit,
      skip,
      populate,
      query,
      fields,
      options,
      busCompany: req.user.busCompany,
    });

    return res.status(200).json({ status: "success", data: response });
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
    const id = req.query.id;

    const response = await req.context.services?.trip.getOne({
      limit,
      skip,
      filter: id,
    });

    return res.status(200).json({ status: "success", data: response });
  } catch (e) {
    next(e);
  }
};

export const SEARCH_TRIP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const skip = parseInt(req.query.skip as string);
    const limit = parseInt(req.query.limit as string);

    let populate: string[] = req.query.populate
      ? (req.query.populate as string).split(",").map((item) => item.trim())
      : [];

    const origin = req.query.origin;
    const destination = req.query.destination;
    const date = req.query.date;

    const response = await req.context.services?.trip.SearchTrips({
      origin,
      destination,
      date,
      skip,
      limit,
      populate,
    });

    return res.status(200).json({ status: "success", data: response });
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

    return res.status(200).json({ status: "success", message: response });
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

    return res.status(200).json({ status: "success", message: response });
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
