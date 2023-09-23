import { NextFunction, Request, Response } from "express";
import { IAppContext } from "../types/app";
import { IcreateDriverRequestBody } from "../types/driver";

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
      fullName,
      email,
      mobileNumber,
      postalAddress,
      digitalAddress,
      licenseClass,
      status,
      license,
      profilePicture,
    }: IcreateDriverRequestBody = req.body;

    if (
      !fullName ||
      !email ||
      !mobileNumber ||
      !postalAddress ||
      !digitalAddress ||
      !licenseClass ||
      !status ||
      !license ||
      !profilePicture
    ) {
      return res
        .status(400)
        .json({
          status: "failed",
          message: "Make sure all input fileds are correct",
        });
    }

    // NB : we might add a bUs field to the driver

    const _bus = await req.context.services?.driver.createOne({
      fullName,
      createdBy: req.user._id,
      digitalAddress,
      email,
      licenseClass,
      mobileNumber,
      license,
      postalAddress,
      profilePicture,
      status,
      busCompany: req.user.busCompany,
    });

    return res.status(200).json({ status: "success", data: _bus });
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

    const response = await req.context.services?.driver.getAll({ limit, skip });

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

    const response = await req.context.services?.driver.getOne({
      limit,
      skip,
      filter: id,
    });

    return res.status(200).json({ status: "success", data: response });
  } catch (e) {
    next(e);
  }
};

export const RETIRE_ONE = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { driverID } = req.body;

    if (!driverID) {
      return res.status(400).json({
        status: "failed",
        message: "make sure all fields are correct",
      });
    }

    const response = await req.context.services?.driver.retireOne({
      _id: driverID,
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
  } catch (e) {
    next(e);
  }
};
