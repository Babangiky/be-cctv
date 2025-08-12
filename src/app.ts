import express from "express";
import authRouter from "./routes/auth.Routes.js";
import cameraRouter from "./routes/camera.Routes.js";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const corsOptions = {
  origin: [
    'http://localhost:8080',
    'http://localhost:3000', 
  ],
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));


app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/cameras", cameraRouter);

export default app;