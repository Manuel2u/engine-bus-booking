import { Router } from "express";
import * as busController from "../controllers/bus.controller";

const router = Router();

// Route for adding a new bus
router.post("/", busController.addBus);

// Route for deleting a bus
router.delete("/:id", busController.deleteBus);

// Route for updating a bus
router.put("/:id", busController.updateBus);

// Route for fetching all buses
router.get("/", busController.getAllBuses);

// Route for fetching a single bus by ID
router.get("/:id", busController.getBusById);

export default router;
