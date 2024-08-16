import User from "../models/User.js";
import Song from "../models/Song.js";
import mongoose from "mongoose";

export const addFavorite = async (req, res) => {
  try {
    const { songId } = req.body;
    const userId = req.user._id;


    let objectId;
    try {
      objectId = new mongoose.Types.ObjectId(songId);
    } catch (error) {
      console.error("Error converting to ObjectId:", error);
      return res.status(400).json({ message: "Invalid song ID format" });
    }

    const song = await Song.findById(objectId);

    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    const user = await User.findById(userId);
    if (!user.favorites.includes(song._id)) {
      user.favorites.push(song._id);
      await user.save();
    }

    res.status(200).json({ message: "Song added to favorites" });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const { songId } = req.body; // This will now be the MongoDB _id
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(songId)) {
      return res.status(400).json({ message: "Invalid song ID" });
    }

    const user = await User.findById(userId);
    user.favorites = user.favorites.filter((id) => !id.equals(songId));
    await user.save();

    res.status(200).json({ message: "Song removed from favorites" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate("favorites");

    res.status(200).json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
