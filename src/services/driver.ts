import { Types } from "mongoose";
import { IAppContext, IService } from "../types/app";
import {
  ICreateDriverInput,
  IDriverSchema,
  IQueryDriver,
  IUpdateDriverInput,
} from "../types/driver";
import createError from "../utils/error";
import { __generateQuery } from "../utils/query";

export class DriverService extends IService {
  constructor(context: IAppContext) {
    super(context);
  }

  async createOne(input: ICreateDriverInput): Promise<IDriverSchema> {
    try {
      const _driver = await this.db.DriverModel.findOne({ email: input.email });

      if (_driver) {
        throw createError("Driver already exists", 400);
      }

      const driver = new this.db.DriverModel({ ...input });

      await driver.save();

      await this.db.BusCompanyModel.findByIdAndUpdate(
        input.busCompany,
        { $push: { Drivers: driver._id } },
        { new: true }
      );

      return driver;
    } catch (e) {
      throw e;
    }
  }

  async getOne(input: IQueryDriver) {
    const generatedQuery = __generateQuery("Driver", {
      filter: { _id: { eq: input.filter } },
      populate: [],

      pagination: { skip: input.skip * input.limit, limit: input.limit },
      sort: { fullName: "asc" },
    });

    try {
      const driver = await this.db.DriverModel.find(generatedQuery.filter)
        .sort(generatedQuery.sort)
        .skip(generatedQuery.skip)
        .limit(generatedQuery.limit)
        .populate(generatedQuery.populate)
        .exec();

      if (!driver) {
        throw createError("Driver not found", 404);
      }

      return driver;
    } catch (e) {
      throw e;
    }
  }

  async getAll(input: IQueryDriver) {
    try {
      const filter = {
        busCompany: { eq: input.busCompany },
      };

      const generatedQuery = __generateQuery("Driver", {
        filter: filter,
        search: {
          query: input.query,
          fields: input.fields,
          options: input.options,
        },
        sort: { createdAt: "desc" },
        populate: input.populate,
        pagination: { skip: input.skip, limit: input.limit },
      });
      console.log(JSON.stringify(generatedQuery));

      const drivers = await this.db.DriverModel.find(generatedQuery.filter)
        .sort(generatedQuery.sort)
        .skip(generatedQuery.skip)
        .limit(generatedQuery.limit)
        .populate(generatedQuery.populate)
        .exec();

      const driversCount = await this.db.DriverModel.countDocuments(
        generatedQuery.filter
      );
      if (!drivers) {
        throw createError("No Drivers Found", 404);
      }

      return {
        drivers,
        driversCount,
      };
    } catch (e) {
      throw e;
    }
  }
  async retireOne(input: { _id: Types.ObjectId }): Promise<IDriverSchema> {
    try {
      const _driver = await this.db.DriverModel.findOne({ _id: input._id });

      if (!_driver) {
        throw createError("Driver does not exist", 404);
      }

      await _driver.updateOne({ $set: { status: "RETIRED" } });
      return _driver;
    } catch (e) {
      throw e;
    }
  }

  async updateOne(input: IUpdateDriverInput): Promise<IDriverSchema> {
    try {
      const _driver = await this.db.DriverModel.findOne({ _id: input._id });

      if (!_driver) {
        throw createError("Driver does not exist", 404);
      }

      await _driver.updateOne({ $set: { ...input } });
      return _driver;
    } catch (e) {
      throw e;
    }
  }
}
