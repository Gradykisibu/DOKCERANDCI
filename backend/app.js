
const express = require("express");
const cors = require("cors");

function createApp(Anim) {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.get("/api/anime", async (req, res) => {
    try {
      const anime = await Anim.find();
      res.json(anime);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch anime" });
    }
  });

  app.post("/api/anime", async (req, res) => {
    try {
      const anime = new Anim(req.body);
      await anime.save();
      res.status(201).json(anime);
    } catch (err) {
      res.status(500).json({ error: "Failed to create anime" });
    }
  });

  return app;
}

module.exports = { createApp };