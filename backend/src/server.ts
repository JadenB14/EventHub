import dotenv from 'dotenv';
dotenv.config();

import cors from 'cors';
import express from 'express';
import prisma from './prisma.ts';
import eventRoutes from "./routes/event-routes.ts";
import userRoutes from "./routes/user-routes.ts";
import rsvpRoutes from "./routes/rsvp-routes.ts"
import commentRoutes from "./routes/comment-routes.ts"


const PORT = process.env.PORT;

const app = express();
app.use(cors());


// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

app.use("/api/events", eventRoutes);

app.use("/api/rsvps", rsvpRoutes);

app.use("/api/comments", commentRoutes)

// Healthcheck
app.get("/healthcheck", (req, res) => {
    res.json({ status: "OK"});
})

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})

process.on("SIGINT", async () => {
    await prisma.$disconnect;
    process.exit(0);
})
