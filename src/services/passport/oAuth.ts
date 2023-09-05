import { NextFunction, Request, Response } from "express";
import { IAppContext, IService } from "../../types/app";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

export default class OAuthService extends IService {
  constructor(appContext: IAppContext) {
    super(appContext);
  }

  async GoogleAuth(req: Request, res: Response, next: NextFunction) {
    try {
      passport.use(
        new GoogleStrategy(
          {
            clientID: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
            callbackURL: "http://localhost:8080/api/v1/auth/google/redirect",
          },
          async (
            accessToken: any,
            refreshToken: any,
            profile: any,
            done: any
          ) => {
            try {
              // authentication logic goes here
              console.log(profile);

              const _user = await this.db.UserModel.findOne({
                googleID: profile.id,
              });

              if (_user) {
                req.user = _user;
                console.log(_user);

                return done(null, _user);
              } else {
                const user = new this.db.UserModel({
                  fullName: `${profile.name.familyName} ${profile.name.givenName}`,
                  googleID: profile.id,
                  isEmailVerified: profile.emails[0].verified,
                  email: profile.emails[0].value,
                  profilePic: profile.photos[0].value,
                  role: "USER",
                });
                await user.save();
                req.user = user;
                console.log(user);
                console.log(user);

                return done(null, user);
              }
            } catch (e) {
              return done(e);
            }
          }
        )
      );
    } catch (e) {
      throw e;
    }
  }
}
