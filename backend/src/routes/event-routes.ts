import { Router } from "express";
import prisma from "../prisma.ts";

const router = Router();

// Create event
router.post("/", async (req, res) => {
    try {
        const { title , description, createdAt, location, authorId} = req.body;

        if (!title || !description || !createdAt || !location || !authorId) {
            return res.status(400).json({ error: "Missing required fields" });
        };

        const event = await prisma.event.create({
            data: {
                title,
                description,
                createdAt: new Date(createdAt),
                location,
                authorId,
            },
        });

        res.json(event);
    } catch (err) {
        res.status(500).json({ error: "Event creation failed", details: err });
    }
});

// Get all events
router.get("/", async (_req, res) => {
    try {

        const events = await prisma.event.findMany({
            include: { author: true },
            orderBy: { createdAt: "asc"},
        });
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch events" });
    }
});

// Get uniqe Event
router.get("/:id", async (req, res) => {
    try {

        const { id } = req.params;
        const event = await prisma.event.findUnique({
            where: { id },
            include: { author: true},
        });

        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        res.json(event)
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch event" });
    }
});

// Update event
router.put("/:id", async (req, res) => {
    try {

        const { id } = req.params;
        const  { title, description, createdAt, location, authorId } = req.body;

        // Checks that event exists
        const existingEvent = await prisma.event.findUnique({ where: { id } });
        if (!existingEvent) {
            return res.status(404).json({ error: "Event not found"});
        }

        // Checks if current user matches authorId
        const updated = await prisma.event.update({
            where: { id },
            data: {
                title,
                description,
                createdAt: createdAt ? new Date(createdAt) : undefined,
                location,
            },
        });

        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: "Failed to update event" });
    }
});

// Delete event, author only
router.delete("/:id", async (req, res) => {
    try {

        const { id } = req.params;

        const existingEvent = await prisma.Event.findUnique({ where: { id }});
        if (!existingEvent) {
            return res.status(404).json({ error: "Event not found"});
        };
        
        await prisma.event.delete({ where: { id }});

        res.json({ message:  "Event deleted" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete event" });
    }
});

export default router;