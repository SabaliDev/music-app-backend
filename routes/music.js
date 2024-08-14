import express from "express";
import musicController from "../controllers/musicController.js";

const musicRouter = express.Router();

musicRouter.route("/songs").get(musicController.listSongs);
musicRouter.route("/songs/:songtitle").get(musicController.songDetails);
musicRouter.route("/stream/:songtitle").post(musicController.stream);
musicRouter.route("/v1/search/multi").post(musicController.stream);

export default musicRouter;
