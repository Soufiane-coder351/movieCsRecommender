import { appDataSource } from '../datasource.js';
import Movie from '../entities/movie.js';
import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/movie/popular',
  params: {language: 'en-US', page: '1'},//modifier la page pour ajouter d'autres films à la db
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo'
  }
};

function get_keyword_options (movie_id){
  return {method: 'GET',
  url: `https://api.themoviedb.org/3/movie/${movie_id}/keywords`,
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo'
  }
}
};


var movies = [];

// async function getAllGenre() {
//   const genreRepository = appDataSource.getRepository(Genre);
//   const genres = await genreRepository.find({ select: ['id', 'name'] });
//   const genre_dico = {};
//   for (const genre of genres) {
//     genre_dico[genre.id] = genre.name;
//   }
//   return genre_dico;
// }

async function get_movies() {
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
                keywords:'',
                poster_path : 'https://image.tmdb.org/t/p/w500' + result['results'][i]['poster_path']
            });
        }
    } catch (err) {
        console.error(err);
    }
}

async function seed() {
  const movieRepository = appDataSource.getRepository(Movie);

  for (const movie of movies) {
    const is_in_db = await movieRepository.findOneBy({ id: movie.id });

    

    //appel a l'api pour modifier keywords
    try {
      const res = await axios.request(get_keyword_options(movie.id));
      const result = res.data;
      const n = result['keywords'].length;
      for (let i = 0; i < n; i++) {
        movie.keywords += result['keywords'][i]['name'] + ' ';
      }
    } catch (err) {
      console.error(`Erreur lors de la récupération des keywords pour ${movie.title} :`, err.message);
    }


    if (is_in_db){
      
      try {
        await movieRepository.update(
          { id: movie.id },
          {
            title: movie.title,
            date: movie.date,
            genre: movie.genre,
            description: movie.description,
            keywords: movie.keywords,
            poster_path: movie.poster_path
          }
        );
        console.log(`Mise à jour pour : ${movie.title}`);
      } catch (err) {
        console.error(`Erreur de mise à jour pour ${movie.title} :`, err.message);
      }
    }
    else {
      try {
        await movieRepository.insert(movie);
        console.log(`Ajouté : ${movie.title}`);
      } catch (err) {
        console.error(`Erreur pour ${movie.title} :`, err.message);
      }
    }
  }
    
}


async function main() {
    await appDataSource.initialize();
    //const genre_dico = await getAllGenre();
    await get_movies();
    await seed();
    await appDataSource.destroy();
}

main();