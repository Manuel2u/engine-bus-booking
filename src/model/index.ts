import mongoose, { connect } from "mongoose";
import UserModel from "./user.model";
import CodeModel from "./code.model";
import { Config } from "../config";
import { IUserModel } from "../types/user";

import { ICode, ICodeModel } from "../types/code";

export interface IDb {
  UserModel: IUserModel;
  CodeModel: ICodeModel;
}

export default async function InitDB(config: Config["db"]): Promise<IDb> {
  try {
    await connect(config.uri);
    console.log("Database connected");

    await UserModel.createCollection();
    await CodeModel.createCollection();

    return {
      UserModel,
      CodeModel,
    };
  } catch (e) {
    throw e;
  }
}
