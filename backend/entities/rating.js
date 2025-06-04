import typeorm from 'typeorm';

const Rating = new typeorm.EntitySchema({
  name: 'Rating',
  columns: {
    userId: {
      type: Number,
      primary: true,
      nullable: false,
    },
    movieId: {
      type: Number,
      primary: true,
      nullable: false,
    },
    ratingValue: {
      type: Number,
      nullable: false,
    },
  },
  relations: {
    user: {
      target: 'User',
      type: 'many-to-one',
      joinColumn: { name: 'userId' },
      cascade: true,
    },
    movie: {
      target: 'Movie',
      type: 'many-to-one',
      joinColumn: { name: 'movieId' },
      cascade: true,
    },
  },
});

export default Rating;