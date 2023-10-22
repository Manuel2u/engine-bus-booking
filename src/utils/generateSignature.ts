function generateSignature(data, secretKey) {
  const crypto = require("crypto");
  const hmac = crypto.createHmac("sha256", secretKey);
  hmac.update(JSON.stringify(data));
  return hmac.digest("hex");
}

export { generateSignature };
