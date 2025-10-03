import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth.ts";

export interface AuthRequest extends Request {
    userId?: string;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "No token provided" });

    const token = authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ error: "No token provided"});

    const payload = verifyToken(token);

    if (!payload) return res.status(401).json({ error: "Invalid Token"});

    req.userId = payload.userId;
    next();
}