import { Router } from "express";
import prisma from "../prisma.ts"
import { comparePassword, generateToken, hashPassword } from "../utils/auth.ts";

const router = Router();

// Register user
router.post('/register', async (req, res) => {
    try {
        const { email, name, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return res.status(400).json({ error: "Email already in use"});
        }

        const hashed = await hashPassword(password);

        const user = await prisma.user.create({
            data:{ name, email, password: hashed},
        });

        res.json({ id: user.id, email: user.email, name: user.name});
    } catch (err) {
        res.status(500).json({ error: "User registration failed", details: err})
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) return res.status(401).json({ error: "Invalid credentials"});

        const valid = await comparePassword(password, user.password);
        if (!valid) return res.status(401).json({ error: "Invalid credentials"});

        const token = generateToken(user.id.toString());
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: " Login failed" });
    }
})

router.get("/", async (_req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

export default router;