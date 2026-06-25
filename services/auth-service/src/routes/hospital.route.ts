import { Router } from "express";
import { registerController } from "../controllers/hospital.controller.js";

const route = Router();

route.post("/register", registerController);

export default route;
