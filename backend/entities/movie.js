import typeorm from 'typeorm';
const Movie = new typeorm.EntitySchema({
  name: 'Movie',
  columns: {
    id: {
      primary: true,
      type: Number,
      generated: true,
    },
    title: { type: String,
        unique: true  // Ensuring movie titles are unique
    },
    description: { type: String },
    releaseDate: { type: Date },
    genre: { type: String },
    director: { type: String },
     rating: { type: Number },
  },
});
export default Movie;