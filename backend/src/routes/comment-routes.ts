import { authMiddleware } from "../middlewares/auth";
import prisma from "../prisma";
import { Router } from "express";

const router = Router();

// CREATE comment
router.post("/", authMiddleware, async (req: any, res: any) => {
    try {
        const { content, eventId } = req.body;
        const authorId = req.userId;

        if (!content || !authorId || !eventId) {
            return res.status(400).json({ error: "text, authorId, and eventId are required" });
        }

        const comment = await prisma.comment.create({
            data: { 
                content, 
                authorId, 
                createdAt: new Date(),
                eventId,
             },
        }); 

        res.json(comment);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to create comment" });
    }
});

// GET all comments from a unique event
router.get("/event/:eventId", async (req, res) => {
    try{
        const eventId = req.params.eventId;

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

// GET all comments from a unique user
router.get("/user/:userId", authMiddleware, async (req: any, res: any) => {
    try {
        const userId = req.userId;

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

// UPDATE comments from 
router.put("/:id", authMiddleware, async (req: any, res: any) => {
    try {
        const id = req.userId;
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

// DELETE single comment by id
router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        await prisma.comment.delete({ where: { id } });

        res.json({ message: "Comment deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to delete comment" });
    }
});

router.delete("/event/:eventId", authMiddleware, async (req: any, res:any) => {
    try{
        const eventId = req.params.eventId;

        await prisma.comment.deleteMany({
            where: { eventId }
        })

        res.json({ message: "Event comments deleted successfully"});
    } catch (err: any) {
        if (err instanceof Error) {
            console.log(err.message)
            return res.status(500).json({ error: "Event comments could not be deleted" })
        }
    }
})

export default router;