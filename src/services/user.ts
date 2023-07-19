import { IAppContext, IService } from "../types/app";
import {
  ISigninInput,
  IUserAuth,
  IUserInput,
  IUserwithoutPassWord,
  IVerifyPhoneInput,
} from "../types/user";
import createError from "../utils/error";
import { _generateToken } from "../utils/token";

export default class UserService extends IService {
  constructor(appContext: IAppContext) {
    super(appContext);
  }

  async CreateOne(input: IUserInput): Promise<IUserAuth> {
    try {
      const _user = await this.db.UserModel.findOne({
        email: input.email,
      });

      if (_user) {
        throw createError("User already exits", 400);
      }
      const usersNameFirstLetter = input.fullName.split(" ")[0];

      const user = new this.db.UserModel({
        ...input,
        profilePic: usersNameFirstLetter,
        role: "USER",
      });
      await user.save();

      const savedUser = await this.db.UserModel.findById(user._id).select(
        "-password"
      );

      const token = _generateToken(user);
      const userAuth: IUserAuth = {
        user: savedUser as IUserwithoutPassWord,
        token: token,
      };

      return userAuth;
    } catch (e) {
      throw e;
    }
  }

  async CreateAdmin(input: IUserInput): Promise<IUserAuth> {
    try {
      const _user = await this.db.UserModel.findOne({
        email: input.email,
      });

      if (_user) {
        throw createError("User already exits", 400);
      }
      const usersNameFirstLetter = input.fullName.split(" ")[0];

      const user = new this.db.UserModel({
        ...input,
        profilePic: usersNameFirstLetter,
        role: "ADMIN",
      });
      await user.save();

      const savedUser = await this.db.UserModel.findById(user._id).select(
        "-password"
      );

      const token = _generateToken(user);
      const userAuth: IUserAuth = {
        user: savedUser as IUserwithoutPassWord,
        token: token,
      };

      return userAuth;
    } catch (e) {
      throw e;
    }
  }

  async CreateSuperAdmin(input: IUserInput): Promise<IUserAuth> {
    try {
      const _user = await this.db.UserModel.findOne({
        email: input.email,
      });

      if (_user) {
        throw createError("User already exits", 400);
      }
      const usersNameFirstLetter = input.fullName.split(" ")[0];

      const user = new this.db.UserModel({
        ...input,
        profilePic: usersNameFirstLetter,
        role: "SUPERADMIN",
      });
      await user.save();

      const savedUser = await this.db.UserModel.findById(user._id).select(
        "-password"
      );

      const token = _generateToken(user);
      const userAuth: IUserAuth = {
        user: savedUser as IUserwithoutPassWord,
        token: token,
      };

      return userAuth;
    } catch (e) {
      throw e;
    }
  }

  /***************************Social Media Auth ****************************/

  async SignUpWithGoogle(){
  }

  /***************************Social Media Auth ****************************/

  async verifyCode(input: IVerifyPhoneInput): Promise<string> {
    try {
      const code = await this.db.CodeModel.findOne({ user: input.id });

      if (!code) {
        throw createError("Code not found", 404);
      }

      if (code.code.toString() !== input.code.toString()) {
        return "Incorrect code";
      }

      const user = await this.db.UserModel.findOne({ _id: input.id });

      if (!user) {
        throw createError("User not found", 404);
      }

      user.isPhoneNumberVerified = true;
      await user.save();

      return "Phone number verified successfully";
    } catch (error: any) {
      console.log(error);
      throw createError(error.message, 500);
    }
  }

  async signIn(input: ISigninInput): Promise<IUserAuth | string> {
    try {
      const user = await this.db.UserModel.findOne({ email: input.email });

      if (!user) {
        throw createError("User not found", 404);
      }

      const isPasswordValid = await user.comparePasswords(input.password);

      if (!isPasswordValid) {
        return "Invalid password";
      } else {
        const token = _generateToken(user);
        const userAuth: IUserAuth = {
          user: user as IUserwithoutPassWord,
          token: token,
        };

        return userAuth;
      }
    } catch (e: any) {
      throw createError(e.message, 500);
    }
  }

  /*************************** Reset Password ****************************/
}
