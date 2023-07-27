import express from "express";
import {
  getAllStations,
  getStationById,
  addStation,
  updateStation,
  deleteStation,
} from "../controllers/station.controller";

const stationRouter = express.Router();

// Route to get all stations
stationRouter.get("/", getAllStations);

// Route to get a single station by ID
stationRouter.get("/:id", getStationById);

// Route to add a new station
stationRouter.post("/", addStation);

// Route to update a station
stationRouter.put("/:id", updateStation);

// Route to delete a station
stationRouter.delete("/:id", deleteStation);

export default stationRouter;
