import { approved_company_html } from "../templates/new_bus_company";
import { rejectedCompany } from "../templates/rejectedCompany";
import { IAppContext, IService } from "../types/app";
import {
  IAcceptBusCompany,
  ICreateBusCompanyInput,
  IGetBusCompany,
  IbusCompany,
  IbusCompanySchema,
} from "../types/busCompany";
import { sendEmail } from "../utils/email";
import createError from "../utils/error";
import { generatePassword } from "../utils/generatePassword";

export class BusCompanyService extends IService {
  constructor(context: IAppContext) {
    super(context);
  }

  async createOne(input: ICreateBusCompanyInput): Promise<IbusCompany> {
    try {
      const _BusCompany = await this.db.BusCompanyModel.findOne({
        email: input.email,
      });

      if (_BusCompany) {
        createError("Bus Operator already exits", 400);
      }

      const BusCompany = new this.db.BusCompanyModel({
        ...input,
        Bookings: [],
        status: "PENDING",
        Buses: [],
        Drivers: [],
        users: [],
      });

      await BusCompany.save();

      return BusCompany;
    } catch (e) {
      throw e;
    }
  }

  async acceptOne(input: IAcceptBusCompany): Promise<string> {
    try {
      const _BusCompany = await this.db.BusCompanyModel.findOne({
        _id: input._id,
      });

      if (!_BusCompany) {
        createError("Bus Company does not exist", 404);
      }

      await _BusCompany?.updateOne({ $set: { status: "ACCEPTED" } });

      const randomPassowrd = generatePassword((length = 12));
      const user = new this.db.AdminModel({
        role: " BUS_COMPANY",
        fullName: _BusCompany?.name,
        phone: _BusCompany?.mobileNumber,
        email: _BusCompany?.email,
        busCompany: _BusCompany?._id,
        password: randomPassowrd,
      });

      await user.save();

      const html = approved_company_html(
        _BusCompany?.name || "",
        _BusCompany?.email || "",
        randomPassowrd
      );

      // send them an email
      await sendEmail(_BusCompany?.email || "", "Welcome to Molidom", {
        text: "hi",
        html: html,
      });

      return "Company Accepted";
    } catch (e) {
      throw e;
    }
  }

  async rejectOne(input: IAcceptBusCompany): Promise<string> {
    try {
      const _BusCompany = await this.db.BusCompanyModel.findOne({
        _id: input._id,
      });

      if (!_BusCompany) {
        createError("Bus Company does not exist", 404);
      }

      await _BusCompany?.updateOne({ $set: { status: "REJECTED" } });

      // send them an email
      const html = rejectedCompany(_BusCompany?.name || "");

      // send them an email
      await sendEmail(_BusCompany?.email || "", "Sorry", {
        text: "hi",
        html: html,
      });

      return "Company Rejected";
    } catch (e) {
      throw e;
    }
  }

  async getAll(): Promise<IbusCompanySchema[]> {
    try {
      const busCompanies = await this.db.BusCompanyModel.find();
      return busCompanies;
    } catch (e) {
      throw e;
    }
  }

  async getOne(input: IGetBusCompany): Promise<IbusCompanySchema> {
    try {
      const busCompany = await this.db.BusCompanyModel.findOne({
        _id: input._id,
      });

      if (!busCompany) {
        throw createError("Bus Company does not exist", 404);
      }

      return busCompany;
    } catch (e) {
      throw e;
    }
  }
}
