import "dotenv/config";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10,
  queueLimit: Number(process.env.DB_QUEUE_LIMIT) || 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

export const connectDatabase = async () => {
  let connection;

  try {
    connection = await pool.getConnection();
    await connection.ping();
    console.log("MySQL database connected successfully");
  } catch (error) {
    console.error("MySQL database connection failed:", error);
    throw error;
  } finally {
    connection?.release();
  }
};

export default pool;
