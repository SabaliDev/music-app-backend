const songs = [
  {
    songId: 1,
    artistId: 12,
    artist: "Billie Eilish",
    title: "chihiro",
    img: "https://firebasestorage.googleapis.com/v0/b/spoti-a4989.appspot.com/o/covers%2FBillie%20Eilish%20-%20chihiro.jpeg?alt=media",
    url: "https://firebasestorage.googleapis.com/v0/b/spoti-a4989.appspot.com/o/songs%2FBillie%20Eilish%20-%20chihiro.mp3?alt=media",
  },
  {
    songId: 2,
    artistId: 13,
    artist: "Drake",
    title: "Furthest Thing",
    img: "https://firebasestorage.googleapis.com/v0/b/spoti-a4989.appspot.com/o/covers%2FDrake%20-%20Furthest%20Thing.jpeg?alt=media",
    url: "https://firebasestorage.googleapis.com/v0/b/spoti-a4989.appspot.com/o/songs%2FDrake%20-%20Furthest%20Thing.mp3?alt=media",
  },
  {
    songId: 3,
    artistId: 14,
    artist: "Ed Sheeran",
    title: "Tenerife",
    img: "https://firebasestorage.googleapis.com/v0/b/spoti-a4989.appspot.com/o/covers%2FEd%20Sheeran%20-%20Tenerife.jpeg?alt=media",
    url: "https://firebasestorage.googleapis.com/v0/b/spoti-a4989.appspot.com/o/songs%2FEd%20Sheeran%20-%20Tenerife.mp3?alt=media",
  },
  {
    songId: 4,
    artistId: 15,
    artist: "Rihanna",
    title: "Diamonds",
    img: "https://firebasestorage.googleapis.com/v0/b/spoti-a4989.appspot.com/o/covers%2FRihanna%20-%20Diamonds.jpeg?alt=media",
    url: "https://firebasestorage.googleapis.com/v0/b/spoti-a4989.appspot.com/o/songs%2FRihanna%20-%20Diamonds.mp3?alt=media",
  },
  {
    songId: 5,
    artistId: 16,
    artist: "Sauti Sol",
    title: "Sura",
    img: "https://firebasestorage.googleapis.com/v0/b/spoti-a4989.appspot.com/o/covers%2FSauti%20Sol%20-%20Sura.jpeg?alt=media",
    url: "https://firebasestorage.googleapis.com/v0/b/spoti-a4989.appspot.com/o/songs%2FSauti%20Sol%20-%20Sura.mp3?alt=media",
  },
  {
    songId: 6,
    artistId: 17,
    artist: "Tems",
    title: "My Face",
    img: "https://firebasestorage.googleapis.com/v0/b/spoti-a4989.appspot.com/o/covers%2FTems%20-%20You%20.jpeg?alt=media",
    url: "https://firebasestorage.googleapis.com/v0/b/spoti-a4989.appspot.com/o/songs%2FTems%20-%20You%20.mp3?alt=media",
  },
];

const musicController = {
  listSongs: async (req, res) => {
    res.json(songs.map((song) => song));
  },
  songDetails: async (req, res) => {
    const song = songs.find((s) => s.title === req.params.songtitle);
    if (song) {
      res.json(song);
    } else {
      res.status(404).json({ error: "Song not found" });
    }
  },

  stream: async (req, res) => {
    const song = songs.find((s) => s.title === req.params.songtitle);
    if (song) {
      res.redirect(song.url);
    } else {
      res.status(404).json({ error: "Song not found" });
    }
  },

  search: async (req, res) => {
    const searchTerm = req.query.query.toLowerCase();
    const searchType = req.query.search_type;

    if (searchType !== "SONGS_ARTISTS") {
      return res.status(400).json({ error: "Invalid search type" });
    }

    const searchResults = songs.filter(
      (song) =>
        song.title.toLowerCase().includes(searchTerm) ||
        song.artist.toLowerCase().includes(searchTerm)
    );

    res.json(searchResults);
  },
};

export default musicController;

//   // List all songs
//   app.get("/api/songs", (req, res) => {
//     res.json(songs.map((song) => song));
//   });

//   // Get song details
//   app.get("/api/songs/:songtitle", (req, res) => {
//     const song = songs.find((s) => s.title === req.params.songtitle);
//     if (song) {
//       res.json(song);
//     } else {
//       res.status(404).json({ error: "Song not found" });
//     }
//   });

//   // Stream a song
//   app.get("/api/stream/:songtitle", (req, res) => {
//     const song = songs.find((s) => s.title === req.params.songtitle);
//     if (song) {
//       res.redirect(song.url);
//     } else {
//       res.status(404).json({ error: "Song not found" });
//     }
//   });

//   app.get("/api/v1/search/multi", (req, res) => {
//     const searchTerm = req.query.query.toLowerCase();
//     const searchType = req.query.search_type;

//     if (searchType !== "SONGS_ARTISTS") {
//       return res.status(400).json({ error: "Invalid search type" });
//     }

//     const searchResults = songs.filter(
//       (song) =>
//         song.title.toLowerCase().includes(searchTerm) ||
//         song.artist.toLowerCase().includes(searchTerm)
//     );

//     res.json(searchResults);
//   });
