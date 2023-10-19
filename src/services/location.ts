import { IAppContext, IService } from "../types/app";
import {
  IAddLocationInput,
  ILocationSchema,
  IQueryLocation,
} from "../types/locations";
import createError from "../utils/error";
import { __generateQuery } from "../utils/query";

export class LocationService extends IService {
  constructor(context: IAppContext) {
    super(context);
  }

  async createOne(input: IAddLocationInput): Promise<ILocationSchema> {
    try {
      const _location = await this.db.LocationModel.findOne({
        name: input.name,
      });

      if (_location) {
        throw createError("Location already exists", 400);
      }

      const location = new this.db.LocationModel({ ...input });

      await location.save();

      return location;
    } catch (e) {
      console.log(e);
    }
  }

  async getAll(input: IQueryLocation) {
    try {
      // const generatedQuery = __generateQuery("Location", {
      //   filter: {},
      //   search: {
      //     query: input.query,
      //     fields: input.fields,
      //     options: input.options,
      //   },
      //   sort: { name: "asc" },
      //   populate: input.populate,
      //   pagination: { skip: input.skip, limit: input.limit },
      // });

      const locations = await this.db.LocationModel.find();

      if (!locations) {
        throw createError("No Locations Found", 404);
      }

      return {
        locations,
      };
    } catch (e) {
      throw e;
    }
  }
}
