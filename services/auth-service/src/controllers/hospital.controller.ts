import bcrypt from "bcrypt";
import prisma from "../config/db.js";
import { hospitalSchema } from "../validations/zod.js";

export const registerController = async (req: any, res: any) => {
  const schema = hospitalSchema.safeParse(req.body);

  if (!schema.success) {
    return res.status(400).json({
      message: "Invalid input",
      errors: schema.error.flatten(),
    });
  }

  const { name, address, contact, user } = schema.data;
  const { email, password, name: userName } = user;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "An account with this email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await prisma.$transaction(async (tx) => {
      const hospital = await tx.hospital.create({
        data: { name, address, contact },
      });

      const admin = await tx.user.create({
        data: {
          name: userName,
          email,
          password: hashedPassword,
          role: "ADMIN",
          hospitalId: hospital.id,
        },
      });

      return { hospital, admin };
    });

    return res.status(201).json({
      message: "Hospital registered successfully",
      hospitalId: result.hospital.id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
