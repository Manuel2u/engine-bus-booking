import production from "./production";
import development from "./development";
import dotenv from "dotenv";
dotenv.config();

export interface Config {
  app: {
    env: "development" | "test" | "production";
    port: number;
    name: string;
  };

  db: {
    uri: string;
  };
  auth: {
    secret: string;
    expiresIn: string;
  };
  mail: {
    key: string;
    domain: string;
    username: string;
  };
  payment: {
    secret_key: string;
    callback_url: string;
    timeout: number;
    ips: string[];
  };
}

export const config: Config =
  process.env.NODE_ENV === "production" ? production : development;
