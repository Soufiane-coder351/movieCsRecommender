import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
    },
    title: {
      type: String,
    },
    date: {
      type: String,
    },
    genre: {
        type: 'simple-json'
        //genre est une liste d'ids de genres, 
        //dont on stocke un tableau de relation hors de la base de données
    },
    description: {
        type: String
    },
    keywords: {
      type: String
    },
    actors: {
      type: 'simple-json'
    },
    poster_path: {
      type: String,
    },
  },
});

export default Movie;
