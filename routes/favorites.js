import express from "express";
import {
  addFavorite,
  removeFavorite,
  getFavorites,
} from "../controllers/favoritesController.js";

import authenticate from "../middlewares/auth.js";

const favoriteRouter = express.Router();

// All routes are protected
favoriteRouter.use(authenticate);

favoriteRouter.post("/add", addFavorite);
favoriteRouter.delete("/remove", removeFavorite);
favoriteRouter.get("/", getFavorites);

export default favoriteRouter;
