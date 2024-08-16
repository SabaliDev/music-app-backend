import request from "supertest";
import express from "express";
import musicController from "../controllers/musicController";

// Mock the Song model
jest.mock("../models/Song.js", () => ({
  find: jest.fn().mockResolvedValue([
    { title: "Song 1", artist: "Artist 1" },
    { title: "Song 2", artist: "Artist 2" },
  ]),
}));

const app = express();
app.get("/songs", musicController.listSongs);

describe("GET /songs", () => {
  it("should return a list of songs", async () => {
    const res = await request(app).get("/songs");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([
      { title: "Song 1", artist: "Artist 1" },
      { title: "Song 2", artist: "Artist 2" },
    ]);
  });
});
