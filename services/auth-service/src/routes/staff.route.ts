import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";
import {
  createStaffController,
  getAllStaffController,
  deactivateStaffController,
} from "../controllers/staff.controller.js";

const route = Router();

route.post(
  "/create",
  authMiddleware,
  requireRole(["ADMIN"]),
  createStaffController
);
route.get(
  "/all",
  authMiddleware,
  requireRole(["ADMIN"]),
  getAllStaffController
);
route.put(
  "/:id/deactivate",
  authMiddleware,
  requireRole(["ADMIN"]),
  deactivateStaffController
);

export default route;
