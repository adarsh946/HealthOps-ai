import dotenv from "dotenv";
dotenv.config();

export const SERVICES = {
  AUTH: process.env.AUTH_SERVICE_URL || "http://localhost:3001",
  PATIENT: process.env.PATIENT_SERVICE_URL || "http://localhost:8001",
  DOCTOR: process.env.DOCTOR_SERVICE_URL || "http://localhost:8002",
  APPOINTMENT: process.env.APPOINTMENT_SERVICE_URL || "http://localhost:8003",
  NOTIFICATION: process.env.NOTIFICATION_SERVICE_URL || "http://localhost:3002",
};
