import { IAppContext, IService } from "../types/app";

export class BusOperatorService extends IService {
  constructor(context: IAppContext) {
    super(context);
  }

  async createOne() {}
}
