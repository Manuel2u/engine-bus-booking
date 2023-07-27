import { Request, Response } from "express";
import LocationModel, { ILocation } from "../model/location.model";
import UserModel from "../model/user.model";

export async function addLocation(req: Request, res: Response) {
  try {
    const { country, name, createdBy } = req.body;

    // Check if the user exists and has the required role
    console.log(createdBy);

    const user = await UserModel.findById(createdBy);
    if (!user || !(user.role === "SUPERADMIN" || user.role === "ADMIN")) {
      return res.status(403).json({
        error: "Unauthorized: Only SUPERADMIN or ADMIN can create locations",
      });
    }

    const location: ILocation = new LocationModel({
      country,
      name,
      createdBy,
    });
    const savedLocation = await location.save();
    return res.status(201).json(savedLocation);
  } catch (err) {
    return res.status(500).json({ error: "Failed to add location" });
  }
}

// Controller function to delete a location
export async function deleteLocation(req: Request, res: Response) {
  try {
    const locationId = req.params.id;
    const deletedLocation = await LocationModel.findByIdAndDelete(locationId);
    if (!deletedLocation) {
      return res.status(404).json({ error: "Location not found" });
    }
    return res.status(200).json(deletedLocation);
  } catch (err) {
    return res.status(500).json({ error: "Failed to delete location" });
  }
}

// Controller function to update a location
export async function updateLocation(req: Request, res: Response) {
  try {
    const locationId = req.params.id;
    const updates = req.body;
    const updatedLocation = await LocationModel.findByIdAndUpdate(
      locationId,
      updates,
      { new: true }
    );
    if (!updatedLocation) {
      return res.status(404).json({ error: "Location not found" });
    }
    return res.status(200).json(updatedLocation);
  } catch (err) {
    return res.status(500).json({ error: "Failed to update location" });
  }
}

// Controller function to fetch all locations
export async function getAllLocations(req: Request, res: Response) {
  try {
    const locations = await LocationModel.find();
    return res.status(200).json(locations);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch locations" });
  }
}

// Controller function to fetch a single location by ID
export async function getLocationById(req: Request, res: Response) {
  try {
    const locationId = req.params.id;
    const location = await LocationModel.findById(locationId);
    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }
    return res.status(200).json(location);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch location" });
  }
}
