import { Router } from "express";
import {
  loginController,
  registerController,
} from "../controller/auth.controller.js";
const authRoute = Router();
authRoute.post("/register", registerController);
authRoute.post("/login", loginController);
export default authRoute;
