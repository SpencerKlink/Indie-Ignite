const express = require('express');
const multer = require('multer');
const path = require('path');
const { Game, User, Level } = require('../models');
const router = express.Router();
const withAuth = require('../config/middleware/auth');

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
    console.log('home route hit');
    try {
        const gameData = await Game.findAll();
        const games = gameData.map(game => game.get({ plain: true }));
        res.render('home', { games });
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

router.get('/upload', (req, res) => {
    res.render('upload');
});

router.get('/game/:id', async (req, res) => {
    try {
        const game = await Game.findByPk(req.params.id, {
            include: [
                { model: User, as: 'user' },
                { model: Level }
            ]
        });
        if (!game) {
            res.status(404).send('Game not found');
            return;
        }
        const gameData = game.get({ plain: true });
        res.render('gamePage', { game: gameData });
    } catch (error) {
        console.error('Error getting game:', error);
        res.status(500).json({ message: 'Failed to get game', error });
    }
});

// Route for the current user's profile
router.get('/profile', async (req, res) => {
    try {
        const user = await User.findOne({
            where: { id: req.session.userId },
        });
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        res.render('profile', { user: user.get({ plain: true }) });
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
        });
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        res.render('profile', { user: user.get({ plain: true }) });
    } catch (error) {
        console.error('Error accessing user profile:', error);
        res.status(500).send('Error accessing profile');
    }
});

router.get('/gamepage', async (req, res) => {
    const gameId = req.query.id; // Get the game's ID from the query parameter
    try {
        const user = await User.findOne({
            // where: { id: req.session.userId },
            // include: [Game]
        });
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        res.render('profile', { user: user.get({ plain: true }) });
    } catch (error) {
        console.error('Error accessing user profile:', error);
        res.status(500).send('Error accessing profile');
    }
});

router.get('/profileEdit', (req, res) => {
    res.render('profileEdit');
});

router.post('/api/profile/update/:userId', upload.single('profileImage'), async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId);
        if (!user) {
            res.status(404).send('User not found');
            return;
        }
        if (req.file) {
            user.profileImageUrl = '/uploads/' + req.file.filename;
        }
        await user.save();
        res.redirect('/profile/' + req.params.userId);
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).send('Error updating profile: ' + error.message);
    }
});

module.exports = { router, upload };
