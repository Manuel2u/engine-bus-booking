import { IAppContext, IService } from "../../../types/app";

export default class FirebaseAuth extends IService {
  constructor(appContext: IAppContext) {
    super(appContext);
  }

  async signupWithGoogle() {}
  async signupWithApple() {}
  async signupWithFaceBook() {}
}
