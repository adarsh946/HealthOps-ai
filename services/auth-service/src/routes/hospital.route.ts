import { Router } from "express";

const route = Router();

route.post("/register", registerController);

export default route;
