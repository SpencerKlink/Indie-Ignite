const express = require('express');
const router = express.Router();
const { Review, Game } = require('../../models');
const isAuth = require('../../config/middleware/auth');

// POST route to submit a review for a game WITH auth
router.post('/', isAuth, async (req, res) => {
    const { gameId, reviewText } = req.body;
    if (!gameId || !reviewText) {
        return res.status(400).json({ message: 'Please provide gameId and review text.' });
    }
    try {
        const newReview = await Review.create({ gameId, reviewText, userId: req.session.userId });
        res.status(201).json(newReview);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET route to fetch reviews for a specific game, with error handling
router.get('/:gameId', async (req, res) => {
    try {
        const reviews = await Review.findAll({
            where: { gameId: req.params.gameId },
            include: [{ model: Game }]
        });
        res.json(reviews);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
