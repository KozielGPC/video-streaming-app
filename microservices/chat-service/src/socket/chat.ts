import { Server, Socket } from "socket.io";
import { redisClient } from "../redis";

function setupChat(io: Server) {
  // Subscribe to Redis channel for chat messages
  const CHANNEL = "chat:messages";

  // Redis pub/sub: subscribe to messages from other instances
  const subscriber = redisClient.duplicate();
  subscriber.connect().then(() => {
    subscriber.subscribe(CHANNEL, (message: string) => {
      // Broadcast to all connected clients
      io.emit("chat:message", JSON.parse(message));
    });
  });

  io.on("connection", (socket: Socket) => {
    // Listen for chat messages from this client
    socket.on("chat:message", async (msg: { user?: string; text: string }) => {
      // Optionally: validate and sanitize msg here
      const chatMsg = {
        user: msg.user || "anonymous",
        text: msg.text,
        timestamp: Date.now(),
      };
      // Publish to Redis so all instances get the message
      await redisClient.publish(CHANNEL, JSON.stringify(chatMsg));
      // Optionally: store in MongoDB here
    });
  });
}

export default setupChat;
