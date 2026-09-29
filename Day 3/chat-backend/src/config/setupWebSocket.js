import { WebSocketServer } from "ws";
import chatController from "../controller/ChatController.js";

function setupWebSocket(server) {
  const wss = new WebSocketServer({
    server,
  });

  wss.on("connection", (socket, request) => {
    const url = new URL(request.url, `http://${request.headers.host}`);

    const email = url.searchParams.get("email");

    if (!email) {
      socket.close();
      return;
    }

    chatController.connect(socket, email);
  });

  return wss;
}

export default setupWebSocket;
