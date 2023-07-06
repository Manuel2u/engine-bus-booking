import { IAppContext } from "../types/app";
import UserService from "./user";
import CodeService from "./code";
import Code from "./code";

export interface IServices {
  user: UserService;
  code: CodeService;
}

export default async function initServices(context: IAppContext) {
  try {
    return {
      user: new UserService(context),
      code: new Code(context),
    };
  } catch (e) {
    throw e;
  }
}
