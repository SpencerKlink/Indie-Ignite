const express = require('express');
const multer = require('multer');
const path = require('path');
const { Game, User } = require('../models');
const router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads/'); 
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
    try {
        const gameData = await Game.findAll();
        const games = gameData.map(game => game.get({ plain: true }));
        res.render('home', { games, layout: false });
    } catch (error) {
        console.error('Error getting games:', error);
        res.status(500).json({ message: 'Failed to get games', error });
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login', { layout: false });
});

router.get('/game', (req, res) => {
    res.render('gamePage', { layout: false });
});

router.get('/upload', (req, res) => {
    res.render('upload', { layout: false });
});

router.get('/game/:id', async (req, res) => {
    try {
        const game = await Game.findByPk(req.params.id);
        if (!game) {
            res.status(404).send('Game not found');
            return;
        }
        res.render('gamecard', { game: game.get({ plain: true }) });
    } catch (error) {
        console.error('Error getting game:', error);
        res.status(500).json({ message: 'Failed to get game', error });
    }
});

router.get('/gamepage', async (req, res) => {
    const gameId = req.query.id; // Get the game's ID from the query parameter

    try {
        const game = await Game.findByPk(gameId); // Get the game data

        if (game) {
            res.render('gamepage', { game: game.get({ plain: true }) });
        } else {
            res.status(404).send('Game not found');
        }
    } catch (error) {
        console.error('Error getting game:', error);
        res.status(500).json({ message: 'Failed to get game', error });
    }
});

router.get('/upload', (req, res) => {
    res.render('upload', { layout: false });
});

module.exports = router;
