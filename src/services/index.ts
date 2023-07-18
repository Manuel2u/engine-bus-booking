import { IAppContext } from "../types/app";
import UserService from "./user";
import CodeService from "./code";
import Code from "./code";
import FirebaseAuth from "./firebase/auth/auth";
import OAuthService from "./passport/oAuth";

export interface IServices {
  user: UserService;
  code: CodeService;
  firebaseAuth: FirebaseAuth;
  oAuth: OAuthService;
}

export default async function initServices(context: IAppContext) {
  try {
    return {
      user: new UserService(context),
      code: new Code(context),
      firebaseAuth: new FirebaseAuth(context),
      oAuth: new OAuthService(context),
    };
  } catch (e) {
    throw e;
  }
}