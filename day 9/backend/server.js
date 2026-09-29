import "dotenv/config";
import http from "http";
import app from "./src/app.js";
import { connectDatabase } from "./src/db/connectin.db.js";

const port = process.env.PORT;

const server = http.createServer(app);

const startServer = async () => {
  try {
    server.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
