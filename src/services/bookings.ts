import { IAppContext, IService } from "../types/app";
import {
  IBookATrip,
  IBookingsSchema,
  IcreateBookingsInput,
} from "../types/bookings";
import { generateSignature } from "../utils/generateSignature";

export class BookingService extends IService {
  constructor(context: IAppContext) {
    super(context);
  }

  async createOne(input: IcreateBookingsInput): Promise<IBookingsSchema> {
    try {
      const booking = new this.db.BookingModel({ ...input });
      await booking.save();

      return booking;
    } catch (e) {
      throw e;
    }
  }
}
