import express from "express";
import playListController from "../controllers/playList.js";
import authenticate from "../middlewares/auth.js";

const playListRouter = express.Router();

// All routes are protected
playListRouter.use(authenticate);

playListRouter.post("/create", playListController.createPlaylist);
playListRouter.get("/user", playListController.getUserPlaylists);
playListRouter.post("/add-song", playListController.addSongToPlaylist);
playListRouter.delete(
  "/:playlistId/remove-song/:songId",
  playListController.removeSongFromPlaylist
);
playListRouter.delete("/:playlistId", playListController.deletePlaylist);

export default playListRouter;
