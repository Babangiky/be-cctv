import express from "express";
import authRouter from "./routes/auth.Routes.js";
import cameraRouter from "./routes/camera.Routes.js";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Setup origin yang diizinkan, bisa disesuaikan
const allowedOrigins = ['http://localhost:8080', 'https://backendcctv.vercel.app'];

// Pasang cors dengan konfigurasi yang lengkap
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // izinkan request tanpa origin (curl, postman)
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `CORS error: Origin ${origin} tidak diizinkan.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // pastikan method yang diijinkan lengkap
  allowedHeaders: ['Content-Type', 'Authorization'],     // header yang diizinkan
  credentials: true,                                     // kalau butuh cookie atau auth header
}));

app.options('*', cors());

app.use(helmet());

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/cameras", cameraRouter);

export default app;
