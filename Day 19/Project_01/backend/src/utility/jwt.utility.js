import jwt from "jsonwebtoken";
const privateKey = fs.readFileSync(
  path.join(__dirname, "es512-private.pem"),
  "utf8"
);
const publicKey = fs.readFileSync(
  path.join(__dirname, "es512-public.pem"),
  "utf8"
);
export async function getSignedJwt(data) {
  return jwt.sign(data, privateKey, { algorithm: "ES512" });
}
export async function verifySignedJwt(token) {
  return jwt.verify(token, publicKey, { algorithms: "ES512" });
}
