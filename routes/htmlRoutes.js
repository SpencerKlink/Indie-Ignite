const express = require('express');
const router = express.Router();
const { Game, User } = require('../models');

router.get('/', async (req, res) => {
    try {
        const gameData = await Game.findAll();

        const games = gameData.map((game) => game.get({ plain: true }));

        res.render('home', { games, layout: false });
    } catch (error) {
        console.error('Error getting games:', error);
        res.status(500).json({ message: 'Failed to get games', error });
    }
});

// Login page
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login', { layout: false });
});

router.get('/profile', async (req, res) => {
    const user = await User.findOne({
        where: {
            id: req.session.userId
        },
        include: [Game]
    });
    res.render('profile', { user, layout: false });
});

router.get('/game', (req, res) => {
    res.render('gamePage', { layout: false });  
});

router.get('/profileEdit', (req, res) => {
    res.render('profileEdit', { layout: false });  
});

// GET route to retrieve a specific game by its ID and render the gamecard partial
router.get('/game/:id', async (req, res) => {
    try {
        const game = await Game.findByPk(req.params.id);
        res.render('gamecard', game);
    } catch (error) {
        console.error('Error getting game:', error);
        res.status(500).json({ message: 'Failed to get game', error });
    }
});

module.exports = router;
