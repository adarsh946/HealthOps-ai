import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import { socketAuth } from "./middleware/auth";

let io: Server;

export function initializeSocket(httpServer: HttpServer): Server {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ["websocket", "polling"],
    allowEIO3: true,
  });

  io.use(socketAuth);

  io.on("connection", (socket: Socket) => {
    console.log(`[socket] client connected: ${socket.id}`);

    const hospitalId = socket.data.hospitalId;
    socket.join(hospitalId);
    console.log(`[socket] ${socket.id} joined room: ${hospitalId}`);

    socket.on("disconnect", () => {
      console.log(`[socket] client disconnected: ${socket.id}`);
    });
  });

  return io;
}

export const broadcastQueueUpdate = (hospitalId: string, queueData: any) => {
  io.to(hospitalId).emit("queue_updated", queueData);
};
