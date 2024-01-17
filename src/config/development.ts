import dotenv from "dotenv";
import { Config } from ".";
dotenv.config();

const config: Config = {
  app: {
    env: "development",
    name: "molidom",
    port: (process.env.PORT as unknown as number) || 8080,
  },
  auth: {
    secret: process.env.JWT_SECRET || "00606060",
    expiresIn: "1d",
  },
  db: {
    uri: process.env.DEV_MONGO_URI || "",
  },
  mail: {
    username: process.env.MAILGUN_USERNAME || "",
    key: process.env.MAILGUN_API_KEY || "",
    domain: process.env.MAIL_DOMAIN || "",
  },
  payment: {
    secret_key: process.env.PAYMENT_SECRET || "",
    callback_url: process.env.PAYMENT_CALLBACK || "",
    timeout: (process.env.PAYMENT_TIMEOUT as unknown as number) || 120000,
    ips: ["52.31.139.75", "52.49.173.169", "52.214.14.220"],
  },
};

export default config;
