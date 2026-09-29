import pool from "../../db/pool.db.js";
import {
  createJsonWebToken,
  verifyJsonWebToken,
} from "../../utils/jwt.utility.js";
import { generateAndSendOtp, verifyOtp } from "../../utils/Otp.utility.js";

export async function registerUserController(req, res) {
  const {
    userFirstName,
    userMiddleName,
    userLastName,
    userPhoneNumber,
    userEmail,
  } = req.body;

  const connection = await pool.getConnection();

  const query = `
    INSERT INTO user (
      user_first_name,
      user_middle_name,
      user_last_name,
      user_email,
      user_phone_number
    )
    VALUES (?, ?, ?, ?, ?)
  `;

  try {
    const [result] = await connection.execute(query, [
      userFirstName,
      userMiddleName,
      userLastName,
      userEmail,
      userPhoneNumber,
    ]);

    const userId = result.insertId;

    const otpResponse = await generateAndSendOtp(userId);

    console.log("Generated OTP:", otpResponse.otp);

    return res.status(201).json({
      status: true,
      message: "Your account has been successfully created",
    });
  } catch (e) {
    console.error(e);

    return res.status(500).json({
      status: false,
      message: "Facing problem while creating your account",
    });
  } finally {
    connection.release();
  }
}

export async function loginUserController(req, res) {
  const { userPhoneNumber } = req.body;

  const connection = await pool.getConnection();

  const query = `
    SELECT
      user_id,
      user_email,
      user_first_name,
      user_middle_name,
      user_last_name,
      user_phone_number
    FROM user
    WHERE user_phone_number = ?
  `;

  try {
    const [rows] = await connection.execute(query, [userPhoneNumber]);

    if (rows.length === 0) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    const user = rows[0];

    const otpResponse = await generateAndSendOtp(user.user_id);

    console.log("Generated OTP:", otpResponse.otp);

    return res.status(200).json({
      status: true,
      message: "OTP sent successfully",
      userId: user.user_id,
      otp: otpResponse.otp,
    });
  } catch (e) {
    console.error(e);

    return res.status(500).json({
      status: false,
      message: "Facing problem while logging in",
    });
  } finally {
    connection.release();
  }
}

export async function verifyUserOtpController(req, res) {
  const { userPhoneNumber, otp } = req.body;

  try {
    if (!userPhoneNumber || !otp) {
      return res.status(400).json({
        status: false,
        message: "User ID and OTP are required",
      });
    }
    const connection = await pool.getConnection();
    const query = "select * from user where user_phone_number = ?";
    const result = await connection.execute(query, [userPhoneNumber]);
    if (!result) {
      return response;
    }
    console.log(result[0][0]);
    const response = await verifyOtp(otp, result[0][0].user_id);
    if (!response.success) {
      return res.status(400).json({
        status: false,
        message: response.message,
      });
    }
    const token = createJsonWebToken(result[0][0].user_email);
    return res.status(200).json({
      status: true,
      message: "OTP verified successfully",
      token: token,
    });
  } catch (e) {
    console.error(e);

    return res.status(500).json({
      status: false,
      message: "Facing problem while verifying OTP",
    });
  }
}
export async function logoutUserController(req, res) {
  let data;

  try {
    let token = req.headers.authorization.slice(7);
    const verify = verifyJsonWebToken(token);
    if (verify) {
      data = {
        status: true,
        message: "successfully logged out",
      };
    } else {
      data = {
        status: true,
        message: "You have unauthorized access",
      };
    }
  } catch (e) {
    console.log(e);
    data = {
      status: false,
      message: "facing error while logging you out",
    };
  }
  res.status(200).json(data);
}
