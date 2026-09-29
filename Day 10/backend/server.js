import { configDotenv } from "dotenv";
import http from "http";
import app from "./src/app.js";
import createConnection from "./src/db/pool.db.js";
configDotenv();
const port = process.env.PORT || 1010;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
