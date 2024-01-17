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
      return res.status(400).json({
        status: "failed",
        message: "Make sure all input fileds are correct",
      });
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

    return res.status(200).json({ status: "success", data: _user });
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

    return res.status(200).json({ status: "success", data: _user });
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

    return res
      .status(200)
      .json({ status: "success", message: "code resent succesfully" });
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

    const { user } = req;

    if (!code) {
      return res
        .status(400)
        .json({ status: "failed", message: "Please input verification code" });
    }

    const response = await req.context.services?.user.verifyCode({
      code: code,
      id: user._id,
    });

    return res.status(200).json({ status: "success", message: response });
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
      return res.status(400).json({
        status: "failed",
        message: "Make sure all input fileds are correct",
      });
    }

    const user = await req.context.services?.user.signInUser({
      email,
      password,
    });

    return res.status(200).json({ status: "success", data: user });
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

    return res.status(200).json({ status: "success", data: user });
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

    return res.status(200).json({ status: "success", data: user });
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

/***************************** RESET PASSWORD ******************************/

export const RESETPASSWORD = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      return res
        .status(400)
        .json({ message: "Make sure all input fileds are correct" });
    }

    const response = await req.context.services?.user.resetPassword({
      id: req.user._id,
      oldPassword,
      password: newPassword,
      confirmPassword: confirmNewPassword,
    });

    return res.status(200).json({ status: "success", data: response });
  } catch (e) {
    next(e);
  }
};

/***************************** UPDATE USER ******************************/

export const UPDATEADMIN = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      _id,
      fullName,
      phone,
      email,
      altEmail,
      profilePicture,
      bio,
      jobTitle,
    } = req.body;

    if (!fullName || !phone || !email) {
      return res
        .status(400)
        .json({ message: "Make sure all input fileds are correct" });
    }

    const response = await req.context.services?.user.updateAdmin({
      _id,
      fullName,
      phone,
      email,
      altEmail,
      profilePicture,
      bio,
      jobTitle,
    });

    return res.status(200).json({ status: "success", data: response });
  } catch (e) {
    next(e);
  }
};

export const ADD_ADMIN = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { admins } = req.body;

    if (!admins) {
      return res
        .status(400)
        .json({ message: "Make sure all input fileds are correct" });
    }

    const response = await req.context.services?.user.addAdminToBusCompany({
      admins,
    });

    return res.status(200).json({ status: "success", message: response });
  } catch (e) {
    next(e);
  }
};

/***************************** GET ALL USERS ******************************/

export const GETALL = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const busCompany = req.query.busCompany as string;

    if (!busCompany) {
      return res.status(400).json({
        status: "failed",
        message: "Make sure all input fileds are correct",
      });
    }
    const response = await req.context.services?.user.getAllAdmins({
      busCompany,
    });

    return res.status(200).json({ status: "success", users: response });
  } catch (e) {
    next(e);
  }
};

export const EDIT_ADMIN_ROLE = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { adminID, role } = req.body;

    if (!adminID || !role) {
      return res.status(400).json({
        status: "failed",
        message: "Make sure all input fileds are correct",
      });
    }
    const response = await req.context.services?.user.editUserRoles({
      id: adminID,
      role,
    });

    return res.status(200).json({ status: "success", users: response });
  } catch (e) {
    next(e);
  }
};

export const DELETE_ADMIN = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const adminID = req.params.adminID as string;

    if (!adminID) {
      return res.status(400).json({
        status: "failed",
        message: "Make sure all input fileds are correct",
      });
    }
    const response = await req.context.services?.user.deleteUser({
      id: adminID,
    });

    return res.status(200).json({ status: "success", users: response });
  } catch (e) {
    next(e);
  }
};
