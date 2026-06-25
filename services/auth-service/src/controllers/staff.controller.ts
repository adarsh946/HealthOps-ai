import bcrypt from "bcrypt";
import prisma from "../config/db.js";
import { createStaffSchema } from "../validations/zod.js";

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

    const hospitalId = req.user.hospitalId;
    const hashedPassword = await bcrypt.hash(schema.data.password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: schema.data.name,
        email: schema.data.email,
        password: hashedPassword,
        role: schema.data.role,
        hospitalId,
      },
    });

    return res.status(201).json({
      message: "Staff account created successfully",
      userId: newUser.id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllStaffController = async (req: any, res: any) => {
  const hospitalId = req.user.hospitalId;

  if (!hospitalId) {
    return res.status(401).json({
      message: "Unauthorised request",
    });
  }

  try {
    const users = await prisma.user.findMany({
      where: { hospitalId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
      },
    });

    return res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deactivateStaffController = async (req: any, res: any) => {
  const { id } = req.params;
  const hospitalId = req.user.hospitalId;

  if (!id) {
    return res.status(400).json({ message: "Staff ID is required" });
  }

  try {
    await prisma.user.update({
      where: {
        id,
        hospitalId,
      },
      data: { status: "DEACTIVATED" },
    });

    return res.status(200).json({
      message: "Staff member deactivated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(404).json({
      message: "Staff member not found or does not belong to your hospital",
    });
  }
};
