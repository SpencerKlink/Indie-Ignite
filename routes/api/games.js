// const express = require('express')

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


module.exports = router;