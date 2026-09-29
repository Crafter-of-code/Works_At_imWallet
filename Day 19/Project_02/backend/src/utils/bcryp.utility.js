import bcrypt from "bcrypt";
export async function getHashString(payload) {
  const string = bcrypt.hash(payload, 10);
  return string;
}
export async function verifyHashString(payload, hashPayload) {
  const result = bcrypt.compare(payload, hashPayload);
  return result;
}
