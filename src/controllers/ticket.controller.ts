import { IAppContext } from "../types/app";

declare module "express-serve-static-core" {
  interface Request {
    context: IAppContext;
  }
}

import { NextFunction, Request, Response } from "express";
import {
  IGetTicketRequestBody,
  IcreateTicketRequestBody,
} from "../types/tickets";
import { Types } from "mongoose";

export const GET_ONE = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookingId = req.query.bookingId as unknown as Types.ObjectId;
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

    if (!bookingId) {
      return res
        .status(400)
        .json({ message: "Make sure all input fileds are correct" });
    }

    const _ticket = await req.context.services?.ticket.getOne({
      bookingId,
      limit,
      skip,
      populate,
      query,
      fields,
      options,
    });

    return res.status(200).json(_ticket);
  } catch (e) {
    next(e);
  }
};
