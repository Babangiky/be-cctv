import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

interface Jwt_payload {
  id: string;
  role: "admin" | "user";
}
declare global {
  namespace Express {
    interface Request {
      user?: Jwt_payload;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token tidak ditemukan atau format salah" });  
  }
  const token = authHeader?.split(" ")[1];

  try {
    const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string) as Jwt_payload;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token tidak valid" });
  }

};
