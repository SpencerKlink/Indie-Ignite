const express = require('express');
const multer = require('multer');
const path = require('path');
const { Game, User, Level } = require('../models');
const router = express.Router();
const withAuth = require('../config/middleware/auth');
const { Op } = require('sequelize');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
    console.log('home route hit');
    try {
        const gameData = await Game.findAll();
        const games = gameData.map(game => game.get({ plain: true }));
        res.render('home', { games, logged_In: req.session.logged_In });
    } catch (error) {
        console.error('Error getting games:', error);
        res.status(500).json({ message: 'Failed to get games', error });
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_In) {
        res.redirect('/');
        return;
    }
    res.render('login', { layout: false, logged_In: req.session.logged_In });
});

router.get('/upload', (req, res) => {
    if (!req.session.logged_In) {
        res.redirect('/login');
        return;
    }
    res.render('upload', { logged_In: req.session.logged_In });
});

router.get('/game/:id', async (req, res) => {
    try {
        const game = await Game.findByPk(req.params.id, {
            include: [
                { model: User, as: 'user' },
                { model: Level, as: 'levels' }
            ]
        });
        if (!game) {
            res.status(404).send('Game not found');
            return;
        }

        const otherGames = await Game.findAll({
            where: { user_id: game.user_id, id: { [Op.ne]: game.id } }
        });

        console.log(otherGames);

        const gameData = game.get({ plain: true });
        gameData.levels = gameData.levels.map(level => ({ ...level, price: parseFloat(level.price).toFixed(2) }));
        const otherGamesData = otherGames.map(game => game.get({ plain: true }));
        res.render('gamePage', { game: gameData, otherGames: otherGamesData, logged_In: req.session.logged_In});
    } catch (error) {
        console.error('Error getting game:', error);
        res.status(500).json({ message: 'Failed to get game', error });
    }
});

router.get('/profile', withAuth, async (req, res) => {
    try {
        const user = await User.findOne({
            where: { id: req.session.userId },
            include: [{ model: Game, as: 'games' }]
        });
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        const userData = user.get({ plain: true });
        const gamesData = userData.games.map(game => game);
        res.render('profile', { 
            user: userData, 
            games: gamesData, 
            logged_In: req.session.logged_In 
        });
    } catch (error) {
        console.error('Error accessing user profile:', error);
        res.status(500).send('Error accessing profile');
    }
});

// Route for other users' profiles
router.get('/profile/:id', async (req, res) => {
    try {
        const user = await User.findOne({
            where: { id: req.params.id },
            include: [{ model: Game, as: 'games' }]
        });
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        const userData = user.get({ plain: true });
        res.render('profile', { user: userData, games: userData.games, logged_In: req.session.logged_In});
    } catch (error) {
        console.error('Error accessing user profile:', error);
        res.status(500).send('Error accessing profile');
    }
});

router.get('/game', (req, res) => {
    res.redirect('/');
});

router.get('/gamepage', (req, res) => {
    res.redirect('/');
});

router.get('/profileEdit', withAuth, async (req, res) => {
    try {
        const user = await User.findByPk(req.session.userId, { raw: true });
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        res.render('profileEdit', { user: user, logged_In: req.session.logged_In });
    } catch (error) {
        console.error('Error accessing profile edit page:', error);
        res.status(500).send('Error accessing profile edit page');
    }
});

module.exports = { router, upload };
