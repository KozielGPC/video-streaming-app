import "dotenv/config";
import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import connectMongo from "./storage/mongo";
import { connectRedis, redisClient } from "./redis";
import setupChat from "./socket/chat";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

// Health check endpoints
app.get("/healthz", (_req: any, res: any) => res.send("OK"));
app.get("/readyz", (_req: any, res: any) => res.send("READY"));

// Socket.io connection handler (to be expanded)
io.on("connection", (socket: Socket) => {
  console.log("A user connected:", socket.id);
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

async function start() {
  await connectMongo();
  await connectRedis();
  setupChat(io);
  server.listen(PORT, () => {
    console.log(`Chat service listening on port ${PORT}`);
  });
}

start();
