import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import authRoute from "./routes/auth.route.js";
import staffRoute from "./routes/staff.route.js";
import hospitalRoute from "./routes/hospital.route.js";

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true, // required for cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/staff", staffRoute);
app.use("/api/v1/hospital", hospitalRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
