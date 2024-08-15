import express from "express";
import {
  createRoom,
  inviteUser,
  joinRoom,
  getRoomDetails,
  getAllUsers,
  leaveRoom
} from "../controllers/listeningRoomController.js";
import authenticate from "../middlewares/auth.js";

const lRrouter = express.Router();

lRrouter.use(authenticate);

lRrouter.post("/create", createRoom);
lRrouter.post("/invite", inviteUser);
lRrouter.post("/join/:roomId", joinRoom);
lRrouter.get("/:roomId", getRoomDetails);
lRrouter.get("/all", getAllUsers);
lRrouter.post('/leave/:roomId', leaveRoom);

export default lRrouter;
