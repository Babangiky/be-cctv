import type { Request, Response } from "express";
import CameraModel from "../models/camera.models.js";

export const GetAllCameras = async (req: Request, res: Response) => {
  try {
    const cameras = await CameraModel.find();
    res.status(200).json(cameras);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const GetCameraById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const camera = await CameraModel.findById(id);
    if (!camera) {
      return res.status(404).json({ message: "Camera tidak ditemukan" });
    }
    res.status(200).json(camera);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const CreateCamera = async (req: Request, res: Response) => {
  const { name, description, latitude, longitude, streamUrl, is_active } =
    req.body;
  try {
    const newCamera = await CameraModel.create({
      name,
      description,
      latitude,
      longitude,
      streamUrl,
      is_active,
    });
    res.status(201).json(newCamera);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const UpdateCamera = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, latitude, longitude, streamUrl, is_active } =
    req.body;
  try {
    const updatedCamera = await CameraModel.findByIdAndUpdate(
      id,
      { name, description, latitude, longitude, streamUrl, is_active },
      { new: true, runValidators: true }
    );
    if (!updatedCamera) {
      return res.status(404).json({ message: "Camera tidak ditemukan" });
    }
    res.status(200).json(updatedCamera);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const DeleteCamera = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedCamera = await CameraModel.findByIdAndDelete(id);
    if (!deletedCamera) {
      return res.status(404).json({ message: "Camera tidak ditemukan" });
    }
    res.status(200).json({ message: "Camera berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
