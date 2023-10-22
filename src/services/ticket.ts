import { IAppContext, IService } from "../types/app";
import {
  IGetTicket,
  ITicketModel,
  ITicketSchema,
  IcreateTicketInput,
} from "../types/tickets";
import { generateQRCode } from "../utils/generateQrCode";
import crypto from "crypto";

export class TicketService extends IService {
  constructor(context: IAppContext) {
    super(context);
  }

  async createOne(input: IcreateTicketInput): Promise<ITicketSchema> {
    try {
      // Generate the QR code data URL using the data provided
      const qrCodeUrl = await generateQRCode(input.QRCodeData);

      // Create a new ticket with the QR code URL
      const ticket = new this.db.TicketModel({
        Booking: input.Booking,
        user: input.user,
        QRCode: qrCodeUrl,
        status: input.status, // Set the initial status as provided
      });

      // Save the ticket to the database
      await ticket.save();

      return ticket;
    } catch (e) {
      throw e;
    }
  }

  async verifyQRCode(qrCodeData: any, signature: string): Promise<boolean> {
    // Get the secret key used for signing the QR code data (make sure it's kept secure)
    const secretKey = "YourSecretKey"; // Replace with your actual secret key

    // Verify the signature
    if (this.verifySignature(qrCodeData, signature, secretKey)) {
      // Check the expiration date and status
      return this.isQRCodeValid(qrCodeData);
    } else {
      return false; // Signature verification failed
    }
  }

  // Function to verify the signature
  async verifySignature(data, signature, secretKey) {
    const hmac = crypto.createHmac("sha256", secretKey);
    hmac.update(JSON.stringify(data));
    const computedSignature = hmac.digest("hex");
    return computedSignature === signature;
  }

  // Function to check if the QR code data is valid
  async isQRCodeValid(qrCodeData: any) {
    // Retrieve relevant data from the QR code, such as the expiration date and status
    const expirationDate = new Date(qrCodeData.expirationDate);
    const currentDate = new Date();
    const ticketStatus = qrCodeData.status;

    // Perform validity checks
    if (currentDate > expirationDate || ticketStatus !== "VALID") {
      return false; // QR code data is not valid
    }

    return true; // QR code data is valid
  }
}
