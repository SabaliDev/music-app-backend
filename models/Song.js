import mongoose from 'mongoose';

const SongSchema = new mongoose.Schema({
  songId: {
    type: Number,
    required: true,
    unique: true
  },
  artistId: {
    type: Number,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

const Song = mongoose.model('Song', SongSchema);

export default Song;