import qrcode from "qrcode";

async function generateQRCode(qrCodeData: any): Promise<string> {
  return new Promise((resolve, reject) => {
    // Convert the data to a JSON string (you might need to customize this)
    const dataString = JSON.stringify(qrCodeData);

    // Generate the QR code
    qrcode.toDataURL(dataString, (err, url) => {
      if (err) {
        reject(err);
      } else {
        resolve(url);
      }
    });
  });
}

export { generateQRCode };
