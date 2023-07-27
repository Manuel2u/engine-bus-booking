import { Request, Response } from "express";
import TripModel, { ITrip } from "../model/trip.model";
import { IBus } from "../model/bus.model";
import UserModel from "../model/user.model";

export async function addTrip(req: Request, res: Response) {
  try {
    const {
      origin,
      destination,
      reportingTime,
      departureTime,
      arrivalTime,
      price,
      bus,
      createdBy,
    } = req.body;

    // Check if the user exists and has the required role
    const user = await UserModel.findById(createdBy);
    if (!user || !(user.role === "SUPERADMIN" || user.role === "ADMIN")) {
      return res.status(403).json({
        error: "Unauthorized: Only SUPERADMIN or ADMIN can add trips",
      });
    }

    const trip: ITrip = new TripModel({
      origin,
      destination,
      reportingTime,
      departureTime,
      arrivalTime,
      price,
      bus,
      seatsAvailable: (bus as IBus).capacity,
      createdBy,
    });

    const savedTrip = await trip.save();
    return res.status(201).json(savedTrip);
  } catch (err) {
    return res.status(500).json({ error: "Failed to add trip" });
  }
}

export async function deleteTrip(req: Request, res: Response) {
  try {
    const tripId = req.params.id;
    const deletedTrip = await TripModel.findByIdAndDelete(tripId);
    if (!deletedTrip) {
      return res.status(404).json({ error: "Trip not found" });
    }
    return res.status(200).json(deletedTrip);
  } catch (err) {
    return res.status(500).json({ error: "Failed to delete trip" });
  }
}

export async function updateTrip(req: Request, res: Response) {
  try {
    const tripId = req.params.id;
    const updates = req.body;
    const updatedTrip = await TripModel.findByIdAndUpdate(tripId, updates, {
      new: true,
    });
    if (!updatedTrip) {
      return res.status(404).json({ error: "Trip not found" });
    }
    return res.status(200).json(updatedTrip);
  } catch (err) {
    return res.status(500).json({ error: "Failed to update trip" });
  }
}

export async function getAllTrips(req: Request, res: Response) {
  try {
    const trips = await TripModel.find();
    return res.status(200).json(trips);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch trips" });
  }
}

export async function getTripById(req: Request, res: Response) {
  try {
    const tripId = req.params.id;
    const trip = await TripModel.findById(tripId);
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }
    return res.status(200).json(trip);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch trip" });
  }
}
