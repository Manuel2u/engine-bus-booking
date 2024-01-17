import { Request, Response, NextFunction } from "express";
import { IAppContext } from "../types/app";
import { Multer } from "multer";
import { ImulterFile } from "../types/multer";
import { IUpdateBusCompanyInput } from "../types/busCompany";

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
      contactPersonName,
      contactPersonEmail,
      contactPersonPhone,
      contactPersonPosition,
      note,
    }: {
      name: string;
      mobileNumber: string;
      email: string;
      companyDocumentsUrl: string;
      contactPersonName: string;
      contactPersonPhone: string;
      contactPersonEmail: string;
      contactPersonPosition: string;
      note: string;
    } = req.body;

    if (
      !name ||
      !mobileNumber ||
      !email ||
      !companyDocumentsUrl ||
      !contactPersonEmail ||
      !contactPersonName ||
      !contactPersonPhone ||
      !contactPersonPosition ||
      !note
    ) {
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
      contactPersonEmail,
      contactPersonName,
      contactPersonPhone,
      contactPersonPosition,
      note,
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

    const response = await req.context.services.busCompany.getAll({
      limit,
      skip,
      populate,
      query,
      fields,
      options,
    });

    return res.status(200).json({ status: "success", data: response });
  } catch (e) {
    next(e);
  }
};

export const GET_DASHBOARD_STAT = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const stat = await req.context.services.busCompany.getDashBoardStats({
      id: req.user._id,
    });
    return res.status(200).json({ status: "success", data: stat });
  } catch (e) {
    next(e);
  }
};

export const UPDATE_BUS_COMPANY = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id, email, socials, tagline, logo }: IUpdateBusCompanyInput =
      req.body;

    const busCompany = await req.context.services?.busCompany.updateOne({
      _id: _id,
      email: email,
      socials: socials,
      tagline: tagline,
      logo: logo,
    });

    return res.status(200).json({ status: "success", data: { busCompany } });
  } catch (e) {
    next(e);
  }
};
