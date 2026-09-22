import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Jwt token not found!",
    });
  }

  console.log(
    "Token received:",
    token?.substring(0, 20),
    "Secret length:",
    process.env.JWT_SECRET?.length
  );

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.hospitalId = decoded.hospitalId;
    req.role = decoded.role;
    next();
  } catch (err: any) {
    console.log(
      "JWT verification failed:",
      err.message,
      "Secret length:",
      process.env.JWT_SECRET?.length
    );
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
