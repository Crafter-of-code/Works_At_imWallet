import bcrypt from "bcrypt";
export async function getHash(originalValue) {
  return bcrypt.hash(variable, 10);
}
export async function verifyHash(hashValue, originalValue) {
  return bcrypt.compare(originalValue, hashValue);
}
