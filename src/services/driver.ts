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
      const generatedQuery = __generateQuery("Driver", {
        populate: [],
        pagination: { skip: input.skip * input.limit, limit: input.limit },
      });

      const driver = this.db.DriverModel.find()
        .sort(generatedQuery.sort)
        .skip(generatedQuery.skip)
        .limit(generatedQuery.limit)
        .populate(generatedQuery.populate);

      if (!driver) {
        throw createError("No Driver Found", 404);
      }

      return driver;
    } catch (e) {
      throw e;
    }
  }
  async retireOne(input: IUpdateDriverInput): Promise<IDriverSchema> {
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
