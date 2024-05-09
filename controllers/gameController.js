const express = require('express');
const { Game } = require('../models'); 
const isAuth = require('../config/middleware/auth'); 
const router = express.Router();

// GET all games - Accessible to everyone
router.get('/', async (req, res) => {
    try {
        const games = await Game.findAll();
        res.json(games);
    } catch (error) {
        console.error('Error getting games:', error);
        res.status(500).json({ message: 'Failed to get games', error: error });
    }
});

// GET a single game by ID - Accessible to everyone
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
        res.status(500).json({ message: 'Failed to find game', error: error });
    }
});

// Authenticated routes

// POST a new game - Requires authentication
router.post('/', isAuth, async (req, res) => {
    const { title, description, price } = req.body;
    if (!title || !description || price == null) {
        return res.status(400).json({ message: 'Please provide title, description, and price for the game.' });
    }
    try {
        const newGame = await Game.create({ title, description, price });
        res.status(201).json(newGame);
    } catch (err) {
        console.error('Error creating game:', err);
        res.status(500).json({ message: 'Failed to create game', error: err.message });
    }
});

// PUT update a game by ID - Requires authentication
router.put('/:id', isAuth, async (req, res) => {
    const { title, description, price } = req.body;
    if (!title || !description || price == null) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        const updatedGame = await Game.update(req.body, {
            where: { id: req.params.id }
        });
        if (updatedGame[0] === 0) {
            res.status(404).json({ message: 'Game not found' });
        } else {
            res.json({ message: 'Game updated successfully' });
        }
    } catch (error) {
        console.error('Error updating game:', error);
        res.status(500).json({ message: 'Failed to update game', error: error });
    }
});

// DELETE a game by ID - Requires authentication
router.delete('/:id', isAuth, async (req, res) => {
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
        res.status(500).json({ message: 'Failed to delete game', error: error });
    }
});

module.exports = router;
