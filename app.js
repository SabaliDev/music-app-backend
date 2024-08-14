import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import musicRouter from "./routes/music.js";

// Import models

const app = express();
app.use(cors());

// Register routes
app.use("/api/music", musicRouter);

export default app;
