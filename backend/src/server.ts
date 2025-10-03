import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import prisma from './prisma.ts';
import eventRoutes from "./routes/event-routes.ts";
import userRoutes from "./routes/user-routes.ts";



const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

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
