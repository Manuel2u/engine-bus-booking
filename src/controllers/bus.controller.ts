import { Request, Response, NextFunction } from "express";
import { IAppContext } from "../types/app";
import { IcreateBusRequestBody, IupdateBusRequestBody } from "../types/bus";

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
      roadWorthyFileUrl,
      insuranceFileUrl,
    }: IcreateBusRequestBody = req.body;

    if (
      !vehicleNumber ||
      !model ||
      !numberOfSeats ||
      !yearOfMake ||
      !colour ||
      !insuranceFileUrl ||
      !roadWorthyFileUrl
    ) {
      return res.status(400).json({
        status: "failed",
        message: "Make sure all input fileds are correct",
      });
    }

    const _bus = await req.context.services?.bus.createOne({
      vehicleNumber,
      createdBy: req.user._id,
      model,
      yearOfMake,
      colour,
      numberOfSeats,
      status: "ACTIVE",
      insurance: insuranceFileUrl,
      roadWorthy: roadWorthyFileUrl,
      busCompany: req.user.busCompany,
    });

    return res.status(200).json({ status: "success", data: { _bus } });
  } catch (e) {
    next(e);
  }
};

export const GET_ALL_VEHICLE_NUMBERS = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const skip = parseInt(req.query.skip as string);
    const limit = parseInt(req.query.limit as string);
    const populate = req.query.populate;
    const query: string = req.query.query ? (req.query.query as string) : "";

    let fields: string[] = req.query.fields
      ? (req.query.fields as string).split(",").map((field) => field.trim())
      : [];

    let options: any[] = req.query.options
      ? Array.isArray(req.query.options)
        ? req.query.options
        : ([req.query.options] as any[])
      : [];

    const response = await req.context.services.bus.getAllBusNumbers();

    return res.status(200).json({ status: "success", data: response });
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

    const response = await req.context.services.bus.getAll({
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

    const response = await req.context.services?.bus.getOne({
      limit,
      skip,
      filter: id,
      busCompany: req.user.busCompany,
    });

    return res.status(200).json({ status: "success", data: response });
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
    const {
      busID,
      vehicleNumber,
      model,
      yearOfMake,
      colour,
      numberOfSeats,
      roadWorthyFileUrl,
      insuranceFileUrl,
    }: IupdateBusRequestBody = req.body;

    const _bus = await req.context.services?.bus.updateOne({
      _id: busID,
      vehicleNumber,
      model,
      yearOfMake,
      colour,
      numberOfSeats,
      insurance: insuranceFileUrl,
      roadWorthy: roadWorthyFileUrl,
      status: "ACTIVE",
      updatedBy: req.user._id,
    });

    return res.status(200).json({ status: "success", data: { _bus } });
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

    return res.status(200).json({ status: "success", data: response });
  } catch (e) {
    next(e);
  }
};
