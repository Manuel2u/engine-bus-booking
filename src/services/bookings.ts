import { IAppContext, IService } from "../types/app";
import {
  IBookATrip,
  IBookingsSchema,
  IcreateBookingsInput,
} from "../types/bookings";

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

  async bookATrip(input: IBookATrip) {
    try {
      const updatedUser = await this.db?.UserModel.findOneAndUpdate(
        { _id: input.userid },
        { $push: { Bookings: input.bookingid } },
        { new: true }
      );
      return updatedUser;
    } catch (e) {
      throw e;
    }
  }
}
