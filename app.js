import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import connectDB from "./config/db.js";
import musicRouter from "./routes/music.js";
import userRouter from "./routes/users.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
// Parse JSON request body
app.use(express.json());
app.use(cors());

// Define authentication routes
app.use("/auth", authRoutes);

// Register routes
app.use("/api/music", musicRouter);
app.use("/users", userRouter);

// Connect to the database, then start the server
const startServer = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
};

startServer();

export default app;
