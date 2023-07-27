import { Request, Response } from "express";
import StationModel, { IStation } from "../model/station.model";
import UserModel from "../model/user.model";
import LocationModel, { ILocation } from "../model/location.model";

// Controller function to get all stations
export async function getAllStations(req: Request, res: Response) {
  try {
    const stations = await StationModel.find();
    return res.status(200).json(stations);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch stations" });
  }
}

// Controller function to get a single station by ID
export async function getStationById(req: Request, res: Response) {
  try {
    const stationId = req.params.id;
    const station = await StationModel.findById(stationId);
    if (!station) {
      return res.status(404).json({ error: "Station not found" });
    }
    return res.status(200).json(station);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch station" });
  }
}

// Controller function to add a new station
export async function addStation(req: Request, res: Response) {
  try {
    const { name, locationId, createdBy } = req.body;
    console.log(createdBy);
    // Check if the user exists and has the required role
    const user = await UserModel.findById(createdBy);
    if (!user || !(user.role === "SUPERADMIN" || user.role === "ADMIN")) {
      return res.status(403).json({
        error: "Unauthorized: Only SUPERADMIN or ADMIN can add stations",
      });
    }

    // Check if the location exists
    const location = await LocationModel.findById(locationId);
    if (!location) {
      return res.status(400).json({ error: "Location not found" });
    }

    const station: IStation = new StationModel({
      name,
      location: locationId,
      createdBy,
    });
    const savedStation = await station.save();
    return res.status(201).json(savedStation);
  } catch (err) {
    return res.status(500).json({ error: "Failed to add station" });
  }
}

// Controller function to update a station
export async function updateStation(req: Request, res: Response) {
  try {
    const stationId = req.params.id;
    const updates = req.body;

    // Check if the user exists and has the required role
    const user = await UserModel.findById(updates.createdBy);
    if (!user || !(user.role === "SUPERADMIN" || user.role === "ADMIN")) {
      return res.status(403).json({
        error: "Unauthorized: Only SUPERADMIN or ADMIN can update stations",
      });
    }

    // Check if the location exists
    if (updates.locationId) {
      const location = await LocationModel.findById(updates.locationId);
      if (!location) {
        return res.status(400).json({ error: "Location not found" });
      }
    }

    const updatedStation = await StationModel.findByIdAndUpdate(
      stationId,
      updates,
      { new: true }
    );
    if (!updatedStation) {
      return res.status(404).json({ error: "Station not found" });
    }
    return res.status(200).json(updatedStation);
  } catch (err) {
    return res.status(500).json({ error: "Failed to update station" });
  }
}

// Controller function to delete a station
export async function deleteStation(req: Request, res: Response) {
  try {
    const stationId = req.params.id;

    // Check if the user exists and has the required role
    const user = await UserModel.findById(req.body.createdBy);
    if (!user || !(user.role === "SUPERADMIN" || user.role === "ADMIN")) {
      return res.status(403).json({
        error: "Unauthorized: Only SUPERADMIN or ADMIN can delete stations",
      });
    }

    const deletedStation = await StationModel.findByIdAndDelete(stationId);
    if (!deletedStation) {
      return res.status(404).json({ error: "Station not found" });
    }
    return res.status(200).json(deletedStation);
  } catch (err) {
    return res.status(500).json({ error: "Failed to delete station" });
  }
}
