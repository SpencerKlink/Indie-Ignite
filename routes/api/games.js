const express = require('express');
const router = express.Router();
const { Game } = require('../../models');
const isAuth = require('../../config/middleware/auth');

// POST route to submit a new game with validation and auth
router.post('/', isAuth, async (req, res) => {
    const { title, description, price } = req.body;
    if (!title || !description || price == null) {
        return res.status(400).json({ message: 'Please provide title, description, and price for the game.' });
    }
    try {
        const newGame = await Game.create({ title, description, price });
        res.status(201).json(newGame);
    } catch (err) {
        res.status(500).json({ message: 'Error creating the game', error: err.message });
    }
});

// GET route to fetch all games
router.get('/', async (req, res) => {
    try {
        const games = await Game.findAll();
        res.json(games);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET route to fetch a single game by ID with error handling
router.get('/:id', async (req, res) => {
    try {
        const game = await Game.findByPk(req.params.id);
        if (!game) {
            res.status(404).json({ message: 'Game not found' });
            return;
        }
        res.json(game);
    } catch (err) {
        res.status(500).json(err);
    }
});

// PUT route to update a game by ID, with validation and authentication
router.put('/:id', isAuth, async (req, res) => {
    const { title, description, price } = req.body;
    if (!title || !description || price == null) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    try {
        const updatedGame = await Game.update({ title, description, price }, {
            where: {
                id: req.params.id
            }
        });
        if (!updatedGame[0]) {
            res.status(404).json({ message: 'Game not found' });
            return;
        }
        res.json({ message: 'Game updated' });
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE route to delete a game by ID WITH auth
router.delete('/:id', isAuth, async (req, res) => {
    try {
        const result = await Game.destroy({
            where: {
                id: req.params.id
            }
        });
        if (!result) {
            res.status(404).json({ message: 'Game not found' });
            return;
        }
        res.json({ message: 'Game deleted' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
