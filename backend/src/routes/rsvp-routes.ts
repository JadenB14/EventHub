import { authMiddleware } from "../middlewares/auth";
import prisma from "../prisma";
import { Router } from "express";

const router = Router();

router.post("/", authMiddleware, async (req: any, res: any) => {
    try {
        const { eventId, status } = req.body;
        const authorId = req.userId;
        
        if (!authorId || !eventId) {
            return res.status(400).json({ error: "userId and eventId are required" });
        }

        const rsvp = await prisma.rSVP.upsert({
            where: {
                authorId_eventId: { authorId, eventId }
            },
            update: { status },
            create: { authorId, eventId, status },
        });

        res.json(rsvp);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create or update RSVP" });
    }
});


router.get("/event/:eventId", authMiddleware, async (req: any, res: any) => {
    try {
        const eventId = req.params.eventId
        const authorId = req.userId;

        const rsvps = await prisma.rSVP.findUnique({
            where: { authorId_eventId: { authorId, eventId } },
            select: { status: true },
        });

        res.json(rsvps)
    } catch (err) {;
        console.log(err)
        res.status(500).json({ error: "Failed to fetch RSVPs"});
    }
});

router.get("/user/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        const rsvps = await prisma.rSVP.findMany({
            where: { authorId: userId },
            include: { event: true }
        });

        res.json(rsvps)
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch RSVPs" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;

        const rsvp = await prisma.rSVP.delete({ where: { id } });

        res.json({ message: "RSVP deleted successfully"})
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Failed to delete RSVP"})
    }
})

export default router;