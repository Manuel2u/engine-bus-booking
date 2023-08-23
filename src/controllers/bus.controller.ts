import { Request, Response, NextFunction } from "express";
import { IAppContext } from "../types/app";
import { IcreateBusRequestBody } from "../types/bus";

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
      vehicleNumber,
      model,
      yearOfMake,
      colour,
      numberOfSeats,
      status,
      insurance,
      roadWorthy,
    }: IcreateBusRequestBody = req.body;

    if (
      !vehicleNumber ||
      !model ||
      !numberOfSeats ||
      !yearOfMake ||
      !colour ||
      !status ||
      !insurance ||
      !roadWorthy
    ) {
      return res
        .status(400)
        .json({ message: "Make sure all input fileds are correct" });
    }

    const _bus = await req.context.services?.bus.createOne({
      vehicleNumber,
      user: req.user._id,
      model,
      yearOfMake,
      colour,
      numberOfSeats,
      status,
      insurance,
      roadWorthy,
      busCompany: req.user.busCompany,
    });

    return res.status(200).json(_bus);
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

    const response = await req.context.services?.bus.getAll({ limit, skip });

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

    const response = await req.context.services?.bus.getOne({ limit, skip });

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

export const DECOMMISSION_ONE = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { busID } = req.body;

    if (!busID) {
      return res
        .status(400)
        .json({ message: "make sure all fields are correct" });
    }

    const response = await req.context.services?.bus.decomissionOne({
      _id: busID,
    });

    return res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};
