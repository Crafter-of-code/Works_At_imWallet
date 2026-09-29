import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const privateKey = fs.readFileSync(
  path.join(__dirname, "../../key/jwt_es256/private.pem"),
  "utf8"
);

const publicKey = fs.readFileSync(
  path.join(__dirname, "../../key/jwt_es256/public.pem"),
  "utf8"
);

export function createJsonWebToken(payload) {
  return jwt.sign(payload, privateKey, {
    algorithm: "ES256",
  });
}

export function verifyJsonWebToken(token) {
  try {
    const decoded = jwt.verify(token, publicKey, {
      algorithms: ["ES256"],
    });

    console.log("Valid Token Payload:", decoded);

    return decoded;
  } catch (err) {
    console.error("Invalid Token:", err.message);

    return null;
  }
}

export function getPayloadFromToken(token) {
  return jwt.decode(token);
}
