import dotenv from "dotenv"
dotenv.config()

import { config } from "./config"

import { start } from "./start"

start(config)