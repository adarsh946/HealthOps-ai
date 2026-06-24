import { email, z } from "zod";

export const createStaffSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/\d/, "Password must contain at least one digit")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
  role: z.enum(["ADMIN", "DOCTOR", "NURSE", "RECEPTIONIST"]),
});

export const signinSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const hospitalSchema = z.object({
  name: z.string(),
  address: z.string(),
  contact: z.string().min(10).max(15),
  user: z.object({
    name: z.string(),
    email: z.email(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one digit")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
  }),
});
