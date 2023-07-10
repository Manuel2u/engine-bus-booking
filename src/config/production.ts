import dotenv from "dotenv";
import { Config } from ".";
dotenv.config();

const config: Config = {
  app: {
    env: "production",
    name: "molidom",
    port: process.env.PORT as unknown as number,
  },
  auth: {
    secret: process.env.JWT_SECRET || "00606060",
    expiresIn: "1d",
  },
  db: {
    uri: process.env.PROD_MONGO_URI || "",
  },
  mail: {
    username: process.env.MAILGUN_USERNAME || "",
    key:
      process.env.MAILGUN_API_KEY ||
      "26b2960b8ae02db40b88c8c21f69c262-5645b1f9-6b118c84",
    domain: process.env.MAIL_DOMAIN || "mail.polymorphlabs.io",
  },
};

export default config;
