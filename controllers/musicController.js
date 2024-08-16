import Song from "../models/Song.js";

const musicController = {
  // List all songs
  listSongs: async (req, res) => {
    try {
      const songs = await Song.find();
      res.status(200).json(songs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching songs" });
    }
  },

  // Get song details by ID
  songDetails: async (req, res) => {
    try {
      const song = await Song.findById(req.params.id);
      if (!song) return res.status(404).json({ error: "Song not found" });
      res.status(200).json(song);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching song details" });
    }
  },

  // Create a new song
  createSong: async (req, res) => {
    try {
      const newSong = new Song(req.body);
      const savedSong = await newSong.save();
      res.status(201).json(savedSong);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error creating song" });
    }
  },

  // Update a song
  updateSong: async (req, res) => {
    try {
      const updatedSong = await Song.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedSong)
        return res.status(404).json({ error: "Song not found" });
      res.status(200).json(updatedSong);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error updating song" });
    }
  },

  // Delete a song
  deleteSong: async (req, res) => {
    try {
      const deletedSong = await Song.findByIdAndDelete(req.params.id);
      if (!deletedSong)
        return res.status(404).json({ error: "Song not found" });
      res.status(200).json({ message: "Song deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error deleting song" });
    }
  },

  // Stream a song
  stream: async (req, res) => {
    try {
      const song = await Song.findById(req.params.id);
      if (song) {
        res.redirect(song.url);
      } else {
        res.status(404).json({ error: "Song not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error streaming song" });
    }
  },

  // Search songs and artists

  search: async (req, res) => {
    try {
      const searchTerm = req.query.query.trim().toLowerCase();
      const searchType = req.query.search_type;

      if (searchType !== "SONGS_ARTISTS") {
        return res.status(400).json({ error: "Invalid search type" });
      }

      const searchResults = await Song.find({
        $or: [
          { title: { $regex: searchTerm, $options: "i" } },
          { artist: { $regex: searchTerm, $options: "i" } },
        ],
      });

      if (searchResults.length === 0) {
        return res.status(404).json({ message: "Song not found" });
      }

      res.status(200).json(searchResults);
    } catch (error) {
      console.error("Error occurred during search:", error);
      res.status(500).json({ error: "Error searching songs" });
    }
  },
};

export default musicController;
