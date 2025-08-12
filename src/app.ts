import express from "express";
import authRouter from "./routes/auth.Routes.js";
import cameraRouter from "./routes/camera.Routes.js";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(helmet());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/cameras", cameraRouter);

export default app;
