import http from "http";
import { configDotenv } from "dotenv";
import app from "./src/app.js";
configDotenv();
const port = process.env.PORT;
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
