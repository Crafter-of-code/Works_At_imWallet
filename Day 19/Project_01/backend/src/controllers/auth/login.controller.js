import pool from "../../db/connection.db.js";

async function loginController(req, res) {
  const { userPhoneNumber } = req.body;
  const query = "select * from user where userPhoneNumber = ?";
  try {
    const connection = await pool.getConnection();
    const result = await connection.execute(query, [userPhoneNumber]);
    if (result[0].length == 0) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "you are login successfully",
    });
  } catch (e) {
    console.log(e);
    console.log("we are facing problem which connecting to database");
    return res.status(500).json({
      status: true,
      message: "We are facing some error while communicating with our database",
    });
  }
}
export default loginController;
