import { NextFunction, Request, Response } from "express";
import { IAppContext } from "../types/app";
import jwt from "jsonwebtoken";
import { config } from "../config";
import sendSMS from "../utils/sms";

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

/*********************** RESEND VERIFICATION CODE *************************/


/*********************** VERIFY PHONE NUMBER *************************/

export const VERIFY = async (
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

/***************************** SIGN IN ******************************/

export const SIGNIN = async (
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

    const user = await req.context.services?.user.signIn({ email, password });

    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
};
