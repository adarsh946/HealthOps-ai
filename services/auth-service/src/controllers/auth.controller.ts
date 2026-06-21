import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/db.js";
import { createStaffSchema, signinSchema } from "../validations/zod.js";

// Called by an authenticated ADMIN to create a staff account
export const createStaffController = async (req: any, res: any) => {
  const schema = createStaffSchema.safeParse(req.body);

  if (!schema.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: schema.error.flatten(),
    });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: schema.data.email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists",
      });
    }

    // hospitalId comes from the logged-in admin's JWT, NOT the request body
    const hospitalId = req.user.hospitalId;

    const hashedPassword = await bcrypt.hash(schema.data.password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: schema.data.name,
        email: schema.data.email,
        password: hashedPassword,
        role: schema.data.role,
        hospitalId: hospitalId,
      },
    });

    res.status(201).json({
      message: "Staff account created successfully",
      userId: newUser.id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const signinController = async (req: any, res: any) => {
  const schema = signinSchema.safeParse(req.body);

  if (!schema.success) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: schema.data.email },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isValidPassword = await bcrypt.compare(
      schema.data.password,
      user.password
    );

    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user.id, hospitalId: user.hospitalId, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res
      .status(200)
      .json({ message: "Signed in successfully", role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to sign in" });
  }
};

export const logoutController = async (req: any, res: any) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};
