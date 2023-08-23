import { Router } from "express";
import {
  CREATE_ONE,
  DECOMMISSION_ONE,
  GET_ALL,
  GET_ONE,
  UPDATE_ONE,
} from "../controllers/bus.controller";
import { isAdmin, verifyAccessToken } from "../middlewares/verification";

const router = Router();

router.post("/create-one", verifyAccessToken, isAdmin, CREATE_ONE);

router.post("/get-one", verifyAccessToken, isAdmin, GET_ONE);

router.post("/get-all", verifyAccessToken, isAdmin, GET_ALL);

router.post("/update-one", verifyAccessToken, isAdmin, UPDATE_ONE);

router.post("/decomission-one", verifyAccessToken, isAdmin, DECOMMISSION_ONE);

export default router;
