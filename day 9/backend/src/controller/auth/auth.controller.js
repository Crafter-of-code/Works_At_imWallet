import bcrypt from "bcrypt";
import pool from "../db/connectin.db.js";
import jwt from "jsonwebtoken";
import {
  registerUserRepo,
  getUserCredentailByUserEmail,
} from "../repository/auth.repository.js";
import fs from "fs";
const privateKey = fs.readFileSync("./keys/jwt-private.pem", "utf8");
async function registerController(req, res) {
  try {
    const { userName, userEmail, userPassword } = req.body;
    if (!userName || !userEmail || !userPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const hashedPassword = await bcrypt.hash(userPassword, 10);
    const data = await registerUserRepo(userName, userEmail, hashedPassword);
    console.log("3");
    return res
      .status(201)
      .json({ status: true, message: "Account created successfully" });
  } catch (error) {
    res
      .status(409)
      .json({ status: false, message: "account already existed." });
  }
}
const loginController = async (req, res, next) => {
  console.log("BODY:", req.body);

  try {
    const { userEmail, userPassword } = req.body;

    const userData = await getUserCredentailByUserEmail(userEmail);

    console.log("USER:", userData);

    if (userData.length === 0) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    const data = userData[0];

    const passwordMatch = await bcrypt.compare(
      userPassword,
      data.user_password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        status: false,
        message: "Your credential is incorrect",
      });
    }

    // Generate ES256 JWT
    const token = jwt.sign(
      {
        sub: String(data.user_id),
        email: data.user_email,
      },
      privateKey,
      {
        algorithm: "ES256",
        expiresIn: "15m",
      }
    );

    console.log("TOKEN:", token);

    return res.status(200).json({
      status: true,
      message: "Welcome",
      token: token,
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return res.status(500).json({
      status: false,
      message: "We are facing some internal error at this time",
    });
  }
};

export { loginController, registerController };
