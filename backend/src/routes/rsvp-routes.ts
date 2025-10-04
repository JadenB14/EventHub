import prisma from "../prisma.ts";
import { Router } from "express";

const router = Router();

router.post("/", async (req, res) => {
    try {
        const { authorId, eventId, status } = req.body;

        if (!authorId || !eventId) {
            return res.status(400).json({ error: "userId and eventId are required"});
        }

        const rsvp = await prisma.rSVP.upsert({
            where: {
                authorId_eventId: { authorId, eventId }
            },
            update: { status },
            create: { authorId, eventId, status},
        });

        res.json(rsvp);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create or update RSVP" });
    }
});

router.get("/event/:eventId", async (req, res) => {
    try {
        const eventId = parseInt(req.params.eventId)

        const rsvps = await prisma.rSVP.findMany({
            where: { eventId },
            include: { author: true },
        });

        res.json(rsvps)
    } catch (err) {;
        console.log(err)
        res.status(500).json({ error: "Failed to fetch RSVPs"});
    }
});

router.get("/user/:userId", async (req, res) => {
    try {
        const userId = parseInt(req.params.userId)
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
        const id = parseInt(req.params.id);

        const rsvp = await prisma.rSVP.delete({ where: { id } });

        res.json({ message: "RSVP deleted successfully"})
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Failed to delete RSVP"})
    }
})

export default router;