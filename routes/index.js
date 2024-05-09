// Main route file that imports all other route modules
const express = require('express');
const router = express.Router();

const userRoutes = require('./api/users');
const gameRoutes = require('./api/games');
const reviewRoutes = require('./api/reviews');

// Use the specific routers
router.use('/users', userRoutes);
router.use('/games', gameRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;
