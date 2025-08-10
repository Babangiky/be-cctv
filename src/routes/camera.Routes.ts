import express from "express";
import {
  GetAllCameras,
  GetCameraById,
  CreateCamera,
  UpdateCamera,
  DeleteCamera,
} from "../controller/camera.Controller.js";
import { checkCameraExists } from "../middleware/camera.Middleware.js";
import { authMiddleware } from "../middleware/auth.Middleware.js";
import { authorizeRoles } from "../middleware/authorizeRoles.middleware.js";
const router = express.Router();

router.get("/camera/:id", checkCameraExists, GetCameraById);
router.put("/camera/:id", authMiddleware, authorizeRoles("admin"), checkCameraExists, UpdateCamera);
router.delete("/camera/:id", authMiddleware, authorizeRoles("admin"), checkCameraExists, DeleteCamera);
router.post("/", CreateCamera);
router.get("/", GetAllCameras);
export default router;
