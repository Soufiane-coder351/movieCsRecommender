import typeorm from 'typeorm';
const Rating = new typeorm.EntitySchema({
  name: 'Rating',
  columns: {
    userId: {
      type: Number,
      nullable: false,
      primary: true, 
    },
    movieId: {
      type: Number,
      nullable: false,
        primary: true, 
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