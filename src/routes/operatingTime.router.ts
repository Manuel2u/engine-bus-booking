import express from "express";
import {
  addOperatingTime,
  getAllOperatingTimes,
  getOperatingTimeById,
  updateOperatingTime,
  deleteOperatingTime,
} from "../controllers/operatingTime.controller";

const operatingTimeRouter = express.Router();

// Routes for operating time endpoints
operatingTimeRouter.post("/add", addOperatingTime); // Add an operating time entry
operatingTimeRouter.get("/all", getAllOperatingTimes); // Fetch all operating time entries
operatingTimeRouter.get("/:id", getOperatingTimeById); // Fetch a single operating time entry by ID
operatingTimeRouter.put("/:id", updateOperatingTime); // Update an operating time entry by ID
operatingTimeRouter.delete("/:id", deleteOperatingTime); // Delete an operating time entry by ID

export default operatingTimeRouter;
