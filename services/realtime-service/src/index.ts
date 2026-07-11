import http from "http";
import { initializeSocket } from "./soket";
import dotenv from "dotenv";
dotenv.config();

const app = http.createServer();

initializeSocket(app);

app.listen(process.env.PORT || 8000, () => {
  console.log(` Server running on port ${process.env.PORT}`);
});
