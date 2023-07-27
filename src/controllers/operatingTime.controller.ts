import { Request, Response } from "express";
import OperatingTimeModel, {
  IOperatingTime,
} from "../model/operatingTime.model";
import UserModel from "../model/user.model";

// Controller function to add an operating time entry
export async function addOperatingTime(req: Request, res: Response) {
  try {
    const { time, createdBy } = req.body;

    // Check if the user exists and has the required role
    const user = await UserModel.findById(createdBy);
    if (!user || !(user.role === "SUPERADMIN" || user.role === "ADMIN")) {
      return res.status(403).json({
        error: "Unauthorized: Only SUPERADMIN or ADMIN can add operating times",
      });
    }

    // Create a Date object using the current date and the time of the day
    const currentDate = new Date();
    const [hours, minutes] = time.split(":");
    const operatingTime: IOperatingTime = new OperatingTimeModel({
      time: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        +hours,
        +minutes
      ),
      createdBy,
    });

    const savedOperatingTime = await operatingTime.save();
    return res.status(201).json(savedOperatingTime);
  } catch (err) {
    return res.status(500).json({ error: "Failed to add operating time" });
  }
}

// Controller function to fetch all operating time entries
export async function getAllOperatingTimes(req: Request, res: Response) {
  try {
    const operatingTimes = await OperatingTimeModel.find();
    return res.status(200).json(operatingTimes);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch operating times" });
  }
}

// Controller function to fetch a single operating time entry by ID
export async function getOperatingTimeById(req: Request, res: Response) {
  try {
    const operatingTimeId = req.params.id;
    const operatingTime = await OperatingTimeModel.findById(operatingTimeId);
    if (!operatingTime) {
      return res.status(404).json({ error: "Operating time not found" });
    }
    return res.status(200).json(operatingTime);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch operating time" });
  }
}

// Controller function to update an operating time entry
export async function updateOperatingTime(req: Request, res: Response) {
  try {
    const operatingTimeId = req.params.id;
    const updates = req.body;
    const updatedOperatingTime = await OperatingTimeModel.findByIdAndUpdate(
      operatingTimeId,
      updates,
      { new: true }
    );
    if (!updatedOperatingTime) {
      return res.status(404).json({ error: "Operating time not found" });
    }
    return res.status(200).json(updatedOperatingTime);
  } catch (err) {
    return res.status(500).json({ error: "Failed to update operating time" });
  }
}

// Controller function to delete an operating time entry
export async function deleteOperatingTime(req: Request, res: Response) {
  try {
    const operatingTimeId = req.params.id;
    const deletedOperatingTime = await OperatingTimeModel.findByIdAndDelete(
      operatingTimeId
    );
    if (!deletedOperatingTime) {
      return res.status(404).json({ error: "Operating time not found" });
    }
    return res.status(200).json(deletedOperatingTime);
  } catch (err) {
    return res.status(500).json({ error: "Failed to delete operating time" });
  }
}
