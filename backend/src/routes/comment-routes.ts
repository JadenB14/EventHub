import prisma from "../prisma.ts";
import { Router } from "express";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const { content, authorId, eventId } = req.body;

        if (!content || !authorId || !eventId) {
            return res.status(400).json({ error: "text, authorId, and eventId are required" });
        }

        const comment = await prisma.comment.create({
            data: { content, authorId, eventId },
        }); 

        res.json(comment);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to create comment" });
    }
});

router.get("/event/:eventId", async (req, res) => {
    try{
        const eventId = parseInt(req.params.eventId);

        const comments = await prisma.comment.findMany({
            where: { eventId },
            include: { author: true},
            orderBy: { createdAt: "desc"},
        });

        res.json(comments);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch comments" });
    }
});

router.get("/user/:userId", async (req, res) => {
    try {
        const userId = parseInt(req.params.userId);

        const comments = await prisma.comment.findMany({
            where: { authorId: userId },
            include: { event: true },
            orderBy: { createdAt: "desc"},
        });

        res.json(comments);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch user comments" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { content } = req.body;

        const updated = await prisma.comment.update({
            where: { id },
            data: { content },
        });

        res.json(updated);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to update comment" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        await prisma.comment.delete({ where: { id } });

        res.json({ message: "Comment deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to delete comment" });
    }
});

export default router;