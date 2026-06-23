import type { NextFunction, Request, Response } from "express";

const requireRole = (allowedRoles: string[]) => {
  const roleMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(400).json({
        message: "user not found!",
      });
    }

    const role = req.user?.role as string;
    if (allowedRoles.includes(role)) {
      next();
    } else {
      return res.status(403).json({
        message: "unauthorised",
      });
    }
  };

  return roleMiddleware;
};
