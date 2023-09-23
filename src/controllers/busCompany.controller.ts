import { Request, Response, NextFunction } from "express";
import { IAppContext } from "../types/app";
import { Multer } from "multer";
import { ImulterFile } from "../types/multer";

declare module "express-serve-static-core" {
  interface Request {
    context: IAppContext;
  }
}

/*********************** CREATE BUS COMPANY ***********************/
export const CREATE_BUS_COMPANY = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      mobileNumber,
      email,
      companyDocumentsUrl,
    }: {
      name: string;
      mobileNumber: string;
      email: string;
      companyDocumentsUrl: string;
    } = req.body;

    if (!name || !mobileNumber || !email || !companyDocumentsUrl) {
      return res.status(400).json({
        status: "failed",
        message: "Make sure all input fileds are correct",
      });
    }
    const busCompany = await req.context.services?.busCompany.createOne({
      name: name,
      email: email,
      mobileNumber: mobileNumber,
      companyDocuments: companyDocumentsUrl,
    });

    return res.status(200).json({ status: "success", data: { busCompany } });
  } catch (e) {
    next(e);
  }
};

export const ACCEPT_BUS_COMPANY = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { companyID } = req.body;

    if (!companyID) {
      return res
        .status(400)
        .json({ message: "Make sure all input fileds are correct" });
    }
    const response = await req.context.services?.busCompany.acceptOne({
      _id: companyID,
    });

    return res.status(200).json({ status: "success", message: response });
  } catch (e) {
    throw e;
  }
};

export const REJECT_BUS_COMPANY = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { companyID } = req.body;

    if (!companyID) {
      return res
        .status(400)
        .json({ message: "Make sure all input fileds are correct" });
    }
    const response = await req.context.services?.busCompany.rejectOne({
      _id: companyID,
    });

    return res.status(200).json({ status: "success", message: response });
  } catch (e) {
    throw e;
  }
};
