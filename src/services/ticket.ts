import { IAppContext, IService } from "../types/app";

export class TicketService extends IService {
  constructor(context: IAppContext) {
    super(context);
  }

  async createOne() {}
}
