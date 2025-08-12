import dotenv from 'dotenv';
dotenv.config();

import connectDb from '../src/config/db.js';
import app from '../src/app.js';

let isDbConnected = false;

async function ensureDbConnection() {
  if (!isDbConnected) {
    await connectDb();
    isDbConnected = true;
  }
}

import type { Request, Response } from 'express';

export default async function handler(req: Request, res: Response) {
  try {
    await ensureDbConnection();
    app(req, res);
  } catch (error) {
    console.error('DB connection error:', error);
    res.status(500).send('Internal Server Error');
  }
}
