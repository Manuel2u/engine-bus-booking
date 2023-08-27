import { IAppContext, IService } from "../types/app";
import {
  IGetTicket,
  ITicketModel,
  ITicketSchema,
  IcreateTicketInput,
} from "../types/tickets";

export class TicketService extends IService {
  constructor(context: IAppContext) {
    super(context);
  }

  async createOne(input: IcreateTicketInput): Promise<ITicketSchema> {
    try {
      const ticket = new this.db.TicketModel({ ...input });
      await ticket.save();
      return ticket;
    } catch (e) {
      throw e;
    }
  }

  async GetATicket(input: IGetTicket) {
    try {
      const updatedUser = await this.db?.UserModel.findOneAndUpdate(
        { _id: input.userid },
        { $push: { Bookings: input.ticketid } },
        { new: true }
      );
      return updatedUser;
    } catch (e) {
      throw e;
    }
  }
}
