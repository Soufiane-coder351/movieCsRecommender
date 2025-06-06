import { appDataSource } from '../datasource.js';
import Movie from '../entities/movie.js';
import axios from 'axios';

function get_options (page_number) {
  return{method: 'GET',
    url: 'https://api.themoviedb.org/3/movie/popular',
    params: {language: 'en-US', page: `${page_number}`},//modifier la page pour ajouter d'autres films à la db
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo'
    }
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

function get_cast_options (movie_id) {
  return {method: 'GET',
    url: `https://api.themoviedb.org/3/movie/${movie_id}/credits`,
    params: {language: 'en-US'},
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjlmNjAwMzY4MzMzODNkNGIwYjNhNzJiODA3MzdjNCIsInN1YiI6IjY0NzA5YmE4YzVhZGE1MDBkZWU2ZTMxMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Em7Y9fSW94J91rbuKFjDWxmpWaQzTitxRKNdQ5Lh2Eo'
    }
  }
};


var movies = [];

async function get_movies(page_number) {
    try {
        const res = await axios.request(get_options(page_number));
        const result = res.data['results'];
        const n = result.length;
        for (let i = 0; i < n; i++) {

            //recuperer les keywords
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


            //recuperer les acteurs du film
            let movie_actors = [];//contiendra les couples (popularity, name) car on veut trier les acteurs par popularité
            let actor_names = [];//resultat final, contiendra les 3 plus populaires acteurs
            try {
              const res3 = await axios.request(get_cast_options(result[i]['id']));
              const result3 = res3.data['cast'];
              const l = result3.length;
              for (let i = 0; i < l; i++) {
                if (result3[i]['known_for_department']==='Acting') {
                  movie_actors.push([result3[i]['popularity'],result3[i]['name']]);
                }
              }

              // Tri par popularité décroissante
              movie_actors.sort((a, b) => b[0] - a[0]);

              //on ne garde que les 3 plus populaires
              const top_actors = movie_actors.slice(0, 3);
              
              //on ne veut que leurs noms
              actor_names = top_actors.map(actor => actor[1]);

            } catch (err) {
              console.error(`Erreur lors de la récupération des acteurs pour ${result[i]['title']} :`, err.message);
            }


            //ajout de tous les attributs de movie
            movies.push({
                id : result[i]['id'],
                title : result[i]['title'],
                date : result[i]['release_date'],
                genre: result[i]['genre_ids'],
                description: result[i]['overview'],
                keywords: movie_keywords,
                actors: actor_names,
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

    

    //appel a l'api pour modifier keywords
    


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
            actors: movie.actors,
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

//on recupere l'argument page_number passé dans la commande
const page_number = process.argv[2] ? parseInt(process.argv[2], 10) : 1;

async function main(page_number) {
    await appDataSource.initialize();
    await get_movies(page_number);
    await seed();
    await appDataSource.destroy();
}

main(page_number);