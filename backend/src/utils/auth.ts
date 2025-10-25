import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";

const JWT_SECRET: string = (() => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not defined in environment variables")
    }
    return secret;
})();

// Hash password
export async function hashPassword(password:string): Promise<string> {
    return bcrypt.hash(password, 10);
}

// Compare password
export async function comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
}

// Generate JWT
export function generateToken(userId: string): string {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
}

interface JwtPayload {
    userId: string
}

// Verify JWT
export function verifyToken(token: string): JwtPayload | null {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {userId: string};
        return decoded
    } catch (err) {
        return null
    }
}