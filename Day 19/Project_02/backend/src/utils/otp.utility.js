import { populate } from "dotenv";
import pool from "../db/pool.db.js";
import { getHashString, verifyHashString } from "../utils/bcryp.utility.js";

export async function generateAndSendOtp(user_id) {
  const connection = await pool.getConnection();
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await getHashString(otp);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    const query = `
      INSERT INTO user_otp
      (user_id, otp_code, expires_at)
      VALUES (?, ?, ?)
    `;
    await connection.execute(query, [user_id, hashedOtp, expiresAt]);
    return {
      success: true,
      message: "OTP generated successfully",
      otp,
    };
  } catch (e) {
    console.error("Error generating OTP:", e);
    throw e;
  } finally {
    connection.release();
  }
}
export async function verifyOtp(otp, userId) {
  let connection;

  try {
    if (otp === undefined || otp === null) {
      return {
        success: false,
        message: "OTP is required",
      };
    }

    if (userId === undefined || userId === null) {
      return {
        success: false,
        message: "User ID is required",
      };
    }

    connection = await pool.getConnection();

    const query = `
      SELECT otp_id, otp_code, expires_at
      FROM user_otp
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT 1
    `;

    const [rows] = await connection.execute(query, [userId]);

    if (rows.length === 0) {
      return {
        success: false,
        message: "OTP not found",
      };
    }

    const otpRecord = rows[0];

    if (new Date(otpRecord.expires_at) < new Date()) {
      return {
        success: false,
        message: "OTP has expired",
      };
    }

    const isValid = await verifyHashString(otp.toString(), otpRecord.otp_code);

    if (!isValid) {
      return {
        success: false,
        message: "Invalid OTP",
      };
    }

    await connection.execute(
      `
        DELETE FROM user_otp
        WHERE otp_id = ?
      `,
      [otpRecord.otp_id]
    );

    return {
      success: true,
      message: "OTP verified successfully",
      userId,
    };
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
