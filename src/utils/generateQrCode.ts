import { Request } from "express";
import qrcode from "qrcode";

async function generateQRCode(
  qrCodeData: { bookingId: any },
  req: Request
): Promise<string> {
  try {
    const { uploadFile } = req.context.services.firebaseStorage;

    // Convert the data to a JSON string (you might need to customize this)
    const dataString = JSON.stringify(qrCodeData);

    // Generate the QR code as a data URL
    const qrCodeDataURL = await qrcode.toDataURL(dataString);

    // Upload the QR code data URL to Firebase Storage
    const fileName = `${qrCodeData.bookingId}_qrcode.png`;

    const downloadURL = await uploadFile({
      folderName: "qrcodes",
      fileName,
      mimeType: "image/png", // Set the appropriate MIME type
      file: Buffer.from(qrCodeDataURL.split(",")[1], "base64"),
    });

    return downloadURL;
  } catch (e) {
    throw e;
  }
}

export { generateQRCode };
