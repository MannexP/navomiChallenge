const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Movie = require("../../models/Movie");
const User = require("../../models/User");

router.post(
  "/",
  [
    auth,
    [
      check("name", "Movie is Required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, rating, directors, release, description } = req.body;

    // Movie Object

    const movieFields = {};
    movieFields.user = req.user.id;
    if (name) movieFields.name = name;
    if (rating) movieFields.rating = rating;
    if (release) movieFields.release = release;
    if (description) movieFields.description = description;
    if (directors) {
      movieFields.directors = directors
        .split(",")
        .map(director => director.trim());
    }

    try {
      let movie = await Movie.findOne({ user: req.user.id });
      if (movie) {
        movie = await Movie.findOneAndUpdate(
          { user: req.user.id },
          { $set: movieFields },
          { new: true }
        );

        return res.json(movie)
      }
      // Create
      movie = new Movie(moiveFields);

    await Movie.save();
    res.json(movie);


    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/", auth, async (req, res) => {
  try {
    const movies = await Movie.find().sort({ date: -1 });
    res.json(movies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ msg: "Movie not found" });
    }
    res.json(movie);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Movie not found" });
    }
    res.status(500).send("Server Error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ msg: "Movie not found" });
    }

    // Check User
    if (movie.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await movie.remove();

    res.json({ msg: "Movie deleted" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Movie not found" });
    }
    res.status(500).send("Server Error");
  }
});

router.put("/movie/:id", auth, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
  } catch (err) {
    console.error(err.mesage);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
