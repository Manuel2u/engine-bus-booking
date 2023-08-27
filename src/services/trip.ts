import { IAppContext, IService } from "../types/app";
import {
  IDeleteTripInput,
  IQueryTrip,
  ITripSchema,
  IUpdateTripInput,
  IcreateTripInput,
} from "../types/trips";
import createError from "../utils/error";
import { __generateQuery } from "../utils/query";

export class TripService extends IService {
  constructor(context: IAppContext) {
    super(context);
  }

  async createOne(input: IcreateTripInput): Promise<ITripSchema> {
    try {
      const trip = new this.db.TripModel({ ...input });
      await trip.save();
      return trip;
    } catch (e) {
      throw e;
    }
  }

  async getOne(input: IQueryTrip) {
    const generatedQuery = __generateQuery("Trip", {
      filter: { _id: { eq: input.filter } },
      populate: [],

      pagination: { skip: input.skip * input.limit, limit: input.limit },
      sort: { createdAt: "asc" },
    });

    try {
      const trip = await this.db.TripModel.find(generatedQuery.filter)
        .sort(generatedQuery.sort)
        .skip(generatedQuery.skip)
        .limit(generatedQuery.limit)
        .populate(generatedQuery.populate)
        .exec();

      if (!trip) {
        throw createError("Trip not found", 404);
      }

      return trip;
    } catch (e) {
      throw e;
    }
  }

  async getAll(input: IQueryTrip) {
    try {
      const generatedQuery = __generateQuery("Trip", {
        populate: [],
        pagination: { skip: input.skip * input.limit, limit: input.limit },
      });

      const trip = this.db.TripModel.find()
        .sort(generatedQuery.sort)
        .skip(generatedQuery.skip)
        .limit(generatedQuery.limit)
        .populate(generatedQuery.populate);

      if (!trip) {
        throw createError("No Trip Found", 404);
      }

      return trip;
    } catch (e) {
      throw e;
    }
  }

  async cancelOne(input: IUpdateTripInput): Promise<ITripSchema> {
    try {
      const _trip = await this.db.TripModel.findOne({ _id: input._id });

      if (!_trip) {
        throw createError("Trip does not exist", 404);
      }

      await _trip.updateOne({ $set: { tripStatus: "CANCELLED" } });
      return _trip;
    } catch (e) {
      throw e;
    }
  }

  async restoreOne(input: IUpdateTripInput): Promise<ITripSchema> {
    try {
      const _trip = await this.db.TripModel.findOne({ _id: input._id });

      if (!_trip) {
        throw createError("Trip does not exist", 404);
      }

      await _trip.updateOne({ $set: { tripStatus: "ACTIVE" } });
      return _trip;
    } catch (e) {
      throw e;
    }
  }

  async updateOne(input: IUpdateTripInput): Promise<ITripSchema> {
    try {
      const _trip = await this.db.TripModel.findOne({ _id: input._id });

      if (!_trip) {
        throw createError("Trip does not exist", 404);
      }

      await _trip.updateOne({ $set: { ...input } });
      return _trip;
    } catch (e) {
      throw e;
    }
  }

  async deleteOne(input: IDeleteTripInput): Promise<ITripSchema> {
    try {
      const _trip = await this.db.TripModel.findOne({ _id: input._id });

      if (!_trip) {
        throw createError("Trip does not exist", 404);
      }

      await _trip.deleteOne();
      return _trip;
    } catch (e) {
      throw e;
    }
  }
}
