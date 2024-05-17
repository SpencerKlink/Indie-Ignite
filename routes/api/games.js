const express = require('express');
const router = express.Router();
const { Game, Level } = require('../../models');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'mainImage' || file.fieldname === 'gameImages') {
            cb(null, true);
        } else {
            cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', file.fieldname));
        }
    }
});

const cpUpload = upload.fields([{ name: 'mainImage', maxCount: 1 }, { name: 'gameImages', maxCount: 5 }]);

router.post('/', cpUpload, async (req, res) => {
    try {
        const mainImagePath = req.files.mainImage ? req.files.mainImage[0].path : null;
        const newGame = await Game.create({
            title: req.body['game-title'],
            description: req.body['game-description'],
            releaseDate: req.body['release-date'],
            user_id: req.session.userId,
            image: mainImagePath,
        });
        if (req.body.supporterPackages) {
            for (const pkg of req.body.supporterPackages) {
                await Level.create({
                    level: pkg.level,
                    reward: pkg.details,
                    price: pkg.price,
                    gameId: newGame.id
                });
            }
        }
        res.redirect(`/game/${newGame.id}`);
    } catch (error) {
        console.error('Error creating game:', error);
        res.status(500).json({ message: 'Failed to create game', error });
    }
});

router.get('/:id', async (req, res) => {
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

router.get('/', async (req, res) => {
    try {
        const games = await Game.findAll();
        res.json(games);
    } catch (error) {
        console.error('Error getting games:', error);
        res.status(500).json({ message: 'Failed to get games', error });
    }
});

router.get('/user/:userId', async (req, res) => {
    try {
        const games = await Game.findAll({ where: { user_id: req.params.userId } });
        res.json(games);
    } catch (error) {
        console.error('Error getting user games:', error);
        res.status(500).json({ message: 'Failed to get user games', error });
    }
});

router.put('/:id', async (req, res) => {
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
        res.status(500).json({ message: 'Failed to update game', error });
    }
});

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
        const gameData = await findAll();
        const game = gameData.get({ plain: true });
        res.render('games', game);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
