import bcrypt from "bcrypt";
import prisma from "../config/db.js";
import { createStaffSchema } from "../validations/zod.js";

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
