import { appDataSource } from '../datasource.js';
import Rating from '../entities/rating.js';
import Movie from '../entities/movie.js'


async function getAllMovies() {
  const movieRepository = appDataSource.getRepository(Movie);
  const movies = await movieRepository.find({ select: ['id'] });
  // Retourne un tableau d'ids
  return movies.map(m=>m.id);
}

const values = [-1, 1];

var ratings = [];


function getRatings(movies) {
    for (const movie_Id of movies) {
        for (let i = 1; i < 6; i++) {
            ratings.push({
            movieId : movie_Id,
            userId : i,
            ratingValue: values[Math.floor(Math.random() * values.length)]
            });
        
        }
    }

};


async function seed() {
  const movieRepository = appDataSource.getRepository(Rating);

  for (const rating of ratings) {
    try {
      await movieRepository.insert(rating);
      console.log(`Ajouté : ${rating.movieId} par ${rating.userId}`);
    } catch (err) {
      console.error(`Erreur pour ${rating.movieId} par ${rating.userId} :`, err.message);
    }
  }
}

async function main() {
    await appDataSource.initialize();
    const movies = await getAllMovies();
    getRatings(movies);
    await seed();
    await appDataSource.destroy();
}

main();