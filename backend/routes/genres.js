import express from 'express';
import { appDataSource } from '../datasource.js';
import Genre from '../entities/genre.js';
import { In } from 'typeorm'; // Make sure to import In

const router = express.Router();
router.get('/', function (req, res) {
    appDataSource
        .getRepository(Genre)
        .find({})
        .then(function (genres) {
            res.json({ genres: genres });
        })
        .catch(function (error) {
            console.error(error);
            res.status(500).json({ message: 'Error while fetching genres' });
        });
});

// Get multiple genres by IDs
router.get('/multiple/:genreIds', function (req, res) {
    const genreIds = req.params.genreIds.split(',').map(id => parseInt(id, 10));
    
    appDataSource
        .getRepository(Genre)
        .find({
            where: {
                id: In(genreIds)
            }
        })
        .then(function (genres) {
            if (genres.length > 0) {
                //return an array of genres names
                genres = genres.map(genre => genre.name); // Extract names from the Genre objects
                // Set the status before sending the response
                res.status(200).json({ genres: genres });
            } else {
                res.status(404).json({ message: 'No genres found for the given IDs' });
            }
        })
        .catch(function () {
            res.status(500).json({ message: 'Error while fetching genres' });
        });
});


router.get('/multiple', function (req, res) {
    //return all genres
    appDataSource
        .getRepository(Genre)
        .find({})
        .then(function (genres) {
            if (genres.length > 0) {
                //return an array of genres names
                genres = genres.map(genre => genre.name); // Extract names from the Genre objects
                // Set the status before sending the response
                res.status(200).json({ genres: genres });
            } else {
                res.status(404).json({ message: 'No genres found' });
            }
        })
        .catch(function () {
            res.status(500).json({ message: 'Error while fetching genres' });
        });
});

// Get multiple genres by IDs
router.get('/multiple/:genreIds', function (req, res) {
    const genreIds = req.params.genreIds.split(',').map(id => parseInt(id, 10));
    
    appDataSource
        .getRepository(Genre)
        .find({
            where: {
                id: In(genreIds)
            }
        })
        .then(function (genres) {
            if (genres.length > 0) {
                //return an array of genres names
                genres = genres.map(genre => genre.name); // Extract names from the Genre objects
                // Set the status before sending the response
                res.status(200).json({ genres: genres });
            } else {
                res.status(404).json({ message: 'No genres found for the given IDs' });
            }
        })
        .catch(function () {
            res.status(500).json({ message: 'Error while fetching genres' });
        });
});

router.get('/:genreId', function (req, res) {
    appDataSource
        .getRepository(Genre)
        .findOneBy({ id: req.params.genreId })
        .then(function (genre) {
            if (genre) {
                res.json(genre);
                res.status(200);
            } else {
                res.status(404).json({ message: 'Genre not found' });
            }
        })
        .catch(function () {
            res.status(500).json({ message: 'Error while fetching the genre' });
        });
});
export default router;