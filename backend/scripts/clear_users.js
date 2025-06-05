import { appDataSource } from '../datasource.js';
import User from '../entities/user.js';

async function deleteAllUsers() {
  await appDataSource.initialize();
  const movieRepository = appDataSource.getRepository(User);
  await movieRepository.clear(); // Supprime tous les utilisateurs
  console.log('Tous les utilisateurs ont été supprimés.');
  await appDataSource.destroy();
}

deleteAllUsers();