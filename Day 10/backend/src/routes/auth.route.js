import { Router } from "express";
import {
  loginUserController,
  registerUserController,
  verifyUserOtpController,
  logoutUserController,
} from "../controllers/auth/auth.controller.js";
const authRouter = Router();
authRouter.post("/auth/register", registerUserController);
authRouter.post("/auth/login", loginUserController);
authRouter.post("/auth/verify-otp", verifyUserOtpController);
authRouter.post("/auth/logout", logoutUserController);
export default authRouter;
