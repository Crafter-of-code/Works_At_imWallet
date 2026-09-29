const users = new Map();

class ChatController {
  connect(socket, email) {
    users.set(email, socket);

    console.log(`${email} connected`);

    socket.send(
      JSON.stringify({
        type: "connected",
        message: "Connected to chat server",
      })
    );

    socket.on("message", (data) => {
      const message = JSON.parse(data.toString());

      const receiverSocket = users.get(message.receiver);

      if (!receiverSocket) {
        socket.send(
          JSON.stringify({
            type: "error",
            message: "User is offline",
          })
        );

        return;
      }

      receiverSocket.send(
        JSON.stringify({
          type: "message",
          sender: email,
          message: message.message,
        })
      );
    });

    socket.on("close", () => {
      users.delete(email);

      console.log(`${email} disconnected`);
    });
  }
}

export default new ChatController();
