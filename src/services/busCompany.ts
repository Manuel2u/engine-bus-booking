import { approved_company_html } from "../templates/new_bus_company";
import { rejectedCompany } from "../templates/rejectedCompany";
import { IAppContext, IService } from "../types/app";
import {
  IAcceptBusCompany,
  ICreateBusCompanyInput,
  IGetBusCompany,
  IUpdateBusCompanyInput,
  IbusCompany,
  IbusCompanySchema,
} from "../types/busCompany";
import { sendEmail } from "../utils/email";
import createError from "../utils/error";
import { generatePassword } from "../utils/generatePassword";
import { __generateQuery } from "../utils/query";

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
        throw createError("Bus Operator already exits", 400);
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
        throw createError("Bus Company does not exist", 404);
      }

      await _BusCompany?.updateOne({ $set: { status: "APPROVED" } });

      const randomPassowrd = generatePassword(12);
      const usersNameFirstLetter = _BusCompany?.name.split(" ")[0].split("")[0];

      const user = new this.db.AdminModel({
        role: "BUS_COMPANY",
        fullName: "N/A",
        profilePicture: usersNameFirstLetter,
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
        throw createError("Bus Company does not exist", 404);
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

  async getAll(input: {
    skip: number;
    limit: number;
    populate?: string[];
    query?: string;
    fields?: string[];
    options?: any[];
  }) {
    const generatedQuery = __generateQuery("BusCompany", {
      filter: {},
      search: {
        query: input.query,
        fields: input.fields,
        options: input.options,
      },
      populate: input.populate,
      pagination: { skip: input.skip, limit: input.limit },
    });
    try {
      const busCompanies = await this.db.BusCompanyModel.find(
        generatedQuery.filter
      )
        .populate(generatedQuery.populate)
        .skip(generatedQuery.skip)
        .limit(generatedQuery.limit)
        .exec();

      const count = await this.db.BusCompanyModel.countDocuments(
        generatedQuery.filter
      );
      return {
        busCompanies,
        count,
      };
    } catch (e) {
      throw e;
    }
  }

  async getOne(input: IGetBusCompany) {
    const generatedQuery = __generateQuery("BusCompany", {
      filter: { _id: { eq: input._id } },
      populate: [],

      pagination: { skip: input.skip * input.limit, limit: input.limit },
      sort: { mobileNumber: "asc" },
    });

    console.log("Generated Query:", JSON.stringify(generatedQuery, null, 2));

    try {
      const busCompany = await this.db.BusCompanyModel.find(
        generatedQuery.filter
      )
        .sort(generatedQuery.sort)
        .skip(generatedQuery.skip)
        .limit(generatedQuery.limit)
        .populate(generatedQuery.populate)
        .exec();

      if (!busCompany) {
        throw createError("Bus Company not found", 404);
      }

      return busCompany;
    } catch (e) {
      throw e;
    }
  }

  async getDashBoardStats(input) {
    try {
      const user = await this.db.AdminModel.findOne({ _id: input.id });

      if (!user) {
        createError("User Not found", 404);
      }

      const aggregationPipeline = [
        {
          $match: {
            busCompany: user.busCompany,
          },
        },
        {
          $lookup: {
            from: "buscompanies",
            localField: "busCompany",
            foreignField: "_id",
            as: "busCompany",
          },
        },
        {
          $project: {
            busCompany: { $arrayElemAt: ["$busCompany", 0] },
          },
        },
        {
          $project: {
            _id: 1,
            busCount: { $size: "$busCompany.Buses" },
            driverCount: { $size: "$busCompany.Drivers" },
            bookingCount: { $size: "$busCompany.Bookings" },
          },
        },
      ];

      const dashBoardStat = await this.db.AdminModel.aggregate(
        aggregationPipeline
      );

      return dashBoardStat;
    } catch (e) {
      throw e;
    }
  }

  async updateOne(input: IUpdateBusCompanyInput): Promise<IbusCompanySchema> {
    try {
      const busCompany = await this.db.BusCompanyModel.findByIdAndUpdate(
        input._id,
        { $set: { ...input } },
        { new: true }
      ).select("-Buses -Drivers -Bookings -Trips -users -status");

      if (!busCompany) {
        throw new Error("Company not found");
      }

      return busCompany;
    } catch (e: any) {
      throw createError(e.message, 500);
    }
  }
}
