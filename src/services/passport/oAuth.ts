import { IAppContext, IService } from "../../types/app";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

export default class OAuthService extends IService {
  constructor(appContext: IAppContext) {
    super(appContext);
  }

  async GoogleAuth() {
    try {
      passport.use(
        new GoogleStrategy(
          {
            clientID: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            callbackURL: "http://localhost:8080/auth/google/redirect",
          },
          function (
            accessToken: any,
            refreshToken: any,
            profile: any,
            done: any
          ) {
            // Your authentication logic goes here
          }
        )
      );
    } catch (e) {
      throw e;
    }
  }
}
