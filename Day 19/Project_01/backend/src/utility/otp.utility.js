import bcrypt from "bcrypt";
import { getHash, verifyHash } from "./bcrypt.utility.js";
import crypto from "crypto";
import pool from "../db/connection.db";
export async function setOtp(userId) {
  const random = random;
  const connection = await pool.getConnection();
  const query = `insert into userOtp (userId,otpCode) values (?,?) `;
  const otpCode = await getHash(getOtp);
  console.log("Your otp is: " + otpCode);
  try {
    const result = await connection.execute(query, [userId, otpCode]);
    if (result) true;
    else false;
  } catch (e) {
    console.log(e);
    return false;
  }
}
export async function verifyOtp(userId, userEnterOtp) {
  const connection = await pool.getConnection();
  const query =
    "SELECT otpCode FROM userOtp WHERE userId = 123 ORDER BY createdAt DESC LIMIT 1;";
  try {
    const result = await connection.execute(userId);
    const responseValue = await verifyHash(result, userEnterOtp);
    if (responseValue) {
      return;
    } else {
      return {
        status: true,
        message: "Your otp has been successfully verified",
      };
    }
  } catch (e) {
    console.log(e);
    return { status: false, message: "unable to verify the otp right now" };
  }
}
export async function getOtp() {
  return crypto.randomInt(100000, 1000000).toString();
}
