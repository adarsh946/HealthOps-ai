import { Router } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { authMiddleware } from "../middleware/auth";
import { requireRole } from "../middleware/rbac";
import { SERVICES } from "../config/services";

const route = Router();

route.use(
  "/patients",
  authMiddleware,
  requireRole("doctor", "receptionist", "admin"),
  createProxyMiddleware({
    target: SERVICES.PATIENT,
    changeOrigin: true,
    on: {
      proxyReq: (proxyReq, req) => {
        proxyReq.setHeader("X-Hospital-Id", req.hospitalId || "");
      },
    },
  })
);

route.use(
  "/doctors",
  authMiddleware,
  requireRole("admin"),
  createProxyMiddleware({
    target: SERVICES.DOCTOR,
    changeOrigin: true,
    on: {
      proxyReq: (proxyReq, req) => {
        proxyReq.setHeader("X-Hospital-Id", req.hospitalId || "");
      },
    },
  })
);

route.use(
  "/appointments",
  authMiddleware,
  requireRole("doctor", "receptionist", "admin"),
  createProxyMiddleware({
    target: SERVICES.APPOINTMENT,
    changeOrigin: true,
    on: {
      proxyReq: (proxyReq, req) => {
        proxyReq.setHeader("X-Hospital-Id", req.hospitalId || "");
      },
    },
  })
);

route.use(
  "/auth",
  createProxyMiddleware({
    target: SERVICES.AUTH,
    changeOrigin: true,
  })
);

export default route;
