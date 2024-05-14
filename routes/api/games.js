// const express = require('express')

const express = require('express');
const router = express.Router();
const { Game } = require('../../models');
const publicGameRoutes = require('./publicGameRoutes');  
const adminGameRoutes = require('./adminGameRoutes');  
const { findAll } = require('../../models/Game');
const app = express('express');

// GET route to retrieve all games
router.get('/', async (req, res) => {
    try {
        const games = await Game.findAll();
        res.json(games);
    } catch (error) {
        console.error('Error getting games:', error);
        res.status(500).json({ message: 'Failed to get games', error });
    }
});
// route for retriving games soecific to the user
router.get('/user/:userId', async (req, res) => {
    try {
        const games = await Game.findAll({ where: { user_id: req.params.userId } });
        res.json(games);
    } catch (error) {
        console.error('Error getting user games:', error);
        res.status(500).json({ message: 'Failed to get user games', error });
    }
});
// post route for adding games to the database
router.post('/', async (req, res) => {
    try {
        const newGame = await Game.create(req.body);
        res.status(201).json(newGame);
    } catch (error) {
        console.error('Error creating game:', error);
        res.status(500).json({ message: 'Failed to create game', error });
    }
});


// updates games by id
router.put('/:id', async (req, res) => {
    try {
        const updatedGame = await Game.update(req.body, {
            where: { id: req.params.id }
        })
        if (updatedGame[0] === 0) {
            res.status(404).json({ message: 'Game not found' });
        } else {
            res.json({ message: 'Game updated successfully' });
        }
    } catch (error) {
        console.error('Error updating game:', error);
        res.status(500).json({ message: 'Failed to update game', error });
    }
});
// deletes games by id
router.delete('/:id', async (req, res) => {
    try {
        const result = await Game.destroy({
            where: { id: req.params.id }
        });
        if (result === 0) {
            res.status(404).json({ message: 'Game not found' });
        } else {
            res.status(200).json({ message: 'Game deleted successfully' });
        }
    } catch (error) {
        console.error('Error deleting game:', error);
        res.status(500).json({ message: 'Failed to delete game', error });
    }
});




router.get('/games', async (req, res) => {
    try {
    // Search the database for a dish with an id that matches params
    const gameData = await findAll();
    // console.log(dishData) // unserialized
    // We use .get({ plain: true }) on the object to serialize it so that it only includes the data that we need. 
    const game= gameData.get({ plain: true });
    console.log({serializedData: game})
    // Then, the 'dish' template is rendered and dish is passed into the template.
    res.render('games', game);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;
