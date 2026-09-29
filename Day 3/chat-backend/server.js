import http from "http";

import app from "./src/app.js";
import setupWebSocket from "./src/config/setupWebSocket.js";

const port = process.env.PORT || 3000;

const server = http.createServer(app);

setupWebSocket(server);

server.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
