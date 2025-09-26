import { Router } from "express";
import prisma from "../prisma.ts"

const router = Router();

// Create user
router.post('/', async (req, res) => {
    try {
        const { email, name, password } = req.body;
        const user = await prisma.user.create({
            data: { email, name, password },
        });
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: "User creation failed", details: err});
    }
});

router.get("/", async (_req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

export default router;