import { DataSource } from 'typeorm';
import Genre from './entities/genre.js';
import Movie from './entities/movie.js';
import User from './entities/user.js';
import Rating from './entities/rating.js';
import 'dotenv/config';

export const appDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DATABASE_NAME,
  synchronize: false,
  entities: [Genre, Movie, User, Rating],
  migrations: ['migrations/*.js'],
  cli: {
    migrationsDir: 'migrations',
  },
});
