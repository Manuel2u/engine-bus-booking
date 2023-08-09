import { IAppContext, IService } from "../types/app";

export class BookingService extends IService {
  constructor(context: IAppContext) {
    super(context);
  }
}
