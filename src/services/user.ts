import { approved_company_html } from "../templates/new_bus_company";
import { IAppContext, IService } from "../types/app";
import {
  IAddAdminToBusCompanyInput,
  IAdminwithoutPassWord,
  ICreateAdminInput,
  ICreateSudoAdminInput,
  IResetPasswordInput,
  ISigninInput,
  ISudoAdminwithoutPassWord,
  IUpdateAdminInput,
  IUserAuth,
  IUserInput,
  IUserwithoutPassWord,
  IVerifyPhoneInput,
} from "../types/user";
import { sendEmail } from "../utils/email";
import createError from "../utils/error";
import { generatePassword } from "../utils/generatePassword";
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
      const usersNameFirstLetter = input.fullName.split(" ")[0].split("")[0];

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

  async CreateAdmin(input: ICreateAdminInput): Promise<IUserAuth> {
    try {
      const _admin = await this.db.AdminModel.findOne({
        email: input.email,
      });

      if (_admin) {
        throw createError("User already exits", 400);
      }
      const usersNameFirstLetter = input.fullName.split(" ")[0].split("")[0];

      const admin = new this.db.AdminModel({
        ...input,

        profilePicture: usersNameFirstLetter,
        role: "ADMIN",
      });
      await admin.save();

      const savedAdmin = await this.db.AdminModel.findById(admin._id).select(
        "-password"
      );

      const token = _generateToken(admin);
      const adminAuth: IUserAuth = {
        user: savedAdmin as IAdminwithoutPassWord,
        token: token,
      };

      return adminAuth;
    } catch (e) {
      throw e;
    }
  }

  async CreateSudoAdmin(input: ICreateSudoAdminInput): Promise<IUserAuth> {
    try {
      const _sudoadmin = await this.db.AdminModel.findOne({
        email: input.email,
      });

      if (_sudoadmin) {
        throw createError("User already exits", 400);
      }
      const usersNameFirstLetter = input.fullName.split(" ")[0].split("")[0];

      const sudoAdmin = new this.db.SudoAdminModel({
        ...input,
        profilePicture: usersNameFirstLetter,
        role: "SUDOADMIN",
      });
      await sudoAdmin.save();

      const savedSudoAdmin = await this.db.SudoAdminModel.findById(
        sudoAdmin._id
      ).select("-password");

      const token = _generateToken(sudoAdmin);
      const sudoAdminAuth: IUserAuth = {
        user: savedSudoAdmin as ISudoAdminwithoutPassWord,
        token: token,
      };

      return sudoAdminAuth;
    } catch (e) {
      throw e;
    }
  }

  /***************************Social Media Auth ****************************/

  async SignUpWithGoogle() {}

  /***************************Social Media Auth ****************************/

  async verifyCode(input: IVerifyPhoneInput): Promise<string> {
    try {
      const code = await this.db.CodeModel.findOne({ user: input.id });

      if (!code) {
        throw createError("Code not found", 404);
      }

      if (code.code.toString() !== input.code.toString()) {
        throw createError("Incorrect Code", 400);
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

  async signInUser(input: ISigninInput): Promise<IUserAuth | string> {
    try {
      const user = await this.db.UserModel.findOne({ email: input.email });

      if (!user) {
        throw createError("User not found", 404);
      }

      const isPasswordValid = await user.comparePasswords(input.password);

      if (!isPasswordValid) {
        throw createError("Wrong Password", 400);
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

  async signInAdmin(input: ISigninInput): Promise<IUserAuth | string> {
    try {
      const admin = await this.db.AdminModel.findOne(
        { email: input.email },
        {
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        }
      ).populate("busCompany", {
        name: 1,
        _id: 1,
        logo: 1,
        tagline: 1,
        socials: 1,
        email: 1,
      });

      if (!admin) {
        throw createError("User not found", 404);
      }

      const isPasswordValid = await admin.comparePasswords(input.password);

      if (!isPasswordValid) {
        throw createError("Wrong Password", 400);
      } else {
        const { password, ...adminWithOutPassword } = admin.toObject();

        const token = _generateToken(adminWithOutPassword);

        const userAuth: IUserAuth = {
          user: adminWithOutPassword as IAdminwithoutPassWord,
          token: token,
        };

        return userAuth;
      }
    } catch (e: any) {
      throw createError(e.message, 500);
    }
  }

  async signInSudoAdmin(input: ISigninInput): Promise<IUserAuth | string> {
    try {
      const sudoAdmin = await this.db.SudoAdminModel.findOne({
        email: input.email,
      });

      if (!sudoAdmin) {
        throw createError("User not found", 404);
      }

      const isPasswordValid = await sudoAdmin.comparePasswords(input.password);

      if (!isPasswordValid) {
        throw createError("Wrong Password", 400);
      } else {
        const token = _generateToken(sudoAdmin);
        const userAuth: IUserAuth = {
          user: sudoAdmin as ISudoAdminwithoutPassWord,
          token: token,
        };

        return userAuth;
      }
    } catch (e: any) {
      throw createError(e.message, 500);
    }
  }

  /*************************** Reset Password ****************************/

  async resetPassword(input: IResetPasswordInput) {
    try {
      const admin = await this.db.AdminModel.findById(input.id);

      if (!admin) {
        throw new Error("Account not found");
      }

      const isPasswordValid = await admin.comparePasswords(input.oldPassword);

      if (!isPasswordValid) {
        throw new Error("Make sure your old password is correct");
      }

      if (input.password !== input.confirmPassword) {
        throw new Error("Password mismatch");
      }

      admin.password = input.password;

      await admin.save();

      return admin;
    } catch (e: any) {
      throw createError(e.message, 500);
    }
  }

  async updateAdmin(input: IUpdateAdminInput) {
    try {
      const admin = await this.db.AdminModel.findByIdAndUpdate(
        input._id,
        { $set: { ...input } },
        { new: true }
      ).populate("busCompany", {
        name: 1,
        _id: 1,
        logo: 1,
        tagline: 1,
        socials: 1,
        email: 1,
      });

      if (!admin) {
        throw new Error("Account not found");
      }

      const { password, ...adminWithOutPassword } = admin.toObject();

      return adminWithOutPassword;
    } catch (e: any) {
      throw createError(e.message, 500);
    }
  }

  async addAdminToBusCompany(input: IAddAdminToBusCompanyInput) {
    try {
      for (const adminInput of input.admins) {
        const _admin = await this.db.AdminModel.findOne({
          email: adminInput.email,
          busCompany: adminInput.busCompany,
        });

        if (_admin) {
          throw new Error("User already exists");
        }

        const busCompany = await this.db.BusCompanyModel.findById(
          adminInput.busCompany
        );

        if (!busCompany) {
          throw new Error("Bus Company not found");
        }

        const generatedPassword = generatePassword(8);

        const admin = new this.db.AdminModel({
          ...adminInput,
          password: generatedPassword,
          role:
            adminInput.role === "Admin"
              ? "BUS_COMPANY"
              : adminInput.role === "Member"
              ? "ADMIN"
              : null,
          fullName: "N/A",
          profilePicture: "N",
          busCompany: adminInput.busCompany,
          phone: "N/A",
        });

        await admin.save();

        await busCompany.updateOne({
          $push: { users: admin._id },
        });

        const html = approved_company_html(
          "Sir/Madam",
          adminInput.email || "",
          generatedPassword
        );

        // send them an email
        await sendEmail(adminInput.email || "", "Welcome to Molidom", {
          text: "hi",
          html: html,
        });
      }

      return "Admin(s) added successfully";
    } catch (e: any) {
      throw createError(e.message, 500);
    }
  }

  async getAllAdmins(input: { busCompany: string }) {
    try {
      const admins = await this.db.AdminModel.find({
        busCompany: input.busCompany,
      });

      return admins;
    } catch (e: any) {
      throw createError(e.message, 500);
    }
  }

  async editUserRoles(input: { id: string; role: string }) {
    try {
      const inputRole =
        input.role === "Admin"
          ? "BUS_COMPANY"
          : input.role === "Member"
          ? "ADMIN"
          : null;
      const admin = await this.db.AdminModel.findByIdAndUpdate(
        input.id,
        {
          $set: { role: inputRole },
        },
        { new: true }
      );
      if (!admin) {
        throw new Error("Account not found");
      }

      return admin;
    } catch (e: any) {
      throw createError(e.message, 500);
    }
  }

  async deleteUser(input: { id: string }) {
    try {
      const admin = await this.db.AdminModel.findByIdAndDelete(input.id);

      if (!admin) {
        throw new Error("Account not found");
      }

      return admin;
    } catch (e: any) {
      throw createError(e.message, 500);
    }
  }
}
