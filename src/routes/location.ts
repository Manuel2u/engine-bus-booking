import express from "express";
import { ADD_LOCATION, GET_ALL } from "../controllers/location.controller";
// import {
//   addLocation,
//   deleteLocation,
//   updateLocation,
//   getAllLocations,
//   getLocationById,
// } from "../controllers/location.controller";

const router = express.Router();

// Route to add a new location
router.post("/", ADD_LOCATION);

router.get("/", GET_ALL);
// // Route to delete a location
// router.delete("/:id", deleteLocation);

// // Route to update a location
// router.put("/:id", updateLocation);

// // Route to fetch all locations
// router.get("/", getAllLocations);

// // Route to fetch a single location by ID
// router.get("/:id", getLocationById);

export default router;
