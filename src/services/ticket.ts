import { Request } from "express";
import { IAppContext, IService } from "../types/app";
import {
  IGetTicket,
  ITicketModel,
  ITicketSchema,
  IcreateTicketInput,
} from "../types/tickets";
import { generateQRCode } from "../utils/generateQrCode";
import crypto from "crypto";
import { Types } from "mongoose";
import { __generateQuery } from "../utils/query";

export class TicketService extends IService {
  constructor(context: IAppContext) {
    super(context);
  }

  async createOne(
    input: IcreateTicketInput,
    req: Request
  ): Promise<ITicketSchema> {
    try {
      // Generate the QR code data URL using the data provided
      const qrCodeUrl = await generateQRCode(input.QRCodeData, req);

      // Create a new ticket with the QR code URL
      const ticket = new this.db.TicketModel({
        Booking: input.Booking,
        user: input.user,
        QRCode: qrCodeUrl,
        status: input.status,
      });

      // Save the ticket to the database
      await ticket.save();

      return ticket;
    } catch (e) {
      throw e;
    }
  }

  async getOne(input: IGetTicket) {
    try {
      const filter = {
        Booking: { eq: input.bookingId },
      };

      const generatedQuery = __generateQuery("Ticket", {
        filter: filter,
        populate: input.populate,
      });

      const ticket = await this.db.TicketModel.find(generatedQuery.filter)
        .populate(generatedQuery.populate)
        .exec();

      return ticket;
    } catch (e) {
      throw e;
    }
  }

  async getAll(): Promise<ITicketSchema[]> {
    try {
      // Find all tickets
      const tickets = await this.db.TicketModel.find();

      return tickets;
    } catch (e) {
      throw e;
    }
  }

  async getManyByUser(user: string): Promise<ITicketSchema[]> {
    try {
      // Find all tickets belonging to the user
      const tickets = await this.db.TicketModel.find({ user });

      return tickets;
    } catch (e) {
      throw e;
    }
  }

  async getManyByBooking(Booking: string): Promise<ITicketSchema[]> {
    try {
      // Find all tickets belonging to the booking
      const tickets = await this.db.TicketModel.find({ Booking });

      return tickets;
    } catch (e) {
      throw e;
    }
  }

  async getManyByStatus(status: string): Promise<ITicketSchema[]> {
    try {
      // Find all tickets with the provided status
      const tickets = await this.db.TicketModel.find({ status });

      return tickets;
    } catch (e) {
      throw e;
    }
  }
}
