import { appDataSource } from '../datasource.js';
import User from '../entities/user.js';

var users = [
  { id: 1, email: "alice@example.com", name: "Alice" },
  { id: 2, email: "bob@example.com", name: "Bob" },
  { id: 3, email: "carol@example.com", name: "Carol" },
  { id: 4, email: "david@example.com", name: "David" },
  { id: 5, email: "eve@example.com", name: "Eve" }
];

async function seed() {
  const movieRepository = appDataSource.getRepository(User);

  for (const user of users) {
    try {
      await movieRepository.insert(user);
      console.log(`Ajouté : ${user.name}`);
    } catch (err) {
      console.error(`Erreur pour ${movie.title} :`, err.message);
    }
  }
}

async function main() {
    await appDataSource.initialize();
    await seed();
    await appDataSource.destroy();
}

main();