import { appDataSource } from '../datasource.js';
import Movie from '../entities/movie.js';

async function deleteAllMovies() {
  await appDataSource.initialize();
  const movieRepository = appDataSource.getRepository(Movie);
  await movieRepository.clear(); // Supprime tous les films
  console.log('Tous les films ont été supprimés.');
  await appDataSource.destroy();
}

deleteAllMovies();