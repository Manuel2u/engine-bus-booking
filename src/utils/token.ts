import jwt from "jsonwebtoken";
import {
  IAdminSchema,
  ISudoAdminSchema,
  IUser,
  IUserSchema,
} from "../types/user";
import { config } from "../config";

export const _generateToken = (
  user: IUserSchema | IAdminSchema | ISudoAdminSchema | any
) => {
  try {
    const token = jwt.sign({ user: user }, config.auth.secret, {
      expiresIn: config.auth.expiresIn,
    });
    return token;
  } catch (e) {
    throw e;
  }
};
