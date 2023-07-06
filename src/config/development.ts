import dotenv from "dotenv";
import { Config } from ".";
dotenv.config();

const config: Config = {
  app: {
    env: "development",
    name: "bus_booking_platform_server",
    port: (process.env.PORT as unknown as number) || 8080,
  },
  auth: {
    secret: process.env.JWT_SECRET || "00606060",
    expiresIn : "1d"
  },
  db: {
    uri: process.env.DEV_MONGO_URI || "",
  },
};

export default config;
