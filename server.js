import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import http from "http";
import connectDB from "./config/db.js";
import musicRouter from "./routes/music.js";
import userRouter from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import favoriteRouter from "./routes/favorites.js";
import lRrouter from "./routes/listening.js";
import { Server } from "socket.io";

dotenv.config();

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"],
  },
});

let currentState = {
  isPlaying: false,
  currentTime: 0,
  currentTrackIndex: 0,
};

let chatMessages = [];

io.on("connection", (socket) => {
  console.log("New client connected");

  // Send initial state to the newly connected client
  socket.emit("initialState", currentState);

  // Send chat history to the newly connected client
  socket.emit("chatHistory", chatMessages);

  // Handle play/pause and time updates
  socket.on("updateState", (state) => {
    currentState = { ...currentState, ...state };
    io.emit("stateUpdated", currentState);
  });

  // Handle next track
  socket.on("nextTrack", () => {
    currentState.currentTrackIndex++;
    currentState.currentTime = 0;
    io.emit("stateUpdated", currentState);
  });

  // Handle previous track
  socket.on("prevTrack", () => {
    currentState.currentTrackIndex = Math.max(
      0,
      currentState.currentTrackIndex - 1
    );
    currentState.currentTime = 0;
    io.emit("stateUpdated", currentState);
  });

  // Handle chat messages
  socket.on("chatMessage", (message) => {
    const chatMessage = {
      id: Date.now(),
      text: message,
      timestamp: new Date().toISOString(),
    };
    chatMessages.push(chatMessage);
    io.emit("newChatMessage", chatMessage);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Parse JSON request body
app.use(express.json());
app.use(cors());

// Define authentication routes
app.use("/auth", authRoutes);

//music routes
app.use("/api/favorite", favoriteRouter);
app.use("/api/music", musicRouter);
app.use("/users", userRouter);

//room routes
app.use("/api/listening/", lRrouter);

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

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
