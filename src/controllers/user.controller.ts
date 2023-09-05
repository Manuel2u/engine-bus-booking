import { NextFunction, Request, Response } from "express";
import { IAppContext } from "../types/app";
import jwt from "jsonwebtoken";
import { config } from "../config";
import sendSMS from "../utils/sms";
import { user } from "firebase-functions/v1/auth";
import {
  ICreateAdminInput,
  ICreateSudoAdminInput,
  IUserAuth,
} from "../types/user";
import { _generateToken } from "../utils/token";

declare module "express-serve-static-core" {
  interface Request {
    context: IAppContext;
  }
}

///*************************SIGNUP*************************** */
export const SIGNUP = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      email,
      fullName,
      password,
      phone,
    }: {
      email: string;
      fullName: string;
      password: string;
      phone: string;
    } = req.body;

    if (!email || !fullName || !password || !phone) {
      return res
        .status(400)
        .json({ message: "Make sure all input fileds are correct" });
    }

    const _user = await req.context.services?.user.CreateOne({
      email,
      fullName,
      password,
      phone,
    });

    const message: string =
      (await req.context.services?.code.sendCode(_user?.user._id)) || "";

    sendSMS(phone, message);

    return res.status(200).json(_user);
  } catch (e) {
    next(e);
  }
};

///*************************CREATE ADMIN*************************** */
export const CREATEADMIN = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, fullName, password, phone }: ICreateAdminInput = req.body;

    if (!email || !fullName || !password || !phone) {
      return res
        .status(400)
        .json({ message: "Make sure all input fileds are correct" });
    }

    const _user = await req.context.services?.user.CreateAdmin({
      email,
      fullName,
      password,
      phone,
      busCompany: req.user.busCompany,
    });

    // const message: string =
    //   (await req.context.services?.code.sendCode(_user?.user._id)) || "";

    // sendSMS(phone, message);

    return res.status(200).json(_user);
  } catch (e) {
    next(e);
  }
};
///*************************CREATE SUPERADMIN*************************** */
export const CREATESUDOADMIN = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, fullName, password, phone }: ICreateSudoAdminInput =
      req.body;

    if (!email || !fullName || !password || !phone) {
      return res
        .status(400)
        .json({ message: "Make sure all input fileds are correct" });
    }

    const _user = await req.context.services?.user.CreateSudoAdmin({
      email,
      fullName,
      password,
      phone,
    });

    return res.status(200).json(_user);
  } catch (e) {
    next(e);
  }
};

/*********************** RESEND VERIFICATION CODE *************************/

export const RESEND = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const message: string =
      (await req.context.services?.code.sendCode(req.user._id)) || "";

    sendSMS(req.user.phone, message);

    return res.status(200).json("code resent succesfully");
  } catch (e) {
    next(e);
  }
};

/*********************** VERIFY PHONE NUMBER *************************/

export const VERIFYPHONE = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { code }: { code: number } = req.body;

    if (!code) {
      return res
        .status(400)
        .json({ message: "Please input verification code" });
    }

    const response = await req.context.services?.user.verifyCode({
      code: code,
      id: req.user.id,
    });

    return res.status(200).json({ message: response });
  } catch (e) {
    next(e);
  }
};

/*********************** VERIFY EMAIL *************************/

/***************************** SIGN IN ******************************/

export const SIGNIN_USER = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Make sure all input fileds are correct" });
    }

    const user = await req.context.services?.user.signInUser({
      email,
      password,
    });

    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

export const SIGNIN_ADMIN = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Make sure all input fileds are correct" });
    }

    const user = await req.context.services?.user.signInAdmin({
      email,
      password,
    });

    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

export const SIGNIN_SUDOADMIN = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Make sure all input fileds are correct" });
    }

    const user = await req.context.services?.user.signInSudoAdmin({
      email,
      password,
    });

    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};

/***************************** SIGN IN / Up WITH GOOGLE ******************************/

export const GOOGLE = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const token = _generateToken(user);

    const response: IUserAuth = {
      user,
      token,
    };

    return res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};
