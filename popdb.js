import mongoose from "mongoose";
import dotenv from "dotenv";
import Song from "./models/Song.js";

dotenv.config();

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

async function populateDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    await Song.deleteMany({});
    console.log("Cleared existing songs");

    await Song.insertMany(songs);
    console.log("Inserted new songs");

    console.log("Database population completed");
  } catch (error) {
    console.error("Error populating database:", error);
  } finally {
    await mongoose.connection.close();
  }
}

populateDB();
