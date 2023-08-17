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
    user: IUserSchema;
    admin: IAdminSchema;
    sudoadmin: ISudoAdminSchema;
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
        req.user = decoded;
      }
    );

    next();
  } catch (err) {
    next(createError("Invalid access token", 401));
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const admin = req.admin as IAdminSchema;

  if (admin.role === "ADMIN") {
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
  const admin = req.admin as IAdminSchema;
  const user = req.user as IUserSchema;

  if (admin.role === "BUS_COMPANY") {
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
  const sudoadmin = req.sudoadmin as ISudoAdminSchema;
  const user = req.user as IUserSchema;

  if (sudoadmin.role === "SUDOADMIN") {
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
