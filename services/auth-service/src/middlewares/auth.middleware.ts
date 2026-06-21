import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

interface customJwtPayload extends JwtPayload {
  userId: string;
  hospitalId: string;
  role: string;
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Token not found",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as customJwtPayload;
    if (!decoded) {
      return res.status(401).json({
        message: "Invalid Token",
      });
    }

    req.user = {
      id: decoded.userId,
      hospitalId: decoded.hospitalId,
      role: decoded.role,
    };
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};

export default authMiddleware;
