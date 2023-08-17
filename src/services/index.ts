import { IAppContext } from "../types/app";
import UserService from "./user";
import CodeService from "./code";
import Code from "./code";
import FirebaseAuth from "./firebase/auth/auth";
import { initializeApp } from "firebase/app";
import config from "../services/firebase/config/firebase.config";
import FireBaseStorage from "./firebase/storage/uploadFile";
import { BusCompanyService } from "./busCompany";

export interface IServices {
  user: UserService;
  code: CodeService;
  firebaseAuth: FirebaseAuth;
  firebaseStorage: FireBaseStorage;
  busCompany: BusCompanyService;
}

export default async function initServices(context: IAppContext) {
  try {
    initializeApp(config.firebaseConfig);
    return {
      user: new UserService(context),
      busCompany: new BusCompanyService(context),
      code: new Code(context),
      firebaseAuth: new FirebaseAuth(context),
      firebaseStorage: new FireBaseStorage(context),
    };
  } catch (e) {
    throw e;
  }
}
