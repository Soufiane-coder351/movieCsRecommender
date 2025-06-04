import { appDataSource } from '../datasource.js';
import Movie from '../entities/movie.js';
import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/movie/popular',
  params: {language: 'en-US', page: '1'},
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo'
  }
};

var movies = [];


async function get_movies () {
    try {
        const res = await axios.request(options);
        const result = res.data;
        const n = result['results'].length;
        for (let i = 0; i < n; i++) {
            movies.push({
                id : result['results'][i]['id'],
                title : result['results'][i]['title'],
                date : result['results'][i]['release_date'],
                genre: result['results'][i]['genre_ids'],
                description: result['results'][i]['overview'],
                poster_path : 'https://image.tmdb.org/t/p/w500' + result['results'][i]['poster_path']
            });
        }
    } catch (err) {
        console.error(err);
    }
}

async function seed() {
  await appDataSource.initialize();
  const movieRepository = appDataSource.getRepository(Movie);

  for (const movie of movies) {
    try {
      await movieRepository.insert(movie);
      console.log(`Ajouté : ${movie.title}`);
    } catch (err) {
      console.error(`Erreur pour ${movie.title} :`, err.message);
    }
  }

  await appDataSource.destroy();
};

seed();async function main() {
    await get_movies();
    await seed();
}

main();