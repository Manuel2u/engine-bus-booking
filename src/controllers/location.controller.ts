import { NextFunction, Request, Response } from "express";
import { IAppContext } from "../types/app";

declare module "express-serve-static-core" {
  interface Request {
    context: IAppContext;
  }
}

export const ADD_LOCATION = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, country, createdBy } = req.body;

    if (!name || !country || !createdBy) {
      return res.status(400).json({
        status: "failed",
        message: "Make sure all input fileds are correct",
      });
    }
    const response = await req.context.services?.location.createOne({
      name,
      country,
      createdBy,
    });

    return res.status(200).json({ status: "success", message: response });
  } catch (e) {
    console.log(e);
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

    const response = await req.context.services.location.getAll({
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
