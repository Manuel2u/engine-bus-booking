import { IAppContext, IService } from "../types/app";

export class LocationService extends IService {
  constructor(context: IAppContext) {
    super(context);
  }

  async createOne() {}
}
