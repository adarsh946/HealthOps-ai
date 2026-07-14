import express from "express";
import http from "http";
import { initializeSocket, broadcastQueueUpdate } from "./socket";
import dotenv from "dotenv";

dotenv.config();

const expressApp = express();
expressApp.use(express.json());

// Internal HTTP endpoint for ai-agent-service to trigger broadcasts
expressApp.post("/broadcast/queue", (req: any, res: any) => {
  const { hospitalId, data } = req.body;
  if (!hospitalId || !data) {
    return res.status(400).json({ message: "hospitalId and data required" });
  }
  broadcastQueueUpdate(hospitalId, data);
  return res.json({ success: true });
});

const server = http.createServer(expressApp);
initializeSocket(server);

const PORT = process.env.PORT || 3003;
server.listen(PORT, () => {
  console.log(`Realtime service running on port ${PORT}`);
});
