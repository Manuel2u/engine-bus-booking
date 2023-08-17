import { IAppContext } from "../types/app";

declare module "express-serve-static-core" {
  interface Request {
    context: IAppContext;
  }
}
