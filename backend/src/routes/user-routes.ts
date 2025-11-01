import { Router } from "express";
import prisma from "../prisma";
import { comparePassword, generateToken, hashPassword, verifyToken } from "../utils/auth";
import { authMiddleware } from "../middlewares/auth";

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
        res.status(500).json({ error: "User registration failed", details: err});
    }
});

// Login a user
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        const valid = await comparePassword(password, user.password);
        if (!valid) return res.status(401).json({ error: "Invalid credentials" });

        const token = generateToken(user.id);
        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: " Login failed" });
    }
})

// GET all users
router.get("/", async (_req, res) => {
    try{
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Failed to get all users", details: err });
    }
});

// GET events by user id
router.get("/:id/events", async (req, res) => {
    try {
        
        const { id } = req.params
        const userEvents = await prisma.event.findMany({ where: { authorId: id } });

        if (!userEvents) {
            res.status(404).json({ error: "User events not found" });
        }

        res.json(userEvents);
    } catch (err) {
        res.status(500).json({ error: "Events couldn't be retrived", details: err });
    }
})

router.get("/me", authMiddleware, async (req: any, res: any) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            select: {
                name: true,
                events: true,
                email: true,
                rsvps: true,
                id: true,
                createdAt: true,
            }
        });

        if (!user) return res.status(404).json({ meesage: "User not found" });

        return res.json(user)
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: "Error fetching user", err});
    }
})

// GET user by ID
router.get("/:id", async (req, res) => {
    try {
    const id = req.params.id
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
        res.status(404).json({ error: "User not found" });
    }

    return res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to get user', details: err });
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const existingUser = await prisma.user.findUnique({ where: { id } });

        if (!existingUser) {
            return res.status(404).json({ error: "User not found" });
        };

        await prisma.user.delete({ where: { id } });

        res.json({ message: "User Deleted" });
    } catch (err) {
        res.status(500).json({ error: "User could not be deleted", details: err });
    }
})

export default router;