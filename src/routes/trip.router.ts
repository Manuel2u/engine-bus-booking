import express from "express";
import * as tripController from "../controllers/trip.controller";

const router = express.Router();

router.post("/", tripController.addTrip);
router.delete("/:id", tripController.deleteTrip);
router.put("/:id", tripController.updateTrip);
router.get("/", tripController.getAllTrips);
router.get("/:id", tripController.getTripById);

export default router;
