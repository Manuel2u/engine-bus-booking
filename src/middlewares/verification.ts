import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import {
  IAdminSchema,
  ISudoAdminSchema,
  IUser,
  IUserSchema,
} from "../types/user";
dotenv.config();

import createError from "../utils/error";
import { initialize } from "passport";

declare module "express-serve-static-core" {
  interface Request {
    user: IAdminSchema | IUserSchema | ISudoAdminSchema | any;
  }
}

export const verifyAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string | undefined;
  try {
    token = req.headers.authorization?.split(" ")[1];
    console.log(token);

    if (!token) {
      throw new Error("No token");
    }

    jwt.verify(
      token,
      process.env.JWT_SECRET!,
      function (err: any, decoded: any) {
        if (err) {
          next(createError("Token expired", 401));
        }
        const { user } = decoded;
        req.user = user;
      }
    );

    next();
  } catch (err) {
    next(createError("Invalid access token", 401));
  }
};

export const isAdminOrSuperAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as IAdminSchema;
  console.log(req.user);

  if (user.role === "ADMIN" || user.role === "BUS_COMPANY") {
    next();
  } else {
    return res.status(401).json({ message: "User is unauthorized" });
  }
};

export const isSuperAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as IAdminSchema;
  console.log(req.user);

  if (user.role === "BUS_COMPANY") {
    next();
  } else {
    return res.status(401).json({ message: "User is unauthorized" });
  }
};

export const isSudoAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as ISudoAdminSchema;
  console.log(req.user);

  if (user.role === "SUDOADMIN") {
    next();
  } else {
    return res.status(401).json({ message: "User is unauthorized" });
  }
};

export const isPhoneNumberVerified = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as IUser;

  if (user.isPhoneNumberVerified === true) {
    next();
  } else {
    return res.status(401).json({ message: "Phone number not verified" });
  }
};
