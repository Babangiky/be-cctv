import dotenv from 'dotenv';
dotenv.config();
import connectDb from '../config/db.js';
import app from '../src/app.js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

let isDbConnected = false;

async function ensureDbConnection() {
  if (!isDbConnected) {
    await connectDb();
    isDbConnected = true;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    await ensureDbConnection();
    
    app(req, res);
  } catch (error) {
    console.error('DB connection error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}