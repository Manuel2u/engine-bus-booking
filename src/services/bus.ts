import { IAppContext, IService } from "../types/app";
import {
  IAddBusInput,
  IBus,
  IBusSchema,
  IDecomissionBus,
  IQueryBus,
  IUpdateBus,
} from "../types/bus";
import createError from "../utils/error";
import { __generateQuery } from "../utils/query";

export class BusService extends IService {
  constructor(context: IAppContext) {
    super(context);
  }

  async createOne(input: IAddBusInput): Promise<IBusSchema> {
    try {
      const _bus = await this.db.BusModel.findOne({
        vehicleNumber: input.vehicleNumber,
      });
      if (_bus) {
        throw createError("Bus already exists", 400);
      }
      const bus = new this.db.BusModel({ ...input });

      await bus.save();
      return bus;
    } catch (e) {
      throw e;
    }
  }

  async getAll(input: IQueryBus) {
    try {
      const generatedQuery = __generateQuery("Bus", {
        populate: [],
        pagination: { skip: input.skip * input.limit, limit: input.limit },
      });

      const bus = this.db.BusModel.find()
        .sort(generatedQuery.sort)
        .skip(generatedQuery.skip)
        .limit(generatedQuery.limit)
        .populate(generatedQuery.populate);

      if (!bus) {
        throw createError("No Bus Found", 404);
      }

      return bus;
    } catch (e) {
      throw e;
    }
  }

  async getOne(input: IQueryBus) {
    const generatedQuery = __generateQuery("Bus", {
      filter: { _id: { eq: input.filter } },
      populate: [],

      pagination: { skip: input.skip * input.limit, limit: input.limit },
      sort: { yearOfMake: "asc" },
    });

    try {
      const bus = await this.db.BusModel.find(generatedQuery.filter)
        .sort(generatedQuery.sort)
        .skip(generatedQuery.skip)
        .limit(generatedQuery.limit)
        .populate(generatedQuery.populate)
        .exec();

      if (!bus) {
        throw createError("Bus not found", 404);
      }

      return bus;
    } catch (e) {
      throw e;
    }
  }

  async updateOne(input: IUpdateBus): Promise<IBusSchema> {
    try {
      const _bus = await this.db.BusModel.findOne({
        _id: input._id,
      });
      if (!_bus) {
        throw createError("Bus does not exist", 404);
      }

      await _bus.updateOne({ $set: { ...input } });

      const updatedBus = await _bus.save();

      return updatedBus;
    } catch (e) {
      throw e;
    }
  }

  async decomissionOne(input: IDecomissionBus): Promise<IBusSchema> {
    try {
      const _bus = await this.db.BusModel.findOne({
        _id: input._id,
      });
      if (!_bus) {
        throw createError("Bus does not exist", 404);
      }

      await _bus.updateOne({ $set: { status: "DECOMMISSIONED" } });

      const updatedBus = await _bus.save();

      return updatedBus;
    } catch (e) {
      throw e;
    }
  }
}
