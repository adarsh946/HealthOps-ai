import type { Request, Response, NextFunction } from "express";

export const requireRole = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.role;

    if (!role) {
      return res.status(401).json({
        message: "User is not identified!",
      });
    }

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({
        message: "Access denied. Insufficient permissions.",
      });
    }

    next();
  };
};
