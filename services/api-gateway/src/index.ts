import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import proxyRouter from "./routes/proxy";

dotenv.config();
const app = express();

app.use(helmet());
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", proxyRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
