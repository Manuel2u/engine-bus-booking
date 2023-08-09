import { IAppContext, IService } from "../types/app";

export class TripService extends IService {
  constructor(context: IAppContext) {
    super(context);
  }

  async createOne() {}
}
