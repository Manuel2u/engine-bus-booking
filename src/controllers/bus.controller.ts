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
      roadWorthy,
    }: IcreateBusRequestBody = req.body;

    const insuranceFile = Array.isArray(req.files)
      ? req.files[0]
      : req.files?.["insurance"][0];
    const roadWorthyFile = Array.isArray(req.files)
      ? req.files[1]
      : req.files?.["roadWorthy"][0];

    if (
      !vehicleNumber ||
      !model ||
      !numberOfSeats ||
      !yearOfMake ||
      !colour ||
      !status ||
      !insuranceFile ||
      !roadWorthyFile
    ) {
      return res
        .status(400)
        .json({ message: "Make sure all input fileds are correct" });
    }

    if (
      insuranceFile.mimetype &&
      roadWorthyFile.mimetype != "application/pdf"
    ) {
      return res.status(400).json({ message: "File type not accepted" });
    }

    const insuranceUrl = await req.context.services?.firebaseStorage.uploadFile(
      {
        file: insuranceFile.buffer,
        fileName: insuranceFile.originalname,
        folderName: "insurance",
        mimeType: insuranceFile.mimetype,
      }
    );

    const roadWorthyUrl =
      await req.context.services?.firebaseStorage.uploadFile({
        file: roadWorthyFile.buffer,
        fileName: roadWorthyFile.originalname,
        folderName: "roadWorthy",
        mimeType: roadWorthyFile.mimetype,
      });

    const _bus = await req.context.services?.bus.createOne({
      vehicleNumber,
      createdBy: req.user._id,
      model,
      yearOfMake,
      colour,
      numberOfSeats,
      status,
      insurance: insuranceUrl!,
      roadWorthy: roadWorthyUrl!,
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
    const id = req.query.id;

    const response = await req.context.services?.bus.getOne({
      limit,
      skip,
      filter: id,
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
