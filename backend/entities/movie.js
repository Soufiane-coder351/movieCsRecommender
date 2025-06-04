import typeorm from 'typeorm';

const Movie = new typeorm.EntitySchema({
  name: 'movie',
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
        type: String
    },
    description: {
        type: String
    },
    poster_path: {
      type: String,
    },
  },
});

export default Movie;
