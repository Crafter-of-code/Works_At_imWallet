import pool from "../db/connectin.db.js";
async function registerUserRepo(userName, userEmail, userPassword) {
  const registerUserSqlString =
    "INSERT INTO users (user_name, user_email, user_password) VALUES (?, ?, ?)";
  const [result] = await pool.execute(registerUserSqlString, [
    userName,
    userEmail,
    userPassword,
  ]);
  return {
    userId: result.insertId,
    userName,
    userEmail,
    userRole: "user",
  };
}
async function getUserCredentailByUserEmail(userEmail) {
  const findUserCreadentialQuery = "select * from users where user_email = ?";
  const [result] = await pool.execute(findUserCreadentialQuery, [userEmail]);
  return result;
}
export { registerUserRepo, getUserCredentailByUserEmail };
