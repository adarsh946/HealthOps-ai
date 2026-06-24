import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/db.js";
import { createStaffSchema, signinSchema } from "../validations/zod.js";

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
