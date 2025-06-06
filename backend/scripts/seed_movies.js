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


//les keywords ne sont pas disponibles lors de l'appel movie/popular, 
//donc on doit appeler l'api pour chaque film
function get_keyword_options (movie_id){
  return {method: 'GET',
  url: `https://api.themoviedb.org/3/movie/${movie_id}/keywords`,
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo'
  }
}
};

//nos films qu'on ajoutera à notre database
var movies = [];

async function get_movies() {
    try {
        const res = await axios.request(options);
        const result = res.data['results'];
        const n = result.length;
        for (let i = 0; i < n; i++) {

            //appel à l'api pour recuperer les keywords
            let movie_keywords = '';
            try {
              const res2 = await axios.request(get_keyword_options(result[i]['id']));
              const result2 = res2.data['keywords'];
              const p = result2.length;
              for (let i = 0; i < p; i++) {
                movie_keywords += result2[i]['name'] + ' ';
              }
            } catch (err) {
              console.error(`Erreur lors de la récupération des keywords pour ${result[i]['title']} :`, err.message);
            }

            //ajout de tous les attributs de movie
            movies.push({
                id : result[i]['id'],
                title : result[i]['title'],
                date : result[i]['release_date'],
                genre: result[i]['genre_ids'],
                description: result[i]['overview'],
                keywords:movie_keywords,
                poster_path : 'https://image.tmdb.org/t/p/w500' + result[i]['poster_path']
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


    if (is_in_db){
      //si le film est deja dans la db, on met à jour ses attributs
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

    //sinon on l'ajoute
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
    await get_movies();
    await seed();
    await appDataSource.destroy();
}

main();