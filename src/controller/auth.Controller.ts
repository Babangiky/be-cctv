import UserModel from "../models/user.models.js";
import jwt from "jsonwebtoken";

import type { Request, Response } from "express";

export const loginAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const admin = await UserModel.findOne({ email }).select("+password").exec();
    if (!admin)
      return res.status(404).json({ message: "Admin tidak ditemukan " });

    if (admin.role !== "admin")
      return res.status(403).json({ message: "Akses ditolak, bukan admin" });
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Password salah" });

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );
    res
      .status(200)
      .json({
        token,
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
        },
      });
  } catch (error) {
     console.error(error); 
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const registerAdmin = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const existingAdmin = await UserModel.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    const admin = new UserModel({
      name,
      email,
      password,
      role: "admin", 
    });

    await admin.save();

    res.status(201).json({
      message: "Admin berhasil didaftarkan",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};