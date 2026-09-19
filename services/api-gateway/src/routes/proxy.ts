import { Router } from "express";
import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware";
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
    pathRewrite: { "^/": "/api/v1/patients/" },
    on: {
      proxyReq: (proxyReq, req) => {
        fixRequestBody(proxyReq, req);
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
    pathRewrite: { "^/": "/api/v1/doctors/" },
    on: {
      proxyReq: (proxyReq, req) => {
        fixRequestBody(proxyReq, req);
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
    pathRewrite: { "^/": "/api/v1/appointments/" },
    on: {
      proxyReq: (proxyReq, req) => {
        fixRequestBody(proxyReq, req);
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
    on: {
      proxyReq: (proxyReq, req) => {
        fixRequestBody(proxyReq, req);
      },
    },
  })
);

route.use(
  "/hospital",
  createProxyMiddleware({
    target: SERVICES.AUTH,
    changeOrigin: true,
    on: {
      proxyReq: (proxyReq, req) => {
        fixRequestBody(proxyReq, req);
      },
    },
  })
);

route.use(
  "/ai-agent",
  authMiddleware,
  createProxyMiddleware({
    target: SERVICES.AI_AGENT,
    changeOrigin: true,
    pathRewrite: { "^/optimize-queue": "/api/queue/optimize" },
    on: {
      proxyReq: (proxyReq, req) => {
        fixRequestBody(proxyReq, req);
        proxyReq.setHeader("X-Hospital-Id", req.hospitalId || "");
      },
    },
  })
);

export default route;
