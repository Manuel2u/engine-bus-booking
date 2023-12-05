import { IAppContext, IService } from "../types/app";
import {
  IDeleteTripInput,
  IQueryTrip,
  ISearchTrips,
  ITripSchema,
  ITripSearchResult,
  IUpdateTripInput,
  IcreateTripInput,
} from "../types/trips";
import createError from "../utils/error";
import { formatDate, formatPeriod } from "../utils/formatDate";
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
      const filter = { busCompany: { eq: input.busCompany } };

      console.log(input.busCompany);

      const generatedQuery = __generateQuery("Trip", {
        filter: filter,
        search: {
          query: input.query,
          fields: input.fields,
          options: input.options,
        },
        populate: input.populate,
        sort: { createdAt: "desc" },
        pagination: { skip: input.skip, limit: input.limit },
      });

      const trips = await this.db.TripModel.find(generatedQuery.filter)
        .sort(generatedQuery.sort)
        .skip(generatedQuery.skip)
        .limit(generatedQuery.limit)
        .populate(generatedQuery.populate)
        .exec();

      // Transform the date field in each trip object
      const formattedTrips = trips.map((trip) => {
        const formattedDate = formatDate(trip.date);
        return {
          ...trip.toObject(),
          date: formattedDate,
        };
      });

      const tripsCount = await this.db.TripModel.countDocuments(
        generatedQuery.filter
      );

      return {
        trips: formattedTrips,
        tripsCount: tripsCount,
      };
    } catch (e) {
      throw e;
    }
  }

  async SearchTrips(input: ISearchTrips) {
    try {
      const trips = await this.db.TripModel.find({
        origin: input.origin,
        date: input.date,
        destination: input.destination,
      })
        .populate(input.populate)
        .skip(input.skip)
        .limit(input.limit)
        .exec();

      const tripsCount = await this.db.TripModel.countDocuments({
        origin: input.origin,
        date: input.date,
        destination: input.destination,
      });

      return {
        trips,
        tripsCount: tripsCount,
      };
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
