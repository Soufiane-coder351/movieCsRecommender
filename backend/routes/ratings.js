import express from "express";
import { appDataSource } from '../datasource.js';
import Rating from "../entities/rating.js";

const router = express.Router();

// POST /ratings - Like or Dislike a movie
router.post("/", async (req, res) => {
  const { userId, movieId, ratingValue } = req.body;
  if (
    typeof userId !== "number" ||
    typeof movieId !== "number" ||
    ![1, -1].includes(ratingValue)
  ) {
    return res.status(400).json({ error: "Invalid data" });
  }

  const ratingRepo = appDataSource.getRepository(Rating);

  let rating = await ratingRepo.findOne({ where: { userId, movieId } });
  if (rating) {
    rating.ratingValue = ratingValue;
    await ratingRepo.save(rating);
  } else {
    rating = ratingRepo.create({ userId, movieId, ratingValue });
    await ratingRepo.save(rating);
  }
  res.json({ success: true });
});

// DELETE /ratings - Remove like/dislike
router.delete("/", async (req, res) => {
  const { userId, movieId } = req.body;
  if (typeof userId !== "number" || typeof movieId !== "number") {
    return res.status(400).json({ error: "Invalid data" });
  }
  const ratingRepo = appDataSource.getRepository(Rating);
  await ratingRepo.delete({ userId, movieId });
  res.json({ success: true });
});


// GET /ratings/liked/:userId
router.get("/liked/:userId", async (req, res) => {
  const userId = Number(req.params.userId);
  const ratingRepo = appDataSource.getRepository(Rating);
  const ratings = await ratingRepo.find({ where: { userId, ratingValue: 1 }, relations: ["movie"] });
  res.json({ movies: ratings.map(r => r.movie) });
});

// GET /ratings/disliked/:userId
router.get("/disliked/:userId", async (req, res) => {
  const userId = Number(req.params.userId);
  const ratingRepo = appDataSource.getRepository(Rating);
  const ratings = await ratingRepo.find({ where: { userId, ratingValue: -1 }, relations: ["movie"] });
  res.json({ movies: ratings.map(r => r.movie) });
});

// GET /ratings/counts/:movieId - Get like/dislike counts for a movie
router.get("/counts/:movieId", async (req, res) => {
  const movieId = Number(req.params.movieId);
  if (isNaN(movieId)) return res.status(400).json({ error: "Invalid movieId" });
  const ratingRepo = appDataSource.getRepository(Rating);
  const likes = await ratingRepo.count({ where: { movieId, ratingValue: 1 } });
  const dislikes = await ratingRepo.count({ where: { movieId, ratingValue: -1 } });
  res.json({ likes, dislikes });
});

// GET /ratings/:userId/:movieId - Get user's rating for a movie
router.get("/:userId/:movieId", async (req, res) => {
  const userId = Number(req.params.userId);
  const movieId = Number(req.params.movieId);
  if (isNaN(userId) || isNaN(movieId)) {
    return res.status(400).json({ error: "Invalid ids" });
  }
  const ratingRepo = appDataSource.getRepository(Rating);
  const rating = await ratingRepo.findOne({ where: { userId, movieId } });
  res.json({ rating: rating ? rating.ratingValue : 0 });
});



export default router;