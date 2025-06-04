import express from 'express';
import { appDataSource } from '../datasource.js';
//import Movie from '../entities/movie.js';

const router = express.Router();

router.get('/', function (req, res) {
    console.log([]);
//   appDataSource
    // .getRepository(Movie)
    // .find({})
    // .then(function (movies) {
    //   res.json({ movies: movies });
    //   });
});

router.get('/:movieId', function (req, res) {
    console.log("mvid")
//   appDataSource
//     .getRepository(Movie)
//     .findOneBy({ id: req.params.movieId })
//     .then(function (movie) {
//       if (movie) {
//         res.json(movie);
//         res.status(200);
//       } else {
//         res.status(404).json({ message: 'Movie not found' });
//       }
//     })
//     .catch(function () {
//       res.status(500).json({ message: 'Error while fetching the movie' });
//     });
});

router.post('/new', function (req, res) {
    console.log(req.body)
//   const movieRepository = appDataSource.getRepository(Movie);
//   const newMovie = movieRepository.create({
//     id: req.body.id,
//     title: req.body.title,
//     date: req.body.date,
//     genre : req.body.genre,
//     description : req.body.description,
//     poster_path: req.body.poster_path,
//   });

//   movieRepository
//     .save(newMovie)
//     .then(function (savedMovie) {
//       res.status(201).json({
//         message: 'Movie successfully created',
//         id: savedMovie.id,
//       });
//     })
//     .catch(function (error) {
//       console.error(error);
//       if (error.code === '23505') {
//         res.status(400).json({
//           message: `Movie with title "${newMovie.title}" already exists`,
//         });
//       } else {
//         res.status(500).json({ message: 'Error while creating the movie' });
//       }
//     });
});

router.delete('/:movieId', function (req, res) {
  appDataSource
    .getRepository(Movie)
    .delete({ id: req.params.movieId })
    .then(function () {
      res.status(204).json({ message: 'Movie successfully deleted' });
    })
    .catch(function () {
      res.status(500).json({ message: 'Error while deleting the movie' });
    });
});

export default router;