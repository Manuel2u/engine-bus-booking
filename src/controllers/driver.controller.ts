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
    }: IcreateDriverRequestBody = req.body;

    const licenseFile = Array.isArray(req.files)
      ? req.files[0]
      : req.files?.["license"][0];
    const profilePicFile = Array.isArray(req.files)
      ? req.files[1]
      : req.files?.["profilePic"][0];

    if (
      !fullName ||
      !email ||
      !mobileNumber ||
      !postalAddress ||
      !digitalAddress ||
      !licenseClass ||
      !status ||
      !licenseFile ||
      !profilePicFile
    ) {
      return res
        .status(400)
        .json({ message: "Make sure all input fileds are correct" });
    }

    if (licenseFile.mimetype != "application/pdf") {
      return res.status(400).json({ message: "File type not accepted" });
    }

    if (profilePicFile.mimetype != "image/jpeg" || "image/jpg" || "image/png") {
      return res.status(400).json({ message: "File type not accepted" });
    }

    const licenseUrl = await req.context.services?.firebaseStorage.uploadFile({
      file: licenseFile.buffer,
      fileName: licenseFile.originalname,
      folderName: "licenses",
      mimeType: licenseFile.mimetype,
    });

    const pictureUrl = await req.context.services?.firebaseStorage.uploadFile({
      file: profilePicFile.buffer,
      fileName: profilePicFile.originalname,
      folderName: "profile_pictures",
      mimeType: profilePicFile.mimetype,
    });

    const _bus = await req.context.services?.driver.createOne({
      fullName,
      createdBy: req.user._id,
      digitalAddress,
      email,
      licenseClass,
      mobileNumber,
      license: licenseUrl!,
      postalAddress,
      profilePicture: pictureUrl!,
      status,
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

    const response = await req.context.services?.driver.getAll({ limit, skip });

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

    const response = await req.context.services?.driver.getOne({ limit, skip });

    return res.status(200).json(response);
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
      return res
        .status(400)
        .json({ message: "make sure all fields are correct" });
    }

    const response = await req.context.services?.driver.retireOne({
      _id: driverID,
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
