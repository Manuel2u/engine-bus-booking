import { Request, Response } from "express";
import BusModel, { IBus } from "../model/bus.model";
import UserModel from "../model/user.model";

// Controller function to add a new bus
export async function addBus(req: Request, res: Response) {
  try {
    const { busNumber, capacity, createdBy } = req.body;

    // Check if the user exists and has the required role
    const user = await UserModel.findById(createdBy);
    if (!user || !(user.role === "SUPERADMIN" || user.role === "ADMIN")) {
      return res.status(403).json({
        error: "Unauthorized: Only SUPERADMIN or ADMIN can add a bus",
      });
    }

    const bus: IBus = new BusModel({
      busNumber,
      capacity,
      createdBy,
    });
    const savedBus = await bus.save();
    return res.status(201).json(savedBus);
  } catch (err) {
    return res.status(500).json({ error: "Failed to add bus" });
  }
}

// Controller function to delete a bus
export async function deleteBus(req: Request, res: Response) {
  try {
    const busId = req.params.id;
    const deletedBus = await BusModel.findByIdAndDelete(busId);
    if (!deletedBus) {
      return res.status(404).json({ error: "Bus not found" });
    }
    return res.status(200).json(deletedBus);
  } catch (err) {
    return res.status(500).json({ error: "Failed to delete bus" });
  }
}

// Controller function to update a bus
export async function updateBus(req: Request, res: Response) {
  try {
    const busId = req.params.id;
    const updates = req.body;
    const updatedBus = await BusModel.findByIdAndUpdate(busId, updates, {
      new: true,
    });
    if (!updatedBus) {
      return res.status(404).json({ error: "Bus not found" });
    }
    return res.status(200).json(updatedBus);
  } catch (err) {
    return res.status(500).json({ error: "Failed to update bus" });
  }
}

// Controller function to fetch all buses
export async function getAllBuses(req: Request, res: Response) {
  try {
    const buses = await BusModel.find();
    return res.status(200).json(buses);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch buses" });
  }
}

// Controller function to fetch a single bus by ID
export async function getBusById(req: Request, res: Response) {
  try {
    const busId = req.params.id;
    const bus = await BusModel.findById(busId);
    if (!bus) {
      return res.status(404).json({ error: "Bus not found" });
    }
    return res.status(200).json(bus);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch bus" });
  }
}
