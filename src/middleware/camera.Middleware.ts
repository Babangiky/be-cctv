import CameraModel from "../models/camera.models.js";
import type { Request, Response, NextFunction } from "express";

export const checkCameraExists = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const camera = await CameraModel.findById(req.params.id);
    if (!camera) {
      return res.status(404).json({ message: "Camera tidak ditemukan" });
    }
    (req as any).camera = camera;
    next();
  } catch {
    return res.status(400).json({ message: "ID kamera tidak valid" });
  }
};
