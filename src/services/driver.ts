import { IAppContext, IService } from "../types/app";
import {
  ICreateDriverInput,
  IDriverSchema,
  IUpdateDriverInput,
} from "../types/driver";
import createError from "../utils/error";

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

  async getOne() {}

  async getAll() {}

  async retireOne(input: IUpdateDriverInput): Promise<IDriverSchema> {
    try {
      const _driver = await this.db.DriverModel.findOne({ email: input.email });

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
      const _driver = await this.db.DriverModel.findOne({ email: input.email });

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
