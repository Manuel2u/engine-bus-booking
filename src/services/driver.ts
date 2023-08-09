import { IAppContext, IService } from "../types/app";

export class DriverService extends IService {
  constructor(context: IAppContext) {
    super(context);
  }

  async createOne() {}
}
