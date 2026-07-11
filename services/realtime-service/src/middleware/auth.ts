import { Socket } from "socket.io";
import jwt, { JwtPayload } from "jsonwebtoken";

export const socketAuth = (socket: Socket, next: (err?: Error) => void) => {
  const authHeader = socket.handshake.auth.token;
  const token = authHeader?.split(" ")[1];
  if (!token) return next(new Error("Unauthorized"));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    socket.data.hospitalId = decoded.hospitalId;
    socket.data.role = decoded.role;

    next();
  } catch (err) {
    return next(new Error("Invalid or expired token"));
  }
};
