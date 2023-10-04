import dotenv from "dotenv";
import { Config } from ".";
dotenv.config();

const config: Config = {
  app: {
    env: "development",
    name: "molidom",
    port: (process.env.PORT as unknown as number) || 5000,
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
};

export default config;
