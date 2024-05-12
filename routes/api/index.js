const express = require('express');
const router = express.Router();

const userRoutes = require('./users');
const gameRoutes = require('./games');
const reviewRoutes = require('./reviews');

router.use('/users', userRoutes);
router.use('/games', gameRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;