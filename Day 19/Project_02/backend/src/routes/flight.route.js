import { Router } from "express";
import {
  flightBookingController,
  getFlightInfoController,
} from "../controllers/services/flight.controller.js";
const flightRoute = Router();
flightRoute.post("/flight/search", getFlightInfoController);
flightRoute.post("/flight/booking", flightBookingController);
export default flightRoute;
