import Playlist from '../models/Playlist.js';
import User from '../models/User.js';

const playListController = {
  createPlaylist: async (req, res) => {
    try {
      const { name } = req.body;
      const newPlaylist = new Playlist({
        name,
        owner: req.user.id,
        songs: []
      });
      await newPlaylist.save();
      res.status(201).json(newPlaylist);
    } catch (error) {
      res.status(500).json({ message: 'Error creating playlist', error: error.message });
    }
  },

  getUserPlaylists: async (req, res) => {
    try {
      const playlists = await Playlist.find({ owner: req.user.id }).populate('songs');
      res.json(playlists);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching playlists', error: error.message });
    }
  },

  addSongToPlaylist: async (req, res) => {
    try {
      const { playlistId, songId } = req.body;
      const playlist = await Playlist.findOne({ _id: playlistId, owner: req.user.id });
      if (!playlist) {
        return res.status(404).json({ message: 'Playlist not found' });
      }
      if (!playlist.songs.includes(songId)) {
        playlist.songs.push(songId);
        await playlist.save();
      }
      res.json(playlist);
    } catch (error) {
      res.status(500).json({ message: 'Error adding song to playlist', error: error.message });
    }
  },

  removeSongFromPlaylist: async (req, res) => {
    try {
      const { playlistId, songId } = req.params;
      const playlist = await Playlist.findOne({ _id: playlistId, owner: req.user.id });
      if (!playlist) {
        return res.status(404).json({ message: 'Playlist not found' });
      }
      playlist.songs = playlist.songs.filter(song => song.toString() !== songId);
      await playlist.save();
      res.json(playlist);
    } catch (error) {
      res.status(500).json({ message: 'Error removing song from playlist', error: error.message });
    }
  },

  deletePlaylist: async (req, res) => {
    try {
      const { playlistId } = req.params;
      const playlist = await Playlist.findOneAndDelete({ _id: playlistId, owner: req.user.id });
      if (!playlist) {
        return res.status(404).json({ message: 'Playlist not found' });
      }
      res.json({ message: 'Playlist deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting playlist', error: error.message });
    }
  }
};

export default playListController;