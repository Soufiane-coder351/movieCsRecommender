import { appDataSource } from '../datasource.js';
import Genre from '../entities/genre.js';
import axios from 'axios';


const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/genre/movie/list',
  params: {language: 'en'},
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo'
  }
};

var genres = [];


async function get_genres () {
    try {
        const res = await axios.request(options);
        const result = res.data;
        const n = result['genres'].length;
        for (let i = 0; i < n; i++) {
            genres.push({
                id : result['genres'][i]['id'],
                name : result['genres'][i]['name']
            });
        }
    } catch (err) {
        console.error(err);
    }
}

async function seed() {
  await appDataSource.initialize();
  const genreRepository = appDataSource.getRepository(Genre);

  for (const genre of genres) {
    try {
      await genreRepository.insert(genre);
      console.log(`Ajouté : ${genre.name}`);
    } catch (err) {
      console.error(`Erreur pour ${genre.name} :`, err.message);
    }
  }

  await appDataSource.destroy();
};

async function main() {
    await get_genres();
    await seed();
}

main();