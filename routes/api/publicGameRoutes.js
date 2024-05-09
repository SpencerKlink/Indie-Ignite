const express = require('express');
const router = express.Router();
const { Game } = require('../../models');

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

// GET route to retrieve a single game by ID
router.get('/:id', async (req, res) => {
    try {
        const game = await Game.findByPk(req.params.id);
        if (!game) {
            res.status(404).json({ message: 'Game not found' });
        } else {
            res.json(game);
        }
    } catch (error) {
        console.error('Error finding game:', error);
        res.status(500).json({ message: 'Failed to find game', error });
    }
});

module.exports = router;
