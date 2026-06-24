import { Router } from "express";
import {
  logoutController,
  signinController,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const route = Router();

route.post("/signin", signinController);
route.post("/signout", authMiddleware, logoutController);

export default route;
