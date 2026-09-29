import { Router } from "express";
import loginController from "../controllers/auth/login.controller.js";
const authRouter = Router();
authRouter.post("/login", loginController);
export default authRouter;
