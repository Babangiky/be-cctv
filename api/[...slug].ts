import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import authRouter from "../src/routes/auth.Routes.js";
import cameraRouter from "../src/routes/camera.Routes.js";
import cors from "cors";
import connectDb from '../config/db.js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

let isDbConnected = false;

async function ensureDbConnection() {
  if (!isDbConnected) {
    await connectDb();
    isDbConnected = true;
  }
}

const app = express();

const corsOptions = {
  origin: [
    'http://localhost:8080',
    'http://localhost:3000',
    'https://backendcctv.vercel.app'
  ],
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/cameras", cameraRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Backend CCTV API is running', status: 'OK' });
});

app.get('/api', (req, res) => {
  res.json({ message: 'API endpoint is working', status: 'OK' });
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log(`🚀 Request: ${req.method} ${req.url}`);
  console.log('📍 Origin:', req.headers.origin);
  
  try {
    await ensureDbConnection();
    
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || 'http://localhost:8080');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    
    if (req.method === 'OPTIONS') {
      console.log('✅ Handling OPTIONS preflight request');
      res.status(200).end();
      return;
    }
    
    app(req, res);
    
  } catch (error) {
    console.error('💥 Server error:', error);
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}