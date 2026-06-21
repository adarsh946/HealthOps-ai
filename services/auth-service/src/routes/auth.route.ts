import { Router } from "express";
import {
  createStaffController,
  signinController,
} from "../controllers/auth.controller.js";

const route = Router();

route.post("/signup", createStaffController);
route.post("/signin", signinController);

export default route;
