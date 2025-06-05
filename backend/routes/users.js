import express from 'express';
import { appDataSource } from '../datasource.js';
import User from '../entities/user.js';

const router = express.Router();

router.get('/', function (req, res) {
  appDataSource
    .getRepository(User)
    .find({})
    .then(function (users) {
      res.json({ users: users });
    });
});

router.post('/signup', function (req, res) {
  const userRepository = appDataSource.getRepository(User);
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const user = userRepository.create({
    name: name,
    email: email,
  });

  appDataSource
    .getRepository(User)
    .save(user)
    .then(function (savedUser) {
      console.log('User saved:', savedUser);
      res.status(201).json({ id: savedUser.id });
    })
    .catch(function (error) {
      console.error('Error saving user:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});

router.post('/login', function (req, res) {
  const userRepository = appDataSource.getRepository(User);
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  userRepository
    .findOneBy({ email: email })
    .then(function (user) {
      if (user) {
        console.log('User found:', user);
        res.status(200).json({ id: user.id, name: user.name });
      } else {
        console.log('User not found with email:', email);
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch(function (error) {
      console.error('Error finding user:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
}
);

router.get('/:userId', function (req, res) {
  const userId = parseInt(req.params.userId, 10);

  if (isNaN(userId)) {
    return res.status(400).json({ error: 'Invalid user ID' });
  }

  appDataSource
    .getRepository(User)
    .findOneBy({ id: userId })
    .then(function (user) {
      if (user) {
        res.json({ user: user });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    })
    .catch(function (error) {
      console.error('Error finding user:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
});


export default router;
